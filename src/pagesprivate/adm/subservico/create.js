import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../../services/api';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';


export function SubServicoCreate({ navigation }) {
  const [name, setName] = useState('');
  const [preco, setPreco] = useState('');
  const [tempo, setTempo] = useState('');
  const [imagem, setImage] = useState('');
  const [servicoid, setServicoid] = useState('');
  const [services, setServices] = useState([]);

  const handleSubmit = () => {
    api.post('/subservico', {
      name: name,
      preco: preco,
      tempo_de_duracao: tempo,
      imagem: imagem,
      servico_id: servicoid

    })
      .then(response => {
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
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar serviços:', error);
        Alert.alert('Erro', 'Não foi possível carregar os serviços. Tente novamente.');
      });
  }, []);


  return (
    <SafeAreaView className="flex-1 ">
      <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full ">
        <Text className="text-cyan-600 text-xl font-bold text-center">
          Cadastro de Sub-Serviço
        </Text>
      </View>


      <ScrollView className="flex-1">
        <View className="mt-4 p-3">
          <TextInput
            type="text"
            placeholder="Nome do Sub-Serviço"
            value={name}
            onChangeText={setName}
            className="border-cyan-600 border p-4 rounded bg-white"
          />
        </View>
        <View className=" p-3">
          <TextInput
            type="text"
            placeholder="Preço"
            value={preco}
            onChangeText={setPreco}
            className="border-cyan-600 border p-4 rounded bg-white"
          />
        </View>
        <View className=" p-3">
          <TextInput
            type="text"
            placeholder="Estimativa de tempo"
            value={tempo}
            onChangeText={setTempo}
            className="border-cyan-600 border p-4 rounded bg-white"
          />
        </View>
        <View className=" p-3">
          <TextInput
            type="text"
            placeholder="Imagem"
            value={imagem}
            onChangeText={setImage}
            className="border-cyan-600 border p-4 rounded bg-white"
          />
        </View>
        <View className=" p-3">
        <Picker
            selectedValue={servicoid}
            onValueChange={(itemValue) => setServicoid(itemValue)}
            className="border-cyan-600 p-4 rounded border bg-white text-white"
            style={{ backgroundColor: "white" }}
          >
            <Picker.Item enabled label="Escolha um tipo de serviço" />
            {services.map((service) => (
              <Picker.Item className="text-white" key={service.id} label={service.name} value={service.id} />
            ))}
          </Picker>
        </View>
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-white p-4 rounded mt-2 self-center "
        >
          <Text className="text-cyan-500 text-center font-bold text-lg">
            Salvar Servico
          </Text>
        </TouchableOpacity>
      </ScrollView>

    </SafeAreaView>
  );
}
