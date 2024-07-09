import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, FlatList, Text, Alert, Switch } from 'react-native';
import api from "../../../services/api";
import OpenDrawerButton from '../../../components/opendrawer';

export function Dia({ navigation }) {

  const [days, setDays] = useState([]);
  const [lastToggleTime, setLastToggleTime] = useState({});

  useEffect(() => {
    fetchDays();
  }, []);

  const fetchDays = async () => {
    try {
      const response = await api.get('/dia');
      if (response.data && response.data.length) {
        setDays(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar dias:", error);
    }
  };

  const toggleSwitch = async (id, currentStatus) => {
    const currentTime = new Date().getTime();
    if (lastToggleTime[id] && currentTime - lastToggleTime[id] < 10000) { // 10 segundos
      Alert.alert('Aguarde', 'Você só pode alterar o status novamente após 10 segundos.');
      return;
    }
    try {
      const day = days.find(item => item.id === id);
      const newStatus = currentStatus === 'ativo' ? 'inativo' : 'ativo';
      const response = await api.put(`/dia/${id}`, {
        codigo_dia: day.codigo_dia,
        dia: day.dia,
        status: newStatus
      });
      if (response.status === 200) {
        setLastToggleTime(prevState => ({ ...prevState, [id]: currentTime }));
        fetchDays();
      } else {
        Alert.alert('Erro!', 'Erro ao alterar status.');
      }
    } catch (error) {
      console.error("Erro ao alterar status:", error.response ? error.response.data : error.message);
      Alert.alert('Erro!', 'Erro ao alterar status.');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#082f49]">
      <View className="h-1/5 w-full justify-center items-center">
        <View className="w-full flex-row items-center justify-center mb-5">
          <OpenDrawerButton />
          <View className="flex-1 items-center">
            <Text className="text-white font-bold text-xl">Dias de Atendimento</Text>
          </View>
        </View>
      </View>

      <View className="h-4/5">
        <FlatList
          className="flex-grow mt-5"
          data={days}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center mb-4 py-2 px-4 rounded-xl">
              <View>
                <Text className="text-white text-lg">{item.dia}</Text>
                <Text className="text-white text-lg">{item.status}</Text>
              </View>
              <View className="flex-row">
                <Switch
                  trackColor={{ false: "#5e5d5e", true: "#afaeb0" }}
                  thumbColor={item.status === 'ativo' ? "#f4f3f4" : "#afaeb0"}
                  ios_backgroundColor="#3e3e3e"
                  value={item.status === 'ativo'}
                  onValueChange={() => toggleSwitch(item.id, item.status)}
                />
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};
