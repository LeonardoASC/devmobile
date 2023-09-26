import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { Component, useState } from "react";

export function Servico({route, navigation }) {
  const [servico, setServico] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);
  
  const nameProp = route.params?.nameProp;
  const dateProp = route.params?.dateProp;
  const timeProp = route.params?.timeProp;

  const handleSubmit = () => {
    if (servico.trim() === '') {
      Alert.alert('Erro', 'Por favor, informe o serviço desejado.');
      return;
    }

    Alert.alert("Dados inseridos", `Servico: ${servico}`, [
      {
        text: "Cancelar",
        onPress: () => navigation.navigate("Servico"),
      },
      {
        text: "Confirmar",
        onPress: () => navigation.navigate("SubServico",
          {
            nameProp: nameProp,
            dateProp: dateProp,
            timeProp: timeProp,
            serviceId: selectedItemId,
            serviceName: servico
          }),
      },
    ]);
  };

  const services = [
    { id: "1", name: "Corte Masculino" },
    { id: "2", name: "Corte Barba" },
    { id: "3", name: "Tintura em cabelo" },
    { id: "4", name: "Limpeza de pele" },

  ];

  const ServiceItem = ({ item }) => (
    <TouchableOpacity

    >
      <Text
        onPress={() => {
          setServico(item.name);
          setSelectedItemId(item.id);
        }}
        className={
          item.id === selectedItemId
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
        <Text className="text-cyan-600 text-xl font-bold text-center">Falta pouco para terminar seu agendamento</Text>
      </View>
      <View className="p-5 flex justify-center items-center h-2/4 w-full mt-10 rounded-tr-xl ">
        <Text className="text-white">Escolha qual serviço esta Procurando</Text>
        <FlatList
          data={services}
          renderItem={({ item }) => <ServiceItem item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
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
