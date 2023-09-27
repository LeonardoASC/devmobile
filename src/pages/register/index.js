import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';



export function Register({ route, navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // 1. Verificar se os campos não estão vazios
        if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // 2. Verificar se o email tem um formato válido
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!emailRegex.test(email)) {
            alert('Por favor, insira um email válido!');
            return;
        }

        // 3. Verificar se a senha e a senha de confirmação são iguais
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }


        // 4. Enviar os dados para o servidor utilizando Axios:
        axios.post('http://10.55.0.101:8000/api/register', {
            name: username,
            email: email,
            password: password
        })
            .then(response => {
                if (response.data) {
                    // alert('Você foi cadastrado!'+' Hora de agendar seu próximo corte e ficar no estilo.');
                    Alert.alert("Você foi cadastrado!", "Hora de agendar seu próximo corte e ficar no estilo.");
                    navigation.navigate('Home');
                } else {
                    alert('Erro ao registrar! ' + (response.data.message || ''));
                }
            })
            .catch(error => {
                console.error("Erro na requisição:", error);
                alert('Ocorreu um erro. Tente novamente mais tarde.');
            });

    };



    return (
        <SafeAreaView className="flex-1">
            <View className="bg-white h-1/4 rounded-bl-full justify-center items-center">
                <Text className="text-cyan-600 text-xl font-bold text-center">
                    Bem-vindo ao Registro
                </Text>
            </View>

            <View className="p-5 flex justify-center items-center h-2/4 w-full mt-10 rounded-tr-xl">
                <Text className="text-white">Por favor, insira suas informações</Text>

                <View className="mt-5 w-full">
                    <Text className="text-white mb-2">Nome de usuário:</Text>
                    <TextInput
                        value={username}
                        onChangeText={setUsername}
                        placeholder="Nome de usuário"
                        className="bg-white p-2 rounded mb-4"
                    />
                    <Text className="text-white mb-2">Email:</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                        className="bg-white p-2 rounded mb-4"
                    />

                    <Text className="text-white mb-2">Senha:</Text>
                    <TextInput
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Senha"
                        secureTextEntry={true}
                        className="bg-white p-2 rounded mb-4"
                    />

                    <Text className="text-white mb-2">Confirme a Senha:</Text>
                    <TextInput
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirme a Senha"
                        secureTextEntry={true}
                        className="bg-white p-2 rounded mb-4"
                    />
                </View>
            </View>

            <View className="w-full items-center justify-center">
                <TouchableOpacity
                    className="bg-white rounded p-3 shadow-md"
                    onPress={handleRegister}
                >
                    <Text className="text-cyan-500 font-bold text-lg">Registrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
