import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import SvgComponent from "../../svg/google";
import SvgComponentX from "../../svg/x";
import SvgComponentFace from "../../svg/facebook";

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
    // <SafeAreaView className="flex-1">
    //   <View className="bg-white h-1/4 rounded-bl-full justify-center items-center">
    //     <Text className="text-cyan-600 text-xl font-bold text-center">
    //       Bem-vindo ao Login
    //     </Text>
    //   </View>

    //   <View className="p-5 flex justify-center h-2/4 w-full rounded-tr-xl bottom-10">

    //     <Text className="text-white text-3xl font-extrabold">Entrar...</Text>
    //     <Text className="text-white text-center top-4">Informe suas credenciais.</Text>
    //     <View className="mt-5 w-full">

    //       <View className="flex-row items-center bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
    //         <Ionicons name="at" size={19} color="white" />
    //         <TextInput
    //           value={email}
    //           onChangeText={setEmail}
    //           placeholder="Email ID"
    //           className="flex-1 px-1"
    //         />
    //       </View>

    //       <View className="flex-row items-center bg-[#06b6d4] py-2 px-1 rounded mb-4 border-b border-zinc-300">
    //         <EvilIcons name="lock" size={26} color="white" />
    //         <TextInput
    //           value={password}
    //           onChangeText={setPassword}
    //           placeholder="Senha"
    //           secureTextEntry={true}
    //           className="flex-1 px-1"
    //         />
    //         <Text className="text-slate-100">Esqueceu?</Text>
    //       </View>
    //     </View>
    //   </View>

    //   <View className="w-full items-center justify-center">
    //     <TouchableOpacity
    //       className="bg-white w-[90%] rounded-xl p-3 shadow-md py-4 bottom-28"
    //       onPress={handleLogin}
    //     // onPress={() => navigation.navigate("HomePrivate")}
    //     >
    //       <Text className="text-cyan-500 text-center font-bold text-lg ">Entrar</Text>
    //     </TouchableOpacity>

    //   <Text className="text-center text-slate-200 bottom-20">Ou, Logar com... </Text>

    //     <View className="flex flex-row gap-x-8 mt-4 bottom-16">
    //       <View className="bg-white w-10 items-center justify-center rounded-xl p-2 px-10 shadow-xl">
    //         <SvgComponent />
    //       </View>
    //       <View className="bg-white w-10 items-center justify-center rounded-xl p-2 px-10 shadow-xl">
    //         <SvgComponentX />
    //       </View>
    //       <View className="bg-white w-10 items-center justify-center rounded-xl p-2 px-10 shadow-xl">
    //         <SvgComponentFace />
    //       </View>
    //     </View>
    //     <Text className="text-center text-slate-200 ">Novo no aplicativo? Registre</Text>
    //   </View>

    // </SafeAreaView>

    <SafeAreaView className="flex-1">
      <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full">
        <Text className="text-cyan-600 text-xl font-bold text-center">
          Bem-vindo ao Login
        </Text>
      </View>

      <View className="flex-1 p-5 mt-2">
        <Text className="text-white text-3xl font-extrabold self-center">Entrar...</Text>
        <Text className="text-white text-center mt-4">Informe suas credenciais.</Text>

        <View className="mt-5 w-full">
          <View className="flex-row items-center bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
            <Ionicons name="at" size={19} color="white" />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="Email ID"
              className="flex-1 ml-2"
            />
          </View>

          <View className="flex-row items-center bg-[#06b6d4] py-2 px-1 rounded mb-4 border-b border-zinc-300">
            <EvilIcons name="lock" size={26} color="white" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              secureTextEntry={true}
              className="flex-1 ml-2"
            />
            <Text className="text-slate-100 ml-2">Esqueceu?</Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-white w-11/12 rounded-xl p-3 shadow-md py-4 self-center mt-5"
          onPress={handleLogin}
        >
          <Text className="text-cyan-500 text-center font-bold text-lg">Entrar</Text>
        </TouchableOpacity>

        <Text className="text-center text-slate-200 mt-8">Ou, Logar com...</Text>

        <View className="flex flex-row justify-center gap-x-8 mt-8">
          <View className="bg-white w-16 h-16 items-center justify-center rounded-xl p-2 shadow-xl">
            <SvgComponent />
          </View>
          <View className="bg-white w-16 h-16 items-center justify-center rounded-xl p-2 shadow-xl">
            <SvgComponentX />
          </View>
          <View className="bg-white w-16 h-16 items-center justify-center rounded-xl p-2 shadow-xl">
            <SvgComponentFace />
          </View>
        </View>
        <Text className="text-center text-slate-200 mt-5">Novo no aplicativo? Registre</Text>
      </View>
    </SafeAreaView>

  );
}
