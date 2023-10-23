import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, Alert, Image } from "react-native";
import api from '../../services/api';
import { MaterialIcons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import LoadingComponent from "../../components/loadingcomponent";
export function SubServico({ route, navigation }) {
  const serviceId = route.params?.serviceId;
  const nameProp = route.params?.nameProp;
  const dateProp = route.params?.dateProp;
  const timeProp = route.params?.timeProp;
  const serviceName = route.params?.serviceName;

  const [subServices, setSubServices] = useState([]);
  const [selectedSubService, setSelectedSubService] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubServicos = async () => {
      try {
        setLoading(true);
        const response = await api.get('/subservico');
        if (response.data && response.data.length) {
          const filteredSubServices = response.data.filter(subService => subService.servico_id === serviceId);
          setSubServices(filteredSubServices);
        }
      } catch (error) {
        console.error("Erro ao buscar subserviços:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubServicos();
  }, [serviceId]);


  const formatDuration = (duration) => {
    const [hour, minute] = duration.split(':');
    return `${hour}:${minute}`;
  }

  const SubServiceItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedSubService(item)}
      className={
        "flex flex-row gap-x-2 items-center px-4 py-2  w-full " +
        (item.name === selectedSubService?.name ? " " : "")
      }
    >
      <Image
        source={{ uri: item.imagem }}

        className={(item.name === selectedSubService?.name ? "flex-shrink-0 my-2 rounded-full z-10 w-40 h-40" : "flex-shrink-0 my-2 rounded-full z-10 w-32 h-32 ")}
      />

      <View
        className={
          "flex flex-col gap-y-2 rounded-3xl items-center justify-center w-48 right-10 p-4 pl-10 shadow-lg transform hover:scale-105 transition-transform duration-200 " +
          (item.name === selectedSubService?.name ? "bg-cyan-600" : "bg-gray-400")
        }
      >
        <View className="flex flex-row justify-center items-center gap-x-1 w-28">
          <MaterialCommunityIcons
            name="hair-dryer-outline"
            size={26}
            color={item.name === selectedSubService?.name ? "white" : "#082f49"}
          />
          <Text
            className={
              "font-semibold " +
              (item.name === selectedSubService?.name ? "text-white font-extrabold " : "text-gray-800")
            }
          >
            {item.name}
          </Text>
        </View>

        <View className="flex flex-row justify-center items-center gap-x-1">
          <Feather
            name="clock"
            size={22}
            color={item.name === selectedSubService?.name ? "white" : "#082f49"}
          />
          <Text
            className={
              "font-semibold " +
              (item.name === selectedSubService?.name ? "text-white font-extrabold" : "text-gray-800")
            }
          >
            {formatDuration(item.tempo_de_duracao)}
          </Text>

          <MaterialIcons
            name="attach-money"
            size={26}
            color={item.name === selectedSubService?.name ? "white" : "#082f49"}
          />
          <Text
            className={
              "font-semibold " +
              (item.name === selectedSubService?.name ? "text-white" : "text-gray-800")
            }
          >
            {item.preco}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white h-1/4 rounded-bl-full justify-center  items-center">
        <Text className="text-cyan-600 text-xl font-bold text-center">Escolha de {serviceName}</Text>
      </View>

      <View className="flex justify-center items-center h-3/5 w-full mt-8 rounded-tr-xl">
        <Text className="text-white">Escolha o tipo de {serviceName} que você deseja:</Text>
        {loading ? <LoadingComponent width={100} height={100} /> :
          <FlatList
            className="w-full"
            data={subServices}
            renderItem={({ item, index }) => <SubServiceItem item={item} index={index} />}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
      <View className="w-full items-center justify-center ">
        <TouchableOpacity
          className="bg-white rounded p-3 shadow-md"
          onPress={() => {
            if (!selectedSubService) {
              Alert.alert('Erro', 'Por favor, selecione um sub-serviço.');
              return;
            }
            navigation.navigate('Agendado',
              {
                nameProp: nameProp,
                dateProp: dateProp,
                timeProp: timeProp,
                serviceName: serviceName,
                subServiceName: selectedSubService.name,
                subServiceId: selectedSubService.id,
                precoService: selectedSubService.preco
              })
          }}
        >
          <Text className="text-cyan-500 font-bold text-lg">Selecionar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
