import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';

export function Register({ route, navigation }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        // Sua lógica de registro aqui
        if (password !== confirmPassword) {
            // Mostrar algum erro de que as senhas não são iguais
        }
        // Continuar o processo de registro
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
