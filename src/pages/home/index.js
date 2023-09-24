import { View, Text, Button } from "react-native";
// import React from 'react';

export function Home({ navigation }) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-white text-xl">Bem vindo ao nosso salao</Text>
      <Text className="text-white">Clique abaixo para agendar</Text>
        <View className="mt-4">
        <Button
          title="Agendar"
          onPress={() => navigation.navigate("FirstData")}
          />
          </View>

    </View>
  );
}

