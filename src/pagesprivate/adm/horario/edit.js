import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import api from '../../../services/api';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';


export function HorarioEdit({ route, navigation }) {
  const [time, setTime] = useState('');
  const { id } = route.params;

  const handleSubmit = () => {
    if (!id) {
      alert('ID não definido!');
      return;
    }
    api.put(`/horario/${id}`, {
      hora: time,
    })
      .then(response => {
        // console.log(response);
        if (response.status === 200 && response.data.success) {
          Alert.alert("Horário foi Atualizado!");
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
    <SafeAreaView className="flex-1 ">

      <View className=" flex h-1/5 justify-center items-center rounded-bl-xl shadow-neu-inset">
        <Text className="text-white text-2xl font-extrabold text-center">
          Edição de Horário
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 mt-2">
        <Text className="text-white text-3xl font-extrabold self-center">Editar Horário...</Text>
        <Text className="text-white text-center mt-4">Informe o horário desejado.</Text>

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
          className="bg-white w-11/12 mb-5 rounded-xl p-3 shadow-neu py-4 self-center mt-5"
          onPress={handleSubmit}
        >
          <View className="flex flex-row items-center justify-center" >
            <MaterialIcons name="update" size={24} color="#082f49" />
            <Text className="text-[#082f49] text-center font-extrabold text-lg ml-2">
              Atualizar Horário
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>


  );
}
