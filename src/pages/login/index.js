import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({ route, navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.post('http://10.55.0.101:8000/api/login', {
  //       email: email,
  //       password: password
  //     });
  
  //     if (response.status === 200) {
  //       // Salve o token em algum lugar seguro, como o AsyncStorage ou Redux, por exemplo
  //       // Por simplicidade, vou apenas navegar para a tela HomePrivate
  //       navigation.navigate("HomePrivate");
  //     } else {
  //       Alert.alert('Erro', 'Credenciais inválidas.');
  //     }
  //   } catch (error) {
  //     if (error.response && error.response.status === 401) {
  //       Alert.alert('Erro', 'Credenciais inválidas.');
  //     } else {
  //       Alert.alert('Erro', 'Problema na comunicação com o servidor.');
  //     }
  //   }
  // };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.55.0.101:8000/api/login', {
        email: email,
        password: password
      });
  
      if (response.status === 200) {
        const token = response.data.access_token;
        
        // Você pode optar por guardar o token para uso posterior aqui
        AsyncStorage.setItem('userToken', token);
        
        // Fazendo chamada subsequente para obter detalhes do usuário
        const userDetails = await axios.get('http://10.55.0.101:8000/api/user', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
  
        // Ajuste esta linha conforme a resposta da sua API. 
        // Estou supondo que a resposta tem uma propriedade "name".
        const userName = userDetails.data.name;
  
        navigation.navigate("HomePrivate", {
          userName: userName
        });
  
      } else {
        Alert.alert('Erro', 'Credenciais inválidas.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        Alert.alert('Erro', 'Credenciais inválidas.');
      } else {
        Alert.alert('Erro', 'Problema na comunicação com o servidor.');
      }
    }
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
          onPress={handleLogin}
        // onPress={() => navigation.navigate("HomePrivate")}
        >
          <Text className="text-cyan-500 font-bold text-lg">Entrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
