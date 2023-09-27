import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from 'react-native';

export function Login({ route, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    {() => navigation.navigate("HomePrivate")}
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white h-1/4 rounded-bl-full justify-center items-center">
        <Text className="text-cyan-600 text-xl font-bold text-center">
          Bem-vindo ao Login
        </Text>
      </View>

      <View className="p-5 flex justify-center items-center h-2/4 w-full mt-10 rounded-tr-xl">
        <Text className="text-white">Por favor, insira suas credenciais</Text>
        
        <View className="mt-5 w-full">
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
        </View>
      </View>

      <View className="w-full items-center justify-center">
        <TouchableOpacity
          className="bg-white rounded p-3 shadow-md"
          // onPress={handleLogin}
          onPress={() => navigation.navigate("HomePrivate")}
        >
          <Text className="text-cyan-500 font-bold text-lg">Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
