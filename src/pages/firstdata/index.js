import { View, Text, TextInput, Button, Alert, TouchableOpacity, SafeAreaView } from "react-native";
import React, { Component, useState } from "react";
import SvgComponent from "../../svg/circulo";
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import api from "../../services/api";

export function FirstData({ route, navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
    const fields = {
      nome: name.trim(),
      data: date.trim(),
      hora: time.trim(),
    };

    const missingFields = Object.keys(fields).filter(key => !fields[key]);

    if (missingFields.length) {
      const errorMessage = `Por favor, informe um valor para o(s) campo(s): ${missingFields.join(', ')}.`;
      Alert.alert('Erro', errorMessage);
      return;
    }
    verifyExistingAppointment();
    

  };

  const verifyExistingAppointment = async () => {
    try {
      const response = await api.get('/verify', {
        params: {
          dia: date.trim(),
          horario: time.trim(),
        }
      });

      if (response.data && response.data.exists) {
        Alert.alert('Erro', 'Já existe um agendamento para esse dia e horário.');
      } else {
        
        Alert.alert(
          "Dados inseridos",
          `Nome: ${name}, Dia: ${date}, Hora: ${time}`,
          [
            {
              text: 'Cancelar',
              onPress: () => navigation.navigate('FirstData')
            },
            {
              text: 'Confirmar',
              onPress: () => navigation.navigate('Servico', { nameProp: name, dateProp: date, timeProp: time })
            }
    
          ]
    
        );
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao verificar o agendamento. Tente novamente.');
    }
  };

  return (
    <SafeAreaView className="flex-1 flex">
      <View className=" flex items-center">
      <SvgComponent />
      </View>
    <View className=" flex p-5 items-center bg-cyan-500 h-screen w-full">
      
      <Text className="text-white text-center text-3xl font-extrabold">Agendamento</Text>
      <Text className="text-white text-center mt-4">Informe seus dados para agendar um horario</Text>

      <View className="flex-row items-center bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
      <Ionicons name="person-outline" size={20} color="white" />
        <TextInput
          placeholder="Nome"
          value={name}
          onChangeText={setName}
          className="flex-1 ml-2 text-white"
        />
      </View>

      <View className="flex-row items-center bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
        <Ionicons name="calendar-outline" size={19} color="white" />
        <TextInput
          placeholder="Dia (ex: 23/09/2023)"
          value={date}
          onChangeText={setDate}
          className="flex-1 ml-2 text-white"
        />
      </View>

      <View className="flex-row items-center bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
        <Ionicons name="time-outline" size={19} color="white" />
        <TextInput
          placeholder="Hora (ex: 15:30)"
          value={time}
          onChangeText={setTime}
          className="flex-1 ml-2 text-white"
        />
      </View>

      <TouchableOpacity
        className="bg-white w-11/12 rounded-xl p-3 shadow-md py-4"
        onPress={handleSubmit}
      >
        <Text className="text-cyan-500 text-center font-bold text-lg">Confirmar dados</Text>
      </TouchableOpacity>
    </View>
    </SafeAreaView>
  );
}
