import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert, Platform, Button, Modal } from 'react-native';
import api from '../../../services/api';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';


export function SubServicoCreate({ navigation }) {
  const dateInitial = new Date();
  dateInitial.setHours(0, 0, 0, 0);
  const [name, setName] = useState('');
  const [preco, setPreco] = useState('');
  const [tempo, setTempo] = useState(dateInitial);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [imagem, setImage] = useState('');
  const [servicoid, setServicoid] = useState('');
  const [services, setServices] = useState([]);


  const handleSubmit = () => {
    const formattedTime = `${tempo.getHours()}:${tempo.getMinutes()}:00`;
    api.post('/subservico', {
      name: name,
      preco: preco,
      tempo_de_duracao: formattedTime,
      imagem: imagem,
      servico_id: servicoid

    })
      .then(response => {
        console.log(response.data);
        if (response.data && response.data.success) {
          Alert.alert('Sucesso', 'Sub-Servico foi cadastrado!');
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
    // Buscar a lista de serviços ao montar o componente
    api.get('/servico')
      .then(response => {
        if (response.data) {
          setServices(response.data);
          // console.log(response.data);
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

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full">
        <Text className="text-cyan-600 text-xl font-bold text-center">
          Cadastro de Sub-Serviço
        </Text>
      </View>

      <View className="flex-1 p-5 mt-2">
        <Text className="text-white text-3xl font-extrabold self-center">Registrar Sub-Serviço...</Text>
        <Text className="text-white text-center mt-4">Preencha os campos abaixo.</Text>

        <View className="mt-5 w-full">
          <View className="flex-row items-center bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
            <TextInput
              type="text"
              placeholder="Nome do Sub-Serviço"
              value={name}
              onChangeText={setName}
              className="flex-1 ml-2 text-white"
            />
          </View>

          <View className="flex-row items-center bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
            <TextInput
              type="text"
              placeholder="Preço"
              value={preco}
              onChangeText={setPreco}
              className="flex-1 ml-2 text-white"
            />
          </View>

          <View className="bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
            <TouchableOpacity onPress={() => setShowTimePicker(true)} style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text className="text-white ml-2">Selecionar Tempo:</Text>
              <TextInput
                value={formatTime(tempo)}
                editable={false}
                className="flex-1 ml-2 text-white"
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

          <View className="flex-row items-center bg-[#06b6d4] p-2 rounded mb-4 border-b border-zinc-300">
            <TextInput
              type="text"
              placeholder="Imagem"
              value={imagem}
              onChangeText={setImage}
              className="flex-1 ml-2 text-white"
            />
          </View>

          <Picker
            selectedValue={servicoid}
            onValueChange={(itemValue) => setServicoid(itemValue)}
            style={{ backgroundColor: "#06b6d4", color: "white" }}
          >
            <Picker.Item enabled label="Escolha um tipo de serviço" />
            {services.map((service) => (
              <Picker.Item className="text-white" key={service.id} label={service.name} value={service.id} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity
          className="bg-white w-11/12 rounded-xl p-3 shadow-md py-4 self-center mt-5"
          onPress={handleSubmit}
        >
          <Text className="text-cyan-500 text-center font-bold text-lg">Salvar Servico</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>


  );
}
