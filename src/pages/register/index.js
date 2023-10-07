import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import api from "../../services/api"
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';


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
        api.post('/register', {
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
            <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full">
                <Text className="text-cyan-600 text-xl font-bold text-center">
                    Bem-vindo ao Registro
                </Text>
            </View>

            <View className="flex-1 p-5 mt-2">
                <Text className="text-white text-3xl font-extrabold self-center">Registrar...</Text>
                <Text className="text-white text-center mt-4">Por favor, insira suas informações.</Text>

                <View className="mt-5 w-full">
                    <View className="flex-row items-center p-2 rounded mb-4 border-b border-zinc-300">
                        <Ionicons name="person-add-outline" size={20} color="white" />
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder="Nome de usuário"
                            className="flex-1 ml-2 text-white"
                        />
                    </View>

                    <View className="flex-row items-center p-2 rounded mb-4 border-b border-zinc-300">
                        <Ionicons name="at" size={19} color="white" />
                        <TextInput
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Email"
                            className="flex-1 ml-2 text-white"
                        />
                    </View>

                    <View className="flex-row items-center py-2 px-1 rounded mb-4 border-b border-zinc-300">
                        <EvilIcons name="lock" size={26} color="white" />
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Senha"
                            secureTextEntry={true}
                            className="flex-1 ml-2 text-white"
                        />
                    </View>

                    <View className="flex-row items-center py-2 px-1 rounded mb-4 border-b border-zinc-300">
                        <EvilIcons name="lock" size={26} color="white" />
                        <TextInput
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholder="Confirme a Senha"
                            secureTextEntry={true}
                            className="flex-1 ml-2 text-white"
                        />
                    </View>
                </View>

                <TouchableOpacity
                    className="bg-white w-11/12 rounded-xl p-3 shadow-md py-4 self-center mt-5"
                    onPress={handleRegister}
                >
                    <Text className="text-cyan-500 text-center font-bold text-lg">Registrar</Text>
                </TouchableOpacity>

                <View className=" flex flex-row justify-center mt-8">
                    <Text className="text-white">Já tem uma conta?</Text>
                    <Pressable onPress={() => navigation.navigate('Login')}>
                        <Text className="text-white underline ml-2">Entrar</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>

    );
}
