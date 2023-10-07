import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button, FlatList, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import api from "../../../services/api"
import { MaterialIcons } from '@expo/vector-icons';



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
        // const horaValues = response.data.map(item => item.hora);
        setTimes(response.data);
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
    <SafeAreaView className="flex-1 bg-cyan-100">

      <View className="bg-cyan-100 flex h-1/4 justify-center items-center rounded-bl-xl shadow-neu-inset">
        <Text className="text-cyan-700 text-2xl font-extrabold text-center">
          Horários do Barbeiro
        </Text>
      </View>

      <View className="p-5 flex-1">

        <FlatList
          className="flex-grow mt-5"
          data={times}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center mb-4 py-2 px-4 bg-cyan-100 rounded-xl shadow-neu">
              <Text className="text-cyan-700 text-lg">{item.hora}</Text>
              <View className="flex-row">
                <TouchableOpacity
                  className="bg-cyan-100 p-2 rounded-lg mr-2 shadow-neu-inset"
                  onPress={() => navigation.navigate('HorarioEdit', { id: item.id })}
                >
                  <MaterialIcons name="edit" size={24} color="cyan-700" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-cyan-100 p-2 rounded-lg shadow-neu-inset"
                  onPress={() => confirmDelete(item.id)}
                >
                  <MaterialIcons name="delete" size={24} color="red-500" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />

        <TouchableOpacity
          className="bg-cyan-100 w-11/12 rounded-xl p-3 shadow-neu py-4 self-center mt-5"
          onPress={() => navigation.navigate('HorarioCreate')}
        >
          <Text className="text-cyan-500 text-center font-extrabold text-xl">+ Cadastrar Horário</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>



  );
};
