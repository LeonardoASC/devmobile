import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

export function Agendado({ route, navigation  }) {
    const serviceName = route.params?.serviceName;
    const subServiceName = route.params?.subServiceName;

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white h-1/4 rounded-bl-full justify-center items-center">
        <Text className="text-cyan-600 text-xl font-bold text-center">Itens Agendados</Text>
      </View>
      <View className="p-5 flex justify-center items-center h-2/4 w-full mt-10 rounded-tr-xl ">
        <Text className="text-white">Serviço selecionado: {serviceName}</Text>
        <Text className="text-white mt-4">Sub-serviço selecionado: {subServiceName}</Text>
      </View>
    </SafeAreaView>
  );
}
