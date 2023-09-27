import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

export function Agendado({ route, navigation }) {
  const name = route.params?.nameProp;
  const time = route.params?.timeProp;
  const date = route.params?.dateProp;
  const serviceName = route.params?.serviceName;
  const subServiceName = route.params?.subServiceName;

  const sendData = () => {

    axios.post('http://10.55.0.101:8000/api/agendamento', {
      nome: name,
      dia: date,
      horario: time,
      tipo_servico: serviceName,
      servico_especifico: subServiceName
    })
      // .then(response => {
      //   console.log("Dados enviados com sucesso:", response.data);
      //   // Aqui, você pode adicionar lógica adicional após o sucesso. Ex: Mostrar uma mensagem para o usuário.
      //   navigation.navigate('Home');
      // })
      // .catch(error => {
      //   console.error("Erro ao enviar dados:", error);
      //   // Aqui, você pode adicionar lógica para lidar com o erro. Ex: Mostrar uma mensagem de erro para o usuário.
      // });
      .then(response => {
        console.log(response.data.success)
        if (response.data.success) {
          Alert.alert("Reserva Realizada!", "Ficamos felizes com seu agendamento! Aguardamos voce.");
          navigation.navigate('Home');
        } else {
          alert('Erro ao registrar! ' + (response.data.message || ''));
        }
      })
      .catch(error => {
        console.error("Erro ao enviar dados:", error);
        // Aqui, você pode adicionar lógica para lidar com o erro. Ex: Mostrar uma mensagem de erro para o usuário.
      });

  }

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
          onPress={sendData}
        >
          <Text className="text-cyan-500 font-bold text-lg">AGENDAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
