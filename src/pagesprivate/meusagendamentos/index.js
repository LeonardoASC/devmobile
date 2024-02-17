import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList } from 'react-native';
import api from '../../services/api'
import { AuthContext } from "../../context/AuthContext"
import Ionicons from '@expo/vector-icons/Ionicons';
import LoadingComponent from '../../components/loadingcomponent';
import OpenDrawerButton from '../../components/opendrawer';


export function MeusAgendamentos({ navigation }) {

    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);

    const { userInfo } = useContext(AuthContext);

    useEffect(() => {
        const fetchAgendamentos = async () => {
            try {
                setLoading(true);
                const userId = userInfo.id;
                const response = await api.get(`/meus-agendamentos/${userId}`);
                setAgendamentos(response.data);
            } catch (error) {
                console.error("Erro ao buscar agendamentos:", error);
            } finally {
                setLoading(false);
            }
        };

        // Só busca os agendamentos se tivermos um userInfo definido
        if (userInfo && userInfo.id) {
            fetchAgendamentos();
        }
    }, [userInfo]);

    const renderItem = ({ item: agendamento }) => (
        <View className="bg-white p-5 m-5 rounded-xl shadow-xl">

            <Text className="font-bold text-xl mb-4">{agendamento.nome}</Text>
            <View className="flex-row mb-3 items-center">
                <Ionicons name="ios-calendar" size={24} color="#00B8D9" className="mr-2" />
                <Text className="">Dia: {agendamento.dia}</Text>
            </View>
            <View className="flex-row mb-3 items-center">
                <Ionicons name="ios-time" size={24} color="#00B8D9" className="mr-2" />
                <Text className="">Horário: {agendamento.horario}</Text>
            </View>
            <View className="flex-row mb-3 items-center">
                <Ionicons name="ios-list" size={24} color="#00B8D9" className="mr-2" />
                <Text className="">Tipo de Serviço: {agendamento.tipo_servico}</Text>
            </View>
            <View className="flex-row mb-3 items-center">
                <Ionicons name="ios-information-circle" size={24} color="#00B8D9" className="mr-2" />
                <Text className="">Serviço Específico: {agendamento.servico_especifico}</Text>
            </View>
            <View className="flex-row mb-3 items-center">
                <Ionicons name="ios-checkmark-circle" size={24} color="green" className="mr-2" />
                <Text className="">Status: {agendamento.status}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-[#082f49]">
            <OpenDrawerButton />
            <View className="h-screen items-center justify-center">
                <View className="mt-20 items-center justify-center">
                    <Text className="font-bold text-xl text-white">Meus Agendamentos</Text>
                    {loading ? (
                        <LoadingComponent width={100} height={100} />
                    ) : (
                        <FlatList
                            data={agendamentos}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id.toString()}
                            ListEmptyComponent={
                                <View className="h-screen justify-center items-center">
                                    <View className="bg-white rounded-lg flex p-5 items-center justify-center">
                                        <Text className="text-black text-xl">{userInfo.name},</Text>
                                        <Text className="text-black text-center">todos os seus agendamentos aparecerão aqui.</Text>
                                    </View>
                                    <View className="mt-8 items-center">
                                        <TouchableOpacity
                                            className="bg-white rounded p-3 shadow-md mb-4"
                                            onPress={() => navigation.navigate("FirstDataPrivate")}
                                        >
                                            <Text className="text-cyan-500 font-bold text-center px-14 mt">Primeiro Agendamento</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
                        />
                    )}
                </View>
            </View>
        </SafeAreaView>
    )
}