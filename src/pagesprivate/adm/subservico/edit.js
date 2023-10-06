import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import api from '../../../services/api';

export function SubServicoEdit({ route, navigation }) {
  const [name, setName] = useState('');
  const [preco, setPreco] = useState('');
  const [tempo, setTempo] = useState('');
  const [imagem, setImage] = useState('');
  const [servicoid, setServicoid] = useState('');
  const { id } = route.params;

  const handleSubmit = () => {
    if (!id) {
      alert('ID não definido!');
      return;
    }
    api.put(`/subservico/${id}`, {
      name: name,
      preco: preco,
      tempo_de_duracao: tempo,
      imagem: imagem,
      servico_id: servicoid
    })
      .then(response => {
        console.log(response);
        if (response.status === 200 && response.data.success) {
          Alert.alert('Sucesso',"SubServiço foi Atualizado!");
          navigation.navigate('Home');
        } else {
          // Isto pode ser melhorado para lidar com outros erros não relacionados à validação
          alert('Erro ao registrar! ' + (response.data.msg || ''));
        }
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          let errorMessage = 'Erros de validação:\n';
          for (let field in error.response.data.errors) {
            errorMessage += error.response.data.errors[field].join('\n');
          }
          alert(errorMessage);
        } else {
          console.error("Erro na requisição:", error);
          alert('Ocorreu um erro. Tente novamente mais tarde.');
        }
      });

    // console.log('Horário salvo:', time, id);
  };


  return (
    <SafeAreaView className="flex-1">

      <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full">
        <Text className="text-cyan-600 text-xl font-bold text-center">
          Edição de Serviço
        </Text>
      </View>

      <View className="mt-4 p-3">
        <TextInput
          placeholder="Insira o servico (ex: Corte Masculino)"
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
          <TextInput
            type="text"
            placeholder="Colocar aqui uma lista para escolha"
            value={servicoid}
            onChangeText={setServicoid}
            className="border-cyan-600 border p-4 rounded bg-white"
          />
        </View>
      <TouchableOpacity
        onPress={handleSubmit}
        className="bg-cyan-500 p-4 rounded mt-2 self-center"
      >
        <Text className="bg-white text-center font-bold text-lg text-cyan-500 p-4 rounded-lg">
          Salvar serviço
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}
