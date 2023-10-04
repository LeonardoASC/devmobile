import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../../services/api';


export function ServicoCreate({ navigation }) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    api.post('/servico', { name: name })
      .then(response => {
        if (response.data && response.data.success) {
          Alert.alert('Sucesso', 'Servico foi cadastrado!');
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
    <SafeAreaView className="flex-1 bg-cyan-500 ">

      <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full ">
        <Text className="text-cyan-600 text-xl font-bold text-center">
          Cadastro de Horário
        </Text>
      </View>
      

      <View className="mt-4 mb-4 p-5">
        <TextInput
        type="time"
          placeholder="Insira o horário (ex: 14:00)"
          value={name}
          onChangeText={setName}
          className="border-cyan-600 border p-4 rounded bg-white"
        />
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-white p-4 rounded mt-2 self-center "
      >
        <Text className="text-cyan-500 text-center font-bold text-lg">
          Salvar Servico
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
