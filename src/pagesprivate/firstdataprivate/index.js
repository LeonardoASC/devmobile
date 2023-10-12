import { View, Text, TextInput, Alert, TouchableOpacity, FlatList } from "react-native";
import React, { Component, useState, useContext, useEffect } from "react";
import SvgComponent from "../../svg/circulo";
import { AuthContext } from "../../context/AuthContext"
import { Ionicons, Feather } from '@expo/vector-icons';
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
          const hoursArray = Object.values(response.data.unreservedHours).map(convertToHourMinute);
          setAvailableHours(hoursArray);
        } else {
          alert('Erro ao obter os horários! ' + (response.data.message || ''));
        }
      })
      .catch(error => {
        console.error("Erro ao obter os horários:", error);
      });
  }

  function convertToHourMinute(timeString) {
    const parts = timeString.split(':');
    return parts[0] + ':' + parts[1];
  }

  return (

    <SafeAreaView className="flex-1 bg-cyan-200">

      <View className="p-5 items-center justify-center h-screen w-full">

        {/* Título */}
        <View className="flex flex-row items-center mb-5">
          <Ionicons name="calendar-outline" size={32} color="white" />
          <Text className="text-white text-3xl font-extrabold self-center ml-3">Agendamento</Text>
        </View>

        <Text className="text-white text-center mt-1 mb-5">
          Olá, {userInfo.name}. Selecione uma data e horário para prosseguir com seu agendamento.
        </Text>

        {/* Lista de datas */}
        <View className=" flex flex-row items-center mt-5 w-full ">
          <Ionicons name="today-outline" size={24} color="white" />
          <FlatList
            className="flex"
            horizontal={true}
            data={dates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="justify-center items-center"
                disabled={isDisabled(item)}
                onPress={() => { selectHour(item) }}
              >
                <View
                  className={`m-4 p-8 rounded-lg ${item.toISOString().split('T')[0] === date ? 'bg-white shadow-md shadow-black justify-center items-center w-36' : 'w-36 bg-gray-200 justify-center items-center text-center border rounded-lg p-4 border-gray-200 my-3 '}`}
                >
                  <Text className={`p-2${item.toISOString().split('T')[0] === date ? ' text-cyan-500 text-4xl' : 'text-lg text-cyan-500  '}`}>
                    {item.toLocaleDateString('pt-BR', { day: 'numeric' })}
                  </Text>
                  <Text className={`${item.toISOString().split('T')[0] === date ? ' text-cyan-500 ' : 'text-cyan-500 '}`}>
                    {item.toLocaleDateString('pt-BR', { weekday: 'long' })}
                  </Text>

                </View>

              </TouchableOpacity>
            )}
          />
        </View>
        <View className="bg-gray-200  flex flex-row gap-2 items-center justify-center mt-3 rounded-xl mx-3 px-4 py-2">
          <View className="pb-2">

            <Feather name="alert-octagon" size={16} color="black" />
          </View>
          <Text className="text-xs pb-2 ">Os agendamentos devem ser realizados com pelo menos 30 minutos de antecedência.</Text>
        </View>

        {/* Lista de horas */}
        <View className="flex flex-row items-center mt-5 w-full">
          <Ionicons name="time-outline" size={24} color="white" className="mr-3" />
          <FlatList
            horizontal={false}
            numColumns={4}
            data={availableHours}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="justify-center items-center"
                onPress={() => { setTime(item) }}
              >
                <Text className={`m-2 p-4 rounded-lg ${item === time ? 'bg-white shadow-md shadow-black text-cyan-500' : 'text-cyan-500 bg-gray-200 justify-center items-center text-center border rounded p-2 border-gray-200 my-3'}`}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Botão de confirmação */}
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
