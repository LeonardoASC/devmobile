import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';
import api from '../../../services/api';

export function Create({navigation}) {
  const [time, setTime] = useState('');

  const handleSubmit = () => {
   
    api.post('/horario/create', {
        hora: hora,
    })
        .then(response => {
            if (response.data) {
                // alert('Você foi cadastrado!'+' Hora de agendar seu próximo corte e ficar no estilo.');
                Alert.alert("horario foi cadastrado!");
                navigation.navigate('Home');
            } else {
                alert('Erro ao registrar! ' + (response.data.message || ''));
            }
        })
        .catch(error => {
            console.error("Erro na requisição:", error);
            alert('Ocorreu um erro. Tente novamente mais tarde.');
        });


    console.log('Horário salvo:', time);
  };

  return (
    <SafeAreaView className="flex-1 bg-cyan-500 p-5">
      
      <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full">
        <Text className="text-cyan-600 text-xl font-bold text-center">
          Cadastro de Horário
        </Text>
      </View>

      <View className="mt-4 mb-4">
        <TextInput 
          placeholder="Insira o horário (ex: 14:00)"
          value={time}
          onChangeText={setTime}
          className="border-cyan-600 border p-4 rounded bg-white"
        />
      </View>

      <TouchableOpacity 
        onPress={handleSubmit}
        className="bg-cyan-500 p-4 rounded mt-2 self-center"
      >
        <Text className="text-white text-center font-bold text-lg">
          Salvar Horário
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
