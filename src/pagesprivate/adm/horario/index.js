import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button, FlatList, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import api from "../../../services/api"
import { MaterialIcons } from '@expo/vector-icons';
import OpenDrawerButton from '../../../components/opendrawer';
import { Feather } from '@expo/vector-icons';



export function Horario({ navigation }) {

  const [times, setTimes] = useState([]);

  useEffect(() => {
    // Chamar a API quando o componente for montado
    fetchTimes();
  }, []);



  const fetchTimes = async () => {
    try {
      const response = await api.get('/horario');
      if (response.data && response.data.length) {
        const formattedTimes = response.data.map(item => ({
          ...item,
          hora: item.hora.slice(0, 5)
        }));
        setTimes(formattedTimes);
      }
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
    }
  };

  const confirmDelete = (id) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Confirmar',
          onPress: () => deleteHora(id)
        }
      ]
    );
  };

  const deleteHora = async (hora) => {
    try {
      const response = await api.delete(`/horario/${hora}`);
      if (response.status === 200) {
        Alert.alert('Sucesso!', 'Horário deletado com sucesso.');
        fetchTimes(); // Atualizar a lista após deletar o horário
      } else {
        Alert.alert('Erro!', 'Erro ao deletar horário.');
      }
    } catch (error) {
      console.error("Erro ao deletar horário:", error);
      Alert.alert('Erro!', 'Erro ao deletar horário.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#082f49]">
      <View className="h-1/6 w-full justify-center items-center">
        <View className="w-full flex-row items-center justify-center">
          <OpenDrawerButton />
          <View className="flex-1 items-center">
            <Text className="text-white font-bold text-xl">Horários de atendimento</Text>
          </View>
        </View>
      </View>

      <View className="p-5 h-4/5">
        <View className="bg-gray-200 flex flex-row gap-2 items-center justify-center rounded-xl mx-3 px-4 py-2">
          <View className="pb-2">
            <Feather name="alert-octagon" size={16} color="black" />
          </View>
          <Text className="text-xs pb-2 ">Certifique-se de revisar os horarios de trabalho ativos antes de confirmar as alterações. Alterar frequentemente os horarios de trabalho pode confundir seus clientes e impactar seus agendamentos.</Text>
        </View>
        {times.length === 0 ? (
          <View className="h-4/5">
            <Text className="text-white text-center mt-10">Nenhum horario encontrado</Text>
          </View>
        ) : (
          <FlatList
            className="flex-grow mt-5"
            data={times}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="flex-row justify-between items-center mb-4 py-2 px-4  rounded-xl shadow-neu">
                <Text className="text-white text-lg">{item.hora}</Text>
                <View className="flex-row">
                  <TouchableOpacity
                    className=" p-2 rounded-lg mr-2 shadow-neu-inset"
                    onPress={() => navigation.navigate('HorarioEdit', { id: item.id })}
                  >
                    <MaterialIcons name="edit" size={24} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className=" p-2 rounded-lg shadow-neu-inset"
                    onPress={() => confirmDelete(item.id)}
                  >
                    <MaterialIcons name="delete" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}


        <TouchableOpacity
          className=" bg-white w-11/12 rounded-xl p-3 shadow-neu py-4 self-center mt-5"
          onPress={() => navigation.navigate('HorarioCreate')}
        >
          <Text className="text-[#082f49] text-center font-extrabold text-xl">+ Cadastrar Horário</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>



  );
};
