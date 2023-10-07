import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../../services/api';


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
    <SafeAreaView className="flex-1 bg-cyan-500">

    <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full">
        <Text className="text-cyan-600 text-xl font-bold text-center">
            Cadastro de Horário
        </Text>
    </View>

    <View className="flex-1 p-5 mt-2">
        <Text className="text-white text-3xl font-extrabold self-center">Registrar Horário...</Text>
        <Text className="text-white text-center mt-4">Informe o horário desejado.</Text>

        <View className="mt-5 w-full">
            <View className="flex-row items-center bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
                <TextInput
                    type="time"
                    placeholder="Insira o horário (ex: 14:00)"
                    value={time}
                    onChangeText={setTime}
                    className="flex-1 ml-2 text-white"
                />
            </View>
        </View>

        <TouchableOpacity
            className="bg-white w-11/12 rounded-xl p-3 shadow-md py-4 self-center mt-5"
            onPress={handleSubmit}
        >
            <Text className="text-cyan-500 text-center font-bold text-lg">
                Salvar Horário
            </Text>
        </TouchableOpacity>
    </View>

</SafeAreaView>

  );
}
