import { View, Text, Button, TouchableOpacity } from "react-native";
// import React from 'react';
import SvgComponent from "../../svg/circulo";
// import { TouchableOpacity } from "react-native-gesture-handler";

export function Home({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center">
      {/* <TouchableOpacity
        className="bg-white rounded p-3 shadow-md"
      >
        <Text className="text-cyan-500 font-bold text-lg">Login</Text>
      </TouchableOpacity> */}

      <SvgComponent />
      <Text className="text-white text-xl ">Bem vindo ao nosso salão</Text>
      <Text className="text-white">Clique abaixo para agendar</Text>
      <View className="mt-4">
        <TouchableOpacity
          className="bg-white rounded p-3 shadow-md"
          onPress={() => navigation.navigate("FirstData")}
        >
          <Text className="text-cyan-500 font-bold text-lg">Agendar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

