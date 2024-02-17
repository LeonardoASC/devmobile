import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../services/api"
import messaging from '@react-native-firebase/messaging';
import { Alert } from 'react-native';




export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState('');

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            //   console.log('Authorization status:', authStatus);
        }
    }

    useEffect(() => {
        if (requestUserPermission()) {
            // retorna o token do dispositivo
            messaging().getToken().then(token => {
                  console.log(token);

            })
        }
        else {
            console.log("falhou o token man", authStatus);
        }
        // Check whether an initial notification is available
        messaging()
            .getInitialNotification()
            .then(async (remoteMessage) => {
                if (remoteMessage) {
                    console.log(
                        'Notification caused app to open from quit state:',
                        remoteMessage.notification,
                    );
                }
            });

        // Assume a message-notification contains a "type" property in the data payload of the screen to open

        messaging().onNotificationOpenedApp(async (remoteMessage) => {
            console.log(
                'Notification caused app to open from background state:',
                remoteMessage.notification,
            );
        });

        // Register background handler
        messaging().setBackgroundMessageHandler(async remoteMessage => {
            console.log('Message handled in the background!', remoteMessage);
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;

    }, [])

    const register = async (username, email, password) => {
        setIsLoading(true);
        try {
            const response = await api.post('/register', {
                name: username,
                email: email,
                password: password
            });

            let userInfo = response.data.userInfo;
            let userToken = response.data.access_token;
            
            // Atualizar o estado e armazenar no AsyncStorage
            setUserToken(userToken);
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userToken', userToken);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            updateFCMToken(); // Se necessário

            // Caso você queira fazer algo após o registro, como redirecionar para uma página, você pode fazer isso aqui.

        } catch (error) {
            console.error("Erro durante o registro:", error);
            // Tratar erros de registro aqui, como mostrar uma mensagem ao usuário
            throw error; // Lançar erro para ser capturado no componente
        } finally {
            setIsLoading(false);
        }
    };
    

    const login = (email, password) => {
        setIsLoading(true);
        api.post('/login', {
            email,
            password
        })
            .then(res => {
                //  console.log("Resposta da API:", res.data);
                let userInfo = res.data.userInfo
                setUserToken(res.data.access_token)
                AsyncStorage.setItem('userToken', res.data.access_token)
                // console.log(userInfo);
                setUserInfo(userInfo)
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                updateFCMToken();
            })
            .catch(e => {
                if (e.response && e.response.status === 401) {
                    // console.log("ERRO da API:", e);
                    alert("Credenciais inválidas. Tente novamente.");
                } else {
                    alert("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
                }
            });
        setIsLoading(false);
    }

    const updateFCMToken = () => {
        messaging().getToken()
            .then(token => {
                if (token) {
                    // Se o token foi obtido, enviar para o backend
                    api.post('/update-expo-token', {
                        expo_token: token
                    })
                        .then(response => {
                            console.log("Token FCM atualizado com sucesso:", response.data);
                        })
                        .catch(error => {
                            console.error("Erro ao atualizar o token FCM no backend:", error);
                        });
                } else {
                    console.warn("Token FCM não foi obtido.");
                }
            })
            .catch(error => {
                console.error("Erro ao obter token FCM:", error);
            });
    }


    const logout = () => {
        setIsLoading(true);
        // Chamada para remover o token antes de fazer o logout efetivamente
        api.post('/remove-expo-token')
            .then(res => {
                console.log('Token removed successfully:', res.data);
            })
            .catch(e => {
                console.error('Error removing token:', e);
            })
            .finally(() => {
                setUserToken(null);
                AsyncStorage.removeItem('userInfo');
                AsyncStorage.removeItem('userToken');
                setIsLoading(false);
            });
    }


    const isLoggedIn = async () => {
        try {
            setIsLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');

            if (userInfo) {
                userInfo = JSON.parse(userInfo);
                setUserInfo(userInfo);
            }

            if (userToken) {
                setUserToken(userToken);
            }

            setIsLoading(false);
        } catch (e) {
            // console.log(`error ${e}`);
            alert(`error ${e}`);
        }
    }


    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, register, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
