import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert} from "react-native";
import api from '../../services/api';

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
    <TouchableOpacity>
      <Text
        onPress={() => setSelectedSubService(item)}
        className={
          item.name === selectedSubService?.name
            ? "text-cyan-500 bg-white justify-center items-center text-center border rounded p-2 border-white my-3 "
            : "text-cyan-500 bg-gray-200 justify-center items-center text-center border rounded p-2 border-gray-200 my-3"
        }
      >
        {item.name}
      </Text>
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
