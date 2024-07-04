import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../services/api"
import { Alert } from 'react-native';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState('');


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


    const logout = async () => {
        try {
            setIsLoading(true);
            // Limpar o token de usuário e outras informações do armazenamento
            await AsyncStorage.removeItem('userInfo');
            await AsyncStorage.removeItem('userToken');
            // Atualizar o estado para refletir que o usuário não está mais logado
            setUserToken(null);
        } catch (e) {
            console.error('Erro ao tentar fazer logout:', e);
        } finally {
            setIsLoading(false);
        }
    };


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
        } catch (e) {
            // console.log(`error ${e}`);
            alert(`error ${e}`);
        } finally {
            setIsLoading(false);
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
