import { useContext, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../../../context/AuthContext';




export function DashBoard({ navigation }) {
    const { logout } = useContext(AuthContext);
    const data = [
        {
            id: '1',
            nome: 'João',
            dia: 'Segunda-feira',
            horario: '14:00',
            tipo_servico: 'Manutenção',
            servico_especifico: 'Troca de óleo',
        },
        {
            id: '2',
            nome: 'Maria',
            dia: 'Terça-feira',
            horario: '09:30',
            tipo_servico: 'Reparo',
            servico_especifico: 'Substituição de pneu',
        },
        // ... Adicione mais dados conforme necessário
    ];

    const [selectedService, setSelectedService] = useState('Todos');

    const filteredData = selectedService === 'Todos'
        ? data
        : data.filter(item => item.tipo_servico === selectedService);

    return (
        <SafeAreaView className="flex-1">
            <View className="p-5 shadow-md mt-5">
                <View className="flex flex-row justify-start ">
                    <TouchableOpacity
                        className="bg-white rounded p-2 shadow-md mb-4"
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text className="text-cyan-500 font-bold text-sm text-center">Home</Text>
                    </TouchableOpacity>
                   
                </View>
                <Text className="text-2xl font-bold mb-2 text-center text-white">Agendamentos</Text>
                <Text className="mb-2 text-white">Filtre por tipo de serviço:</Text>
                <View className="bg-white rounded-xl">
                    <Picker
                        selectedValue={selectedService}
                        onValueChange={(itemValue) => setSelectedService(itemValue)}
                        style={{ height: 50, width: '100%' }}
                    >
                        <Picker.Item label="Todos" value="Todos" />
                        <Picker.Item label="Manutenção" value="Manutenção" />
                        <Picker.Item label="Reparo" value="Reparo" />
                        <Picker.Item label="Limpeza" value="Limpeza" />
                        <Picker.Item label="Inspeção" value="Inspeção" />
                    </Picker>
                </View>
            </View>

            <View className="flex h-full justify-center items-center p-5">
                <FlatList
                    data={filteredData}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View className="flex flex-row justify-between items-center bg-white m-2 p-4 rounded-xl shadow-lg">
                            <View>
                                <Text className="text-lg font-semibold mb-2 text-cyan-500">Nome: {item.nome}</Text>
                                <Text className="mb-1 text-cyan-500">Dia: {item.dia}</Text>
                                <Text className="mb-1 text-cyan-500">Horário: {item.horario}</Text>
                                <Text className="mb-1 text-cyan-500">Tipo de Serviço: {item.tipo_servico}</Text>
                                <Text className="mb-1 text-cyan-500">Serviço Específico: {item.servico_especifico}</Text>
                            </View>
                            <View className="w-8 h-8 justify-center items-center">
                                <Ionicons name="ios-checkbox" size={24} color="green" />
                            </View>
                        </View>
                    )}
                />
            </View>

        </SafeAreaView>
    )
}

