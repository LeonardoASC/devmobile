import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../services/api"


export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState('');

   

    const login = (email, password) => {
        setIsLoading(true);
        api.post('/login', {
            email,
            password
        })
            .then(res => {
                 console.log("Resposta da API:", res.data);
                let userInfo = res.data.userInfo
                setUserToken(res.data.access_token)
                AsyncStorage.setItem('userToken', res.data.access_token)
                // console.log(userInfo);
                setUserInfo(userInfo)
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                // AsyncStorage.setItem('userInfo', userInfo.name)

                // console.log(res.data);
                // console.log('User token: ' + res.data.access_token);
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

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);

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
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
