import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../../services/api';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


export function HorarioCreate({ navigation }) {
  const [time, setTime] = useState('');

  const handleSubmit = () => {
    api.post('/horario', { hora: time })
      .then(response => {
        if (response.data && response.data.success) {
          Alert.alert('Sucesso', 'Horário foi cadastrado!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Erro ao registrar', response.data.message || 'Erro desconhecido.');
        }
      })
      .catch(error => {
        if (!error.response) {
          console.error('Erro na conexão:', error);
          Alert.alert('Erro', 'Problema de conexão. Verifique sua internet e tente novamente.');
        } else {
          if (error.response.status === 422) {
            let errorMessage = 'Ocorreram erros de validação:\n';

            for (let field in error.response.data.errors) {
              errorMessage += error.response.data.errors[field].join('\n') + '\n';
            }

            Alert.alert('Erro de Validação', errorMessage);
          } else {
            console.error('Erro na requisição:', error.response);
            Alert.alert('Erro', 'Ocorreu um erro. Tente novamente mais tarde.');
          }
        }
      });
  };


  return (
    <SafeAreaView className="flex-1 bg-cyan-100">

      <View className="bg-cyan-100 flex h-1/5 justify-center items-center rounded-bl-xl shadow-neu-inset">
        <Text className="text-cyan-700 text-2xl font-extrabold text-center">
          Cadastro de Horário
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 mt-2">
        <Text className="text-cyan-700 text-3xl font-extrabold self-center">Registrar Horário...</Text>
        <Text className="text-cyan-600 text-center mt-4">Informe o horário desejado.</Text>

        <View className="mt-5 w-full">
          <View className="flex-row items-center p-2 rounded mb-4 shadow-neu-inset bg-white">
            <MaterialIcons name="access-time" size={24} color="black" />
            <TextInput
              type="time"
              placeholder="Insira o horário (ex: 14:00)"
              value={time}
              onChangeText={setTime}
              className="flex-1 ml-2 text-black"
            />
          </View>
        </View>
      </ScrollView>

      <View className="absolute bottom-0 w-full pb-5 px-5">
        <TouchableOpacity
          className="bg-cyan-100 w-11/12 mb-5 rounded-xl p-3 shadow-neu py-4 self-center mt-5"
          onPress={handleSubmit}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="add-alarm" size={24} color="#0e7490" />
            <Text className="text-cyan-700 text-center font-extrabold text-lg ml-2">
              Salvar Horário
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>


  );
}
