import { View, Text, TextInput, Alert, TouchableOpacity, FlatList } from "react-native";
import React, { Component, useState, useContext, useEffect } from "react";
import SvgComponent from "../../svg/circulo";
import { AuthContext } from "../../context/AuthContext"
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import api from "../../services/api";



export function FirstDataPrivate({ route, navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const { userInfo } = useContext(AuthContext);
  const [availableHours, setAvailableHours] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);


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

  const [dates, setDates] = useState([]);

  useEffect(() => {
    const generateDates = () => {
      const result = [];
      const today = new Date();

      for (let i = 0; i < 25; i++) {
        const currentDate = new Date();
        currentDate.setDate(today.getDate() + i);
        result.push(currentDate);
      }

      return result;
    };

    setDates(generateDates());
  }, []);

  const isDisabled = (date) => {
    const day = date.getDay();
    return day === 0 || day === 1; // 0 é domingo e 1 é segunda-feira
  };

  const selectHour = (selectedDate) => {
    setDate(selectedDate.toISOString().split('T')[0]);

    api.get(`/verify-hour/${selectedDate.toISOString().split('T')[0]}`)
      .then(response => {
        if (response.data.unreservedHours) {
          // Transforma o objeto em array
          const hoursArray = Object.values(response.data.unreservedHours);
          setAvailableHours(hoursArray);
        } else {
          alert('Erro ao obter os horários! ' + (response.data.message || ''));
        }
      })
      .catch(error => {
        console.error("Erro ao obter os horários:", error);
      });
  }


  return (

    <SafeAreaView className="flex-1">

      <View className="p-5 items-center justify-center  h-screen w-full">
        {/* <SvgComponent /> */}
        <Text className="text-white text-3xl font-extrabold self-center mt-5">Agendamento</Text>
        <Text className="text-white text-center mt-4">
          Informe seus dados para agendar um horário - {userInfo.name}
        </Text>

        <View className="mt-5 w-full">
          <FlatList
            horizontal={true}
            data={dates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`m-2 p-4 rounded-lg ${item.toISOString().split('T')[0] === date ? 'bg-cyan-700' : 'bg-cyan-500'}`}
                disabled={isDisabled(item)}
                onPress={() => { selectHour(item) }}
              >
                <View className="flex flex-row gap-4">
                  <Text className="text-white">{item.toLocaleDateString('pt-BR', { weekday: 'long' })}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
        <View className="mt-5 w-full">
          <FlatList
            horizontal={true}
            data={availableHours}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`m-2 p-4 rounded-lg ${item === time ? 'bg-cyan-700' : 'bg-cyan-500'}`}
                onPress={() => { setTime(item) }}
              >
                <Text className="text-white">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity
          className="bg-white w-11/12 rounded-xl p-3 shadow-md py-4 self-center mt-5"
          onPress={() => handleSubmit(userInfo)}
        >
          <Text className="text-cyan-500 text-center font-bold text-lg">Confirmar dados</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>

  );
}
