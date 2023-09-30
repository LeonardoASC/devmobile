import { View, Text, TextInput, Button, Alert, TouchableOpacity } from "react-native";
import React, { Component, useState } from "react";
import SvgComponent from "../../svg/circulo";

export function FirstDataPrivate({ route, navigation }) {
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
  
    Alert.alert(
      "Dados inseridos",
      `Nome: ${name}, Dia: ${date}, Hora: ${time}`,
      [
        {
          text: 'Cancelar',
          onPress: () => navigation.navigate('FirstDataPrivate')
        },
        {
          text: 'Confirmar',
          onPress: () => navigation.navigate('ServicoPrivate',{nameProp:name, dateProp:date, timeProp:time})
        }

      ]

    );
  };

  return (
    <View className={"p-5 items-center bg-cyan-500 h-screen w-full"}>
      <SvgComponent />
      <Text className="text-white text-center ">Agendamento</Text>
      <Text className="text-white text-center">
        Informe seus dados para agendar um horario
      </Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        className="py-2 px-4 border border-white mb-2 rounded w-full text-white"
      />

      <TextInput
        placeholder="Dia (ex: 23/09/2023)"
        value={date}
        onChangeText={setDate}
        className={"py-2 px-4 border border-white mb-2 rounded w-full text-white"}
      />
      <TextInput
        placeholder="Hora (ex: 15:30)"
        value={time}
        onChangeText={setTime}
        className={"py-2 px-4 border border-white mb-2 rounded w-full text-white"}
      />
      <TouchableOpacity
        className="bg-white rounded p-3 shadow-md"
        onPress={handleSubmit}
      >
        <Text className="text-cyan-500 font-bold text-lg">Confirmar dados</Text>
      </TouchableOpacity>
    </View>
  );
}
