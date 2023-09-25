import { View, Text } from 'react-native'
import {
    FlatList,
    SafeAreaView,
    Button,
    Alert,
    TouchableOpacity,
} from "react-native";
import React, { Component, useState } from "react";

// export function SubServico({ navigation }) {
//     const subServices = [
//         { id: "1.1", serviceId: "1", name: "Corte Rápido" },
//         { id: "1.2", serviceId: "1", name: "Corte Detalhado" },
//         { id: "2.1", serviceId: "2", name: "Barba Simples" },
//         { id: "2.2", serviceId: "2", name: "Barba Completa" },
//         // ... outros sub-serviços
//     ];
//     return (
//         <SafeAreaView>
//             <View >
//                 <Text>Profile</Text>
//             </View>
//         </SafeAreaView>
//     )
// }

export function SubServico({ route }) {
    // Obtenha o serviceId do parâmetro da rota
    const { serviceId } = route.params;

    const subServices = [
                { id: "1.1", serviceId: "1", name: "Corte Rápido" },
                { id: "1.2", serviceId: "1", name: "Corte Detalhado" },
                { id: "2.1", serviceId: "2", name: "Barba Simples" },
                { id: "2.2", serviceId: "2", name: "Barba Completa" },
                // ... outros sub-serviços
            ];
  
    
    const filteredSubServices = subServices.filter(subService => subService.serviceId === serviceId);
  
    const [selectedSubService, setSelectedSubService] = useState("");
  
    const SubServiceItem = ({ item }) => (
      <TouchableOpacity>
        <Text
          onPress={() => setSelectedSubService(item.name)}
          className={
            item.name === selectedSubService
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
            data={filteredSubServices}
            renderItem={({ item }) => <SubServiceItem item={item} />}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        </View>
        <View className="w-full items-center justify-center">
          <TouchableOpacity
            className="bg-white rounded p-3 shadow-md"
            onPress={() => { /* Aqui você pode navegar para a próxima etapa ou salvar a escolha */ }}
          >
            <Text className="text-cyan-500 font-bold text-lg">Confirmar sub-serviço</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
