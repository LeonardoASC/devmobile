import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Button, FlatList, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import api from "../../../services/api"
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { Easing, withSpring, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';


export function Servico({ navigation }) {

  const [name, setName] = useState([]);

  useEffect(() => {
    fetchTimes();
  }, []);

  const fetchTimes = async () => {
    try {
      const response = await api.get('/servico');
      if (response.data && response.data.length) {
        setName(response.data);
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
      const response = await api.delete(`/servico/${id}`);
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

  const AnimatedFlatListItem = ({ item, navigation, confirmDelete, isVisible }) => {
    const opacity = useSharedValue(isVisible ? 1 : 0.1); // Adjust the reduced opacity as required

    const transition = {
      duration: 800, // Duration of the animation
      easing: Easing.bezier(0.08, 0.08, 0.01, 5) // Adjusted Bezier curve for ultra-smooth transition
    };

    useEffect(() => {
      opacity.value = isVisible
        ? withTiming(1, transition)
        : withTiming(0.1, transition);
    }, [isVisible]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
      };
    });

    return (
      <Animated.View style={[animatedStyle, /* other styles here */]}>
        <View className="flex-row justify-between items-center mb-4 py-2 px-4  rounded-xl shadow-neu">
          <Text className="text-white text-lg">{item.name}</Text>
          <View className="flex-row">
            <TouchableOpacity
              className=" p-2 rounded-lg mr-2 shadow-neu-inset"
              onPress={() => navigation.navigate('ServicoEdit', { id: item.id })}
            >
              <MaterialIcons name="edit" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              className=" p-2 rounded-lg shadow-neu-inset"
              onPress={() => confirmDelete(item.id)}
            >
              <MaterialIcons name="delete" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    );
  };
  const [visibleItems, setVisibleItems] = useState({});

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // Adjust as needed
  };

  const handleViewableItemsChanged = useRef(({ viewableItems }) => {
    const newVisibleItems = {};
    viewableItems.forEach(item => {
      newVisibleItems[item.key] = true;
    });
    setVisibleItems(newVisibleItems);
  }).current;

  return (
    <SafeAreaView className="flex-1 bg-[#082f49]">
      <View className=" flex h-1/4 justify-center items-center rounded-bl-xl shadow-neu-inset">
        <Text className="text-white text-2xl font-extrabold text-center">
          Serviços do Barbeiro
        </Text>
      </View>

      <View className="p-5 flex-1">
        <FlatList
          data={name}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AnimatedFlatListItem
              item={item}
              navigation={navigation}
              confirmDelete={confirmDelete}
              isVisible={!!visibleItems[item.id]}
            />
          )}
          onViewableItemsChanged={handleViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
        <TouchableOpacity
          className="bg-white w-11/12 rounded-xl p-3 shadow-neu py-4 self-center mt-5"
          onPress={() => navigation.navigate('ServicoCreate')}
        >
          <Text className="text-[#082f49] text-center font-extrabold text-xl">+ Cadastrar Serviço</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>

  );
};
