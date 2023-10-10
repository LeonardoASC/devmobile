import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import api from '../../../services/api';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

export function ServicoEdit({ route, navigation }) {
  const [name, setName] = useState('');
  const { id } = route.params;

  const handleSubmit = () => {
    if (!id) {
      alert('ID não definido!');
      return;
    }
    api.put(`/servico/${id}`, {
      name: name,
    })
      .then(response => {
        // console.log(response);
        if (response.status === 200 && response.data.success) {
          Alert.alert("Serviço foi Atualizado!");
          navigation.navigate('Home');
        } else {
          // Isto pode ser melhorado para lidar com outros erros não relacionados à validação
          alert('Erro ao registrar! ' + (response.data.msg || ''));
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          let errorMessage = 'Erros de validação:\n';
          for (let field in error.response.data.errors) {
            errorMessage += error.response.data.errors[field].join('\n');
          }
          alert(errorMessage);
        } else {
          console.error("Erro na requisição:", error);
          alert('Ocorreu um erro. Tente novamente mais tarde.');
        }
      });

    // console.log('Horário salvo:', time, id);
  };


  return (
    <SafeAreaView className="flex-1 bg-cyan-100">

      <View className="bg-cyan-100 flex h-1/5 justify-center items-center rounded-bl-xl shadow-neu-inset">
        <Text className="text-cyan-700 text-2xl font-extrabold text-center">
          Edição de Serviço
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 mt-2">
        <Text className="text-cyan-700 text-3xl font-extrabold self-center">Editar Serviço...</Text>
        <Text className="text-cyan-600 text-center mt-4">Altere o serviço conforme necessário.</Text>

        <View className="mt-5 w-full">
          <View className="flex-row items-center p-2 rounded mb-4 shadow-neu-inset bg-white">
            <MaterialIcons name="edit" size={24} color="black" />
            <TextInput
              placeholder="Insira o serviço (ex: Corte Masculino)"
              value={name}
              onChangeText={setName}
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
            <MaterialIcons name="update" size={24} color="#0e7490" />
            <Text className="text-cyan-700 text-center font-extrabold text-lg ml-2">
              Atualizar Serviço
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>


  );
}
