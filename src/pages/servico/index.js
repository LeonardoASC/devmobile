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

export function Servico({ navigation }) {
  const [servico, setServico] = useState("");
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleSubmit = () => {
    Alert.alert("Dados inseridos", `Servico: ${servico}`, [
      {
        text: "Cancelar",
        onPress: () => navigation.navigate("Servico"),
      },
      {
        text: "Confirmar",
        onPress: () => navigation.navigate("SubServico"),
      },
    ]);
  };

  const services = [
    { id: "1", name: "Corte de Cabelo", price: "R$ 50,00" },
    { id: "2", name: "Barba", price: "R$ 30,00" },
    { id: "3", name: "Barba", price: "R$ 30,00" },
    { id: "4", name: "Barba", price: "R$ 30,00" },
    { id: "5", name: "Barba", price: "R$ 30,00" },
    { id: "6", name: "Barba", price: "R$ 30,00" },
    { id: "7", name: "Barba", price: "R$ 30,00" },
    { id: "8", name: "Barba", price: "R$ 30,00" },
    { id: "9", name: "Barba", price: "R$ 30,00" },
    { id: "10", name: "Barba", price: "R$ 30,00" },
    { id: "11", name: "Barba", price: "R$ 30,00" },
    { id: "12", name: "Barba", price: "R$ 30,00" },
    { id: "13", name: "Barba", price: "R$ 30,00" },
    { id: "14", name: "Barba", price: "R$ 30,00" },
    // ... outros serviços
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
            ? "text-white bg-black justify-center items-center border rounded-xl p-2 border-white my-3 "
            : "text-white bg-cyan-300 justify-center items-center border rounded-xl p-2 border-white my-3"
        }
      >
        {item.name}: {item.price}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 border rounded-full mt-2">
      <View className="p-5 flex justify-center items-center border h-5/6 border-rose-500 w-full mt-10">
        <FlatList
          data={services}
          renderItem={({ item }) => <ServiceItem item={item} />}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View className="w-full items-center justify-center mt-2">
        <Button title="Escolher o serviço" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}
