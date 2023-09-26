import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';

export function Agendado({ route, navigation }) {
  const name = route.params?.nameProp;
  const time = route.params?.timeProp;
  const date = route.params?.dateProp;
  const serviceName = route.params?.serviceName;
  const subServiceName = route.params?.subServiceName;

  return (

    <SafeAreaView className="flex h-screen w-full">
      <View className="bg-white h-1/4 rounded-bl-full justify-center items-center">
        <Text className="text-cyan-600 text-xl font-bold text-center">Itens Agendados</Text>
      </View>
      <View className="p-5 flex justify-center items-center h-2/4 w-full mt-10 rounded-tr-xl ">
        <Text className="text-white text-xl text-center bottom-20">Clique em agendar para confirmar sua reserva!</Text>
        <View className="bg-white  shadow-sm p-5 rounded ">
          <Text className="text-cyan-600">Seu nome: {name}</Text>
          <Text className="text-cyan-600">Horario: {time}</Text>
          <Text className="text-cyan-600">data: {date}</Text>
          <Text className="text-cyan-600">Serviço selecionado: {serviceName}</Text>
          <Text className="text-cyan-600">Sub-serviço selecionado: {subServiceName}</Text>
        </View>
      </View>
      <View className="w-full items-center justify-center">
        <TouchableOpacity
          className="bg-white rounded p-3 shadow-md"
          onPress={() => navigation.navigate('Home')}
        >
          <Text className="text-cyan-500 font-bold text-lg">AGENDAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
