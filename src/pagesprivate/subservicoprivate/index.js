import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert, Image } from "react-native";
import api from '../../services/api';
import { MaterialIcons, Feather } from '@expo/vector-icons';

export function SubServicoPrivate({ route, navigation }) {
  const serviceId = route.params?.serviceId;
  const nameProp = route.params?.nameProp;
  const dateProp = route.params?.dateProp;
  const timeProp = route.params?.timeProp;
  const serviceName = route.params?.serviceName;

  const [subServices, setSubServices] = useState([]);
  const [selectedSubService, setSelectedSubService] = useState(null);

  useEffect(() => {
    const fetchSubServicos = async () => {
      try {
        const response = await api.get('/subservico');
        if (response.data && response.data.length) {
          const filteredSubServices = response.data.filter(subService => subService.servico_id === serviceId);
          setSubServices(filteredSubServices);
        }
      } catch (error) {
        console.error("Erro ao buscar subserviços:", error);
      }
    };

    fetchSubServicos();
  }, [serviceId]);

  const SubServiceItem = ({ item }) => (
    
      <TouchableOpacity
        onPress={() => setSelectedSubService(item)}
        className={
          "justify-center items-center p-4 my-3 rounded-xl border-2 " +
          (item.name === selectedSubService?.name ? "bg-white border-white shadow-md" : "bg-gray-200 border-gray-300")
        }
      >
        <Image
          source={{ uri: item.imagem }}
          className="w-24 h-24 my-2 rounded-full"
        />
        <Text className={
          "text-cyan-500 text-center  " +
          (item.name === selectedSubService?.name ? "" : "bg-gray-200")
        }>{item.name}</Text>
        <View className="flex flex-row gap-x-2 mt-4 items-center justify-center">

          <View className="flex flex-row justify-center items-center ">
            <MaterialIcons name="attach-money" size={24} color="#06b6d4" />
            <Text className={
              "text-cyan-500 text-center " +
              (item.name === selectedSubService?.name ? "" : "bg-gray-200")
            }>{item.preco}</Text>
          </View>

          <View className="flex flex-row justify-center items-center gap-x-1">
            <Feather name="clock" size={20} color="#06b6d4" />
            <Text className={
              "text-cyan-500 text-center" +
              (item.name === selectedSubService?.name ? "" : "bg-gray-200")
            }>{item.tempo_de_duracao}</Text>
          </View>
        </View>
      </TouchableOpacity>
    
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white h-1/4 rounded-bl-full justify-center  items-center">
        <Text className="text-cyan-600 text-xl font-bold text-center">Escolha o sub-serviço</Text>
      </View>
      
      <View className="p-5 flex justify-center items-center h-2/4 w-full mt-10 rounded-tr-xl ">
        <Text className="text-white">Escolha o tipo de sub-serviço que você deseja:</Text>
        <FlatList
          data={subServices}
          renderItem={({ item }) => <SubServiceItem item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View className="w-full items-center justify-center">
        <TouchableOpacity
          className="bg-white rounded p-3 shadow-md"
          onPress={() => {
            if (!selectedSubService) {
              Alert.alert('Erro', 'Por favor, selecione um sub-serviço.');
              return;
            }

            navigation.navigate('AgendadoPrivate',
              {
                nameProp: nameProp,
                dateProp: dateProp,
                timeProp: timeProp,
                serviceName: serviceName,
                subServiceName: selectedSubService.name,
                subServiceId: selectedSubService.id,
                // Adicione mais campos aqui se precisar
              })
          }}
        >
          <Text className="text-cyan-500 font-bold text-lg">Selecionar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
