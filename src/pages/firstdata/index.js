import { View, Text, TextInput, Button, Alert } from "react-native";
import React, { Component, useState } from "react";
import SvgComponent from "../../svg/circulo";

export function FirstData({ navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = () => {
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
          onPress: () => navigation.navigate('Servico') 
        }

      ]

    );
  };

  return (
    <View className={"p-5 items-center bg-cyan-500 h-screen w-full"}>
        <SvgComponent/>
      <Text className="text-white text-center">Agendamento</Text>
      <Text className="text-white text-center">
        Informe seus dados para agendar um horario
      </Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        className={"py-2 px-4 border border-gray-300 mb-2 rounded w-full"}
      />
      <TextInput
        placeholder="Dia (ex: 23/09/2023)"
        value={date}
        onChangeText={setDate}
        className={"py-2 px-4 border border-gray-300 mb-2 rounded w-full"}
      />
      <TextInput
        placeholder="Hora (ex: 15:30)"
        value={time}
        onChangeText={setTime}
        className={"py-2 px-4 border border-gray-300 mb-2 rounded w-full"}
      />
      <Button className={"p-2 mt-2"} title="Confirmar os dados" onPress={handleSubmit} 
      
      />
    </View>
  );
}
