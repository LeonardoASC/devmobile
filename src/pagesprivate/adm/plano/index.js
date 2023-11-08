import { View, Text, TouchableOpacity, SafeAreaView, FlatList } from 'react-native'
import { Ionicons, Feather } from '@expo/vector-icons';
import api from '../../../services/api';
import { useEffect, useState } from 'react';


export function Plano() {
    const [plano, setPlano] = useState([]);
    const disupidate = () => {
        alert('texto')
    }

    useEffect(() => {
        // Chamar a API quando o componente for montado
        fetchPlano();
    }, []);

    const fetchPlano = async () => {
        try {
            const response = await api.get('/plano');
            if (response.data && response.data.length) {
                setPlano(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar horários:", error);
        }
    };

    return (
        <SafeAreaView className="flex-1 items-center bg-[#082f49]">

            <View className="flex bg-white h-1/4 w-full  items-center justify-center rounded-b-3xl">
                <Text className="text-[#082f49] text-xl font-extrabold">Cadastre planos</Text>
                <Text className="text-[#082f49] p-2 text-center">Os planos cadastrados aqui apareceram para os usuarios</Text>
                <TouchableOpacity
                    onPress={() => disupidate()}
                >
                    <Text className="bg-green-500 text-white px-2 py-1 rounded mt-4 text-center">Cadastrar plano</Text>
                </TouchableOpacity>
            </View>
            

            <View className="flex h-44 w-full items-center justify-center">
                <FlatList
                    className="bg-slate-300 py-5 px-10 rounded-3xl w-[80%]  mt-10"
                    data={plano}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View className="">
                            <View className="flex flex-row justify-between">
                                <Text>{item.nome}</Text>
                                <View className="left-4">
                                    <Feather name="circle" size={18} color="black" />
                                </View>
                            </View>
                            <View className="flex flex-row items-center">
                                <Text className="text-[#082f49] text-center font-extrabold text-3xl">R${item.preco}/</Text>
                                <Text className="text-[#082f49] font-extrabold">mensal</Text>
                            </View>

                            <View className="flex flex-row items-center gap-2">
                                <Ionicons name="checkmark-circle-outline" size={18} color="#082f49" />
                                <Text className="text-[#082f49]">Inclui {item.quantidade} cortes</Text>
                            </View>

                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

