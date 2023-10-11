import { View, Text, TextInput, Button, Alert, TouchableOpacity, Animated, Keyboard } from "react-native";
import React, { Component, useState, useContext, useEffect } from "react";
import SvgComponent from "../../svg/circulo";
import { AuthContext } from "../../context/AuthContext"
import { Ionicons, EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";




export function FirstDataPrivate({ route, navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { userInfo } = useContext(AuthContext);


  const handleSubmit = (userInfo) => {

    const actualName = userInfo ? userInfo.name : 'Convidado';
    const fields = {
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
      `Nome: ${actualName}, Dia: ${date}, Hora: ${time}`,
      [
        {
          text: 'Cancelar',
          onPress: () => navigation.navigate('FirstDataPrivate')
        },
        {
          text: 'Confirmar',
          onPress: () => navigation.navigate('ServicoPrivate', { nameProp: actualName, dateProp: date, timeProp: time })
        }

      ]

    );
  };


  return (

    <SafeAreaView className="flex-1">
      <ScrollView>
        <View className="p-5 items-center justify-center  h-screen w-full">
          <SvgComponent />
          <Text className="text-white text-3xl font-extrabold self-center mt-5">Agendamento</Text>
          <Text className="text-white text-center mt-4">
            Informe seus dados para agendar um horário - {userInfo.name}
          </Text>

          <View className="mt-5 w-full">
            <View className="flex-row items-center p-2 rounded mb-4 border-b border-zinc-300">
              <Ionicons name="calendar-outline" size={19} color="white" />
              <TextInput
                placeholder="Dia (ex: 23/09/2023)"
                value={date}
                onChangeText={setDate}
                className="flex-1 ml-2 text-white"
              />
            </View>

            <View className="flex-row items-center p-2 rounded mb-4 border-b border-zinc-300">
              <Ionicons name="time-outline" size={19} color="white" />
              <TextInput
                placeholder="Hora (ex: 15:30)"
                value={time}
                onChangeText={setTime}
                className="flex-1 ml-2 text-white"

              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-white w-11/12 rounded-xl p-3 shadow-md py-4 self-center mt-5"
            onPress={() => handleSubmit(userInfo)}
          >
            <Text className="text-cyan-500 text-center font-bold text-lg">Confirmar dados</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>

  );
}
