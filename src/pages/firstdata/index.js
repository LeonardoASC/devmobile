import { View, Text, Alert, TouchableOpacity, FlatList, SafeAreaView, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect } from "react";
import SvgComponent from "../../svg/circulo";
import { Ionicons, Feather } from '@expo/vector-icons';
import api from "../../services/api";

export function FirstData({ route, navigation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [dates, setDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);

  const handleSubmit = async () => {
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
          "Confirmar dados inseridos",
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

  return (
    <SafeAreaView className="flex-1 ">

      <View className="p-5 items-center justify-center h-screen w-full mt-10">

        {/* Título */}
        <View className="flex flex-row items-center mb-5">
          <Ionicons name="calendar-outline" size={32} color="white" />
          <Text className="text-white text-3xl font-extrabold self-center ml-3">Data/Horario</Text>
        </View>

        <View className="flex-row items-center  p-2 rounded mb-2 border-b border-zinc-300">
          <Ionicons name="person-outline" size={20} color="white" />
          <TextInput
            placeholder="Nome"
            placeholderTextColor="#a3a3a3"
            value={name}
            onChangeText={setName}
            className="flex-1 ml-2 text-white"
          />
        </View>

        {/* Lista de datas */}
        {/* <View className=" flex flex-row items-center mt-4 w-full ">
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
        </View> */}

        <View className=" flex flex-row items-center mt-4 w-full ">
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
                  className={`m-4 p-8 rounded-lg ${item.toISOString().split('T')[0] === date ? 'bg-white shadow-md shadow-black justify-center items-center w-36' : 'w-36 bg-gray-300 justify-center items-center text-center border rounded-lg p-4 border-gray-300 my-3 '}`}
                >
                  <Text className={`p-2 ${item.toISOString().split('T')[0] === date ? ' text-cyan-500 text-4xl' : 'text-lg text-cyan-500  '} ${isDisabled(item) ? 'text-gray-400 ' : 'opacity-100'}`}>
                    {item.toLocaleDateString('pt-BR', { day: 'numeric' })}
                  </Text>
                  <Text className={` ${item.toISOString().split('T')[0] === date ? ' text-cyan-500 ' : 'text-cyan-500 '} ${isDisabled(item) ? 'text-gray-400' : 'opacity-100'}`}>
                    {item.toLocaleDateString('pt-BR', { weekday: 'long' })}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>


        {/* Alerta */}
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
          onPress={handleSubmit}
          className="flex flex-row items-center mt-8 bg-white w-3/5 p-3 rounded-lg shadow-black justify-between"
        >
          <Text className="text-black">Agendar</Text>
          <Feather name="arrow-right" size={24} color="black" />
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
}
