import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View, Button, FlatList, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import api from "../../../services/api"

export function SubServico({ navigation }) {

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchTimes();
  }, []);

  const fetchTimes = async () => {
    try {
      const response = await api.get('/subservico');
      if (response.data && response.data.length) {
        setServices(response.data);
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
          onPress: () => deleteServico(id)
        }
      ]
    );
  };

  const deleteServico = async (id) => {
    try {
      const response = await api.delete(`/subservico/${id}`);
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
    <SafeAreaView className="flex-1">
      <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full">
        <Text className="text-cyan-600 text-xl font-bold">
          Sub-Serviços do Barbeiro
        </Text>
      </View>
      <View className="p-5">
        <FlatList
          className="h-3/5"
          data={services}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center mb-4 py-2 px-4 bg-white rounded-lg">
              {/* <Image source={{ uri: item.imagem }} className="w-12 h-12 rounded-full" /> */}
              <Text className="text-cyan-700">|{item.name}|</Text>
              <Text className="text-cyan-600">{item.preco}|</Text>
              <Text className="text-cyan-600">{item.tempo_de_duracao}</Text>
              <View className="flex-row">
                <TouchableOpacity className="bg-cyan-500 p-2 rounded-lg mr-2"
                  onPress={() => navigation.navigate('SubServicoEdit', { id: item.id })}>
                  <Text className="text-white">Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-cyan-500 p-2 rounded-lg"
                  onPress={() => confirmDelete(item.id)}>
                  <Text className="text-white">Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          contentContainerStyle={{ marginTop: 15 }}
        />

        <TouchableOpacity
          className="bg-white w-11/12 rounded-xl p-3 shadow-md py-4 self-center mt-5"
          onPress={() => navigation.navigate('SubServicoCreate')}>
          <Text className="text-cyan-500 text-center font-bold text-lg">Cadastrar SubServico</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};
