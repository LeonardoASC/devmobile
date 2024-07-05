import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import api from '../../services/api';  // Ajuste o caminho conforme sua estrutura de pastas
import LoadingComponent from "../../components/loadingcomponent";

export function ServicoPrivate({ route, navigation }) {
  const [servico, setServico] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchServicos();
  }, []);

  const fetchServicos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/servico');
      if (response.data && response.data.length) {
        setServices(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (servico.trim() === '') {
      Alert.alert('Erro', 'Por favor, informe o serviço desejado.');
      return;
    }

    Alert.alert(
      "O serviço inserido está correto ?",
      `Servico: ${servico}`, [
      {
        text: "Cancelar",
        onPress: () => navigation.navigate("ServicoPrivate"),
      },
      {
        text: "Confirmar",
        onPress: () => navigation.navigate("SubServicoPrivate",
          {
            serviceId: selectedItemId,
            serviceName: servico
          }),
      },
    ]);
    // console.log(selectedItemId);
  };

  const ServiceItem = ({ item }) => (
    <TouchableOpacity>
      <Text
        onPress={() => {
          setServico(item.name);
          setSelectedItemId(item.id);
        }}
        className={
          item.id === selectedItemId
            ? "text-cyan-500 font-extrabold bg-white justify-center items-center text-center border rounded p-2 border-white my-3 "
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
        <Text className="text-cyan-600 text-xl font-bold text-center">Falta pouco para terminar seu agendamento</Text>
      </View>
      <View className="p-5 flex justify-center items-center h-2/4 w-full mt-10 rounded-tr-xl ">
        <Text className="text-white">Escolha qual serviço esta Procurando</Text>
        {loading ? <LoadingComponent width={100} height={100} /> :
          <FlatList
            data={services}
            renderItem={({ item }) => <ServiceItem item={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        }
      </View>
      <View className="w-full items-center justify-center">

        <TouchableOpacity
          className="bg-white rounded p-3 shadow-md"
          onPress={handleSubmit}
        >
          <Text className="text-cyan-500 font-bold text-lg">Escolher o serviço</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
