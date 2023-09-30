import React, { useState, useContext } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import SvgComponent from "../../svg/google";
import SvgComponentX from "../../svg/x";
import SvgComponentFace from "../../svg/facebook";
import { Pressable } from 'react-native';
import { AuthContext } from '../../context/AuthContext';

export function Login({ route, navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const { login } = useContext(AuthContext);
 
  return (
   

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
              className="flex-1 ml-2 text-white"
            />
          </View>

          <View className="flex-row items-center bg-[#06b6d4] py-2 px-1 rounded mb-4 border-b border-zinc-300">
            <EvilIcons name="lock" size={26} color="white" />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Senha"
              secureTextEntry={true}
              className="flex-1 ml-2 text-white"
            />
            <Text className="text-slate-100 ml-2">Esqueceu?</Text>
          </View>
        </View>

        <TouchableOpacity
          className="bg-white w-11/12 rounded-xl p-3 shadow-md py-4 self-center mt-5"
          onPress={() => {login(email, password)}}
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
        <View className=" flex flex-row justify-center mt-8">
          <Text className="text-slate-200">Novo no aplicativo? </Text>
          <Pressable onPress={() => navigation.navigate('Register')}>
            <Text className="text-slate-200 underline ml-2">Registre</Text>
          </Pressable>
        </View>

      </View>
    </SafeAreaView>

  );
}
