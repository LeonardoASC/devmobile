import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Modal, FlatList, Text, TextInput, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import api from "../../../services/api"
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import OpenDrawerButton from '../../../components/opendrawer';



export function SubServico({ navigation }) {
  const isFocused = useIsFocused();
  const [services, setServices] = useState([]);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [uniqueServices, setUniqueServices] = useState([]);

  const dataWithAllOption = [
    { id: -1, name: 'Todos' },
    ...uniqueServices
  ];

  useEffect(() => {
    if (isFocused) {
      fetchTimes();
      fetchServices();
    }
  }, [isFocused]);

  const fetchTimes = async () => {
    try {
      const baseURL = 'http://192.168.15.6:8000/storage/'; // URL base do servidor
      // const baseURL = 'http://10.55.0.220:8000/storage/'; // URL base do servidor
      const response = await api.get('/subservico');
      // console.log(response.data);
      if (response.data && response.data.length) {
        const formattedTimes = response.data.map(item => ({
          ...item,
          tempo_de_duracao: item.tempo_de_duracao.slice(0, 5),
          imagem: baseURL + item.imagem // Concatena a baseURL com o caminho da imagem
        }));
        setServices(formattedTimes);
      }
    } catch (error) {
      console.error("Erro ao buscar horários:", error);
    }
  };


  const fetchServices = async () => {
    try {
      const response = await api.get('/servico');
      if (response.data && response.data.length) {
        setUniqueServices(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar serviços:", error);
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

  const handleImageClick = (uri) => {
    setSelectedImage(uri);
    setImageModalVisible(true);
  };

  const filteredSubServices = selectedServiceId
    ? services.filter(service => service.servico_id === selectedServiceId)
    : services;

  return (
    <SafeAreaView className="flex-1 bg-[#082f49]">
      <View className="h-1/5 w-full  justify-center items-center">
        <View className="w-full flex-row items-center justify-center mb-5">
          <OpenDrawerButton />
          <View className="flex-1 items-center">
            <Text className="text-white font-bold text-xl">Subservico</Text>
          </View>
        </View>
      </View>

      <View className="h-4/5">
        <View className=" bg-white ">
          <FlatList
            horizontal={true}
            data={dataWithAllOption}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className={`items-center justify-center m-2 bg-white shadow-neu ${item.id === selectedServiceId || (item.id === -1 && selectedServiceId == null) ? "border-b border-[#082f49]" : ""}`}
                onPress={() => setSelectedServiceId(item.id === -1 ? null : item.id)}
              >
                <Text className="text-[#082f49] p-2">{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <FlatList
          className="flex-grow mt-5"
          data={filteredSubServices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between mb-4 py-3 px-8 rounded-xl shadow-neu">
              <View className="flex  justify-center">
                <View className="flex w-[75%]">
                  <Text className="text-white">Nome: {item.name}</Text>
                  <Text className="text-slate-400">Preço: {item.preco}</Text>
                  <Text className="text-slate-400">Tempo estimado: {item.tempo_de_duracao}min</Text>
                </View>

                <View className="flex flex-row gap-y-2 items-center ">
                  <TouchableOpacity
                    className="bg-white p-2 rounded-lg mr-2 shadow-neu-inset items-center justify-center"
                    onPress={() => navigation.navigate('SubServicoEdit', { id: item.id })}>
                    <MaterialIcons name="edit" size={24} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-white p-2 rounded-lg shadow-neu-inset items-center justify-center"
                    onPress={() => confirmDelete(item.id)}>
                    <MaterialIcons name="delete" size={24} color="black" />
                  </TouchableOpacity>
                </View>

              </View>
              <TouchableOpacity onPress={() => handleImageClick(item.imagem)}>
                <Image
                  source={{ uri: item.imagem }}
                  className="w-24 h-24 my-2 rounded-full"
                />
              </TouchableOpacity>
            </View>

          )}
        />

        <TouchableOpacity
          className="bg-white w-11/12 rounded-xl mb-5 p-3 shadow-neu py-4 self-center mt-5"
          onPress={() => navigation.navigate('SubServicoCreate')}>
          <Text className="text-[#082f49] text-center font-extrabold text-xl">+ Cadastrar SubServico</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={false}
        visible={isImageModalVisible}
        onRequestClose={() => {
          setImageModalVisible(false);
        }}

      >
        <View className="flex items-center justify-center h-full bg-[#082f49]">

          <TouchableOpacity
            className="mt-5 "
            onPress={() => setImageModalVisible(false)}
          >
            <AntDesign name="back" size={32} color="white" />
          </TouchableOpacity>
          <Image
            source={{ uri: selectedImage }}
            className="w-96 h-96 mt-10"
          />
        </View>
      </Modal>
    </SafeAreaView>

  );
};
