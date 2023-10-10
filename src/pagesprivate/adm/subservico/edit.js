import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  Platform,
  Image,
} from 'react-native';
import api from '../../../services/api';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

export function SubServicoEdit({ route, navigation }) {
  const dateInitial = new Date();
  dateInitial.setHours(0, 0, 0, 0);
  const [name, setName] = useState('');
  const [preco, setPreco] = useState('');
  const [tempo, setTempo] = useState(dateInitial);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [imagem, setImage] = useState('');
  const [servicoid, setServicoid] = useState('');
  const [services, setServices] = useState([]);
  const { id } = route.params;


  const handleSubmit = () => {
    if (!id) {
      Alert.alert('Erro', 'ID não definido!');
      return;
    }
    const formattedTime = `${tempo.getHours()}:${tempo.getMinutes()}:00`;
    api.put(`/subservico/${id}`, {
      name: name,
      preco: preco,
      tempo_de_duracao: formattedTime,
      imagem: imagem,
      servico_id: servicoid
    })
      .then(response => {
        if (response.data && response.data.success) {
          Alert.alert('Sucesso', 'SubServiço foi atualizado!');
          navigation.navigate('Home');
        } else {
          Alert.alert('Erro ao registrar', response.data.message || 'Erro desconhecido.');
        }
      })
      .catch(error => {
        if (!error.response) {
          console.error('Erro na conexão:', error);
          Alert.alert('Erro', 'Problema de conexão. Verifique sua internet e tente novamente.');
        } else {
          if (error.response.status === 422) {
            let errorMessage = 'Ocorreram erros de validação:\n';
            for (let field in error.response.data.errors) {
              errorMessage += error.response.data.errors[field].join('\n') + '\n';
            }
            Alert.alert('Erro de Validação', errorMessage);
          } else {
            console.error('Erro na requisição:', error.response);
            Alert.alert('Erro', 'Ocorreu um erro. Tente novamente mais tarde.');
          }
        }
      });
  };

  useEffect(() => {
    api.get('/servico')
      .then(response => {
        if (response.data) {
          setServices(response.data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar serviços:', error);
        Alert.alert('Erro', 'Não foi possível carregar os serviços. Tente novamente.');
      });
  }, []);

  const onChangeTime = (event, selectedDate) => {
    const currentDate = selectedDate || tempo;
    setShowTimePicker(Platform.OS === 'ios');
    setTempo(currentDate);
  };

  const formatTime = (date) => {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-cyan-100">
      {/* Cabeçalho */}
      <View className="bg-cyan-100 flex h-1/5 justify-center items-center rounded-bl-xl shadow-neu-inset">
        <Text className="text-cyan-700 text-2xl font-extrabold text-center">
          Edição de Sub-Serviço
        </Text>
      </View>

      <ScrollView className="flex-1 px-5 mt-2">
        <Text className="text-cyan-700 text-3xl font-extrabold self-center">Editar Sub-Serviço...</Text>
        <Text className="text-cyan-600 text-center mt-4">Altere os campos conforme necessário.</Text>

        <View className="mt-5 w-full">
          {/* Nome do Sub-Serviço */}
          <View className="flex-row items-center p-2 rounded mb-4 shadow-neu-inset bg-white">
            <FontAwesome name="user" size={24} color="black" />
            <TextInput
              type="text"
              placeholder="Nome do Sub-Serviço"
              value={name}
              onChangeText={setName}
              className="flex-1 ml-2 text-black"
            />
          </View>

          {/* Preço */}
          <View className="flex-row items-center p-2 rounded mb-4 shadow-neu-inset bg-white">
            <FontAwesome name="dollar" size={24} color="black" />
            <TextInput
              type="text"
              placeholder="Preço"
              value={preco}
              onChangeText={setPreco}
              className="flex-1 ml-2 text-black"
            />
          </View>

          {/* Imagem */}
          <View className="flex-row items-center p-2 rounded shadow-neu-inset bg-white">
            <MaterialIcons name="image" size={24} color="black" />
            <TextInput
              type="text"
              placeholder="Imagem"
              value={imagem}
              onChangeText={setImage}
              className="flex-1 ml-2 text-black"
              editable={false}
            />
            <View className="items-center justify-center">
              {!imagem ? (
                <TouchableOpacity
                  className="m-2 bg-cyan-100 rounded-xl p-2 shadow-neu"
                  onPress={pickImage}
                >
                  <MaterialIcons name="add-a-photo" size={24} color="black" />
                </TouchableOpacity>
              ) : (
                <View className="flex flex-row items-center justify-center">
                  <Image source={{ uri: imagem }} className="w-12 h-12 rounded-full" />
                  <Feather name="x" size={24} color="red" onPress={() => setImage('')} />
                </View>
              )}
            </View>
          </View>

          {/* Picker */}
          <Picker
            selectedValue={servicoid}
            onValueChange={(itemValue) => setServicoid(itemValue)}
            style={{ color: "black", backgroundColor: "white", marginTop: 10, marginBottom: 10, borderRadius: 8 }}
          >
            <Picker.Item enabled label="Escolha um tipo de serviço" />
            {services.map((service) => (
              <Picker.Item className="text-black" key={service.id} label={service.name} value={service.id} />
            ))}
          </Picker>

          {/* Tempo */}
          <View className="p-2 rounded mb-4 shadow-neu-inset bg-white">
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="timer" size={24} color="black" />
              <TextInput
                value={formatTime(tempo)}
                editable={false}
                className="flex-1 ml-2 text-black"
              />
            </TouchableOpacity>
          </View>

          {showTimePicker && (
            <DateTimePicker
              value={tempo}
              mode="time"
              is24Hour={true}
              display="spinner"
              onChange={onChangeTime}
            />
          )}
        </View>
      </ScrollView>

      {/* Botão */}
      <View className="absolute bottom-0 w-full pb-5 px-5">
        <TouchableOpacity
          className="bg-cyan-100 w-11/12 mb-5 rounded-xl p-3 shadow-neu py-4 self-center mt-5"
          onPress={handleSubmit}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name="update" size={24} color="#0e7490" />
            <Text className="text-cyan-700 text-center font-extrabold text-lg ml-2">
              Atualizar Servico
            </Text>
          </View>
        </TouchableOpacity>
      </View>

    </SafeAreaView>


  );
}
