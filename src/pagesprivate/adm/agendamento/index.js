import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import api from '../../../services/api';



export function Agendamento({ navigation }) {
    const [agendamentos, setAgendamentos] = useState([]);
    const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);
    const [filterType, setFilterType] = useState('hoje');

    useEffect(() => {
        fetchAgendamentos();
    }, []);

    useEffect(() => {
        filterAgendamentos();
    }, [agendamentos, filterType]);

    const fetchAgendamentos = async () => {
        try {
            const response = await api.get('/agendamento');
            if (response.data && response.data.length) {
                setAgendamentos(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        }
    };

    const filterAgendamentos = () => {
        let filtered = agendamentos;

        switch (filterType) {
            case 'hoje':
                filtered = filtered.filter(item => isToday(item.dia));
                break;
            case 'semana':
                filtered = filtered.filter(item => isThisWeek(item.dia));
                break;
            case 'mes':
                filtered = filtered.filter(item => isThisMonth(item.dia));
                break;
            default:
                break;
        }

        setFilteredAgendamentos(filtered);
    };


    // Funções auxiliares para filtragem
    const isToday = (date) => {
        const today = new Date();
        const d = new Date(date);
        return d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();
    }

    const isThisWeek = (date) => {
        const today = new Date();
        const d = new Date(date);
        const day = d.getDay() || 7;
        if (day !== 7)
            d.setHours(-24 * (day - 1));
        const startOfWeek = new Date(d.toLocaleDateString());
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (7 - today.getDay()));

        return d >= startOfWeek && d <= endOfWeek;
    }

    const isThisMonth = (date) => {
        const today = new Date();
        const d = new Date(date);
        return d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear();
    }

    const updateAgendamentoStatus = async (id) => {
        try {
            const response = await api.put(`/agendamento/${id}`, {
                status: "Concluído"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                fetchAgendamentos(); // Atualizar a lista após alterar o status
            }
        } catch (error) {
            console.error("Erro ao atualizar o status do agendamento:", error);
            console.error("Erro ao atualizar o status do agendamento:", error.response ? error.response.data : error.message);
        }
    };

    const disupidate = async (id) => {
        try {
            const response = await api.put(`/agendamento/${id}`, {
                status: "Cancelado"
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                fetchAgendamentos(); // Atualizar a lista após alterar o status
            }
        } catch (error) {
            console.error("Erro ao atualizar o status do agendamento:", error);
            console.error("Erro ao atualizar o status do agendamento:", error.response ? error.response.data : error.message);
        }
    }

    return (
        <SafeAreaView className="flex-1 bg-[#082f49]">
            <View className="p-4 shadow-offset-[0,5] mt-4">
                <View className="flex-row justify-start">
                    <TouchableOpacity
                        className="bg-white rounded-lg p-3 shadow-offset-[0,5] mb-3"
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text className="text-center text-#00B8D9 font-bold text-base">Home</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-center text-white font-bold text-xl mb-3">Agendamentos</Text>
                <Picker
                    selectedValue={filterType}
                    onValueChange={(value) => setFilterType(value)}
                    style={{ color: 'white' }}
                >
                    <Picker.Item label="Hoje" value="hoje" />
                    <Picker.Item label="Esta Semana" value="semana" />
                    <Picker.Item label="Este Mês" value="mes" />
                    <Picker.Item label="Todos" value="todos" />
                </Picker>
            </View>

            <View className="flex-1 justify-center items-center p-4">
                <FlatList
                    data={filteredAgendamentos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View className="flex-justify-between items-center bg-white m-1 p-4 rounded-lg shadow-offset-[0,5]">
                            <View>
                                <Text className="text-#00B8D9 font-bold text-lg mb-2">Nome: {item.nome}</Text>
                                <Text className="text-#00B8D9 mb-1">Dia: {item.dia}</Text>
                                <Text className="text-#00B8D9 mb-1">Horário: {item.horario}</Text>
                                <Text className="text-#00B8D9 mb-1">Tipo de Serviço: {item.tipo_servico}</Text>
                                <Text className="text-#00B8D9 mb-1">Serviço Específico: {item.servico_especifico}</Text>
                                <Text className="text-#00B8D9 mb-1">Status: {item.status}</Text>
                            </View>
                            <View className="justify-center items-center flex-row">
                                {item.status === "Concluído" ? (
                                    <Text className="text-green-500">Concluído</Text>
                                ) : item.status === "Cancelado" ? (
                                    <Text className="text-red-500">Cancelado</Text>
                                ) : (
                                    <>
                                        <TouchableOpacity
                                            onPress={() => updateAgendamentoStatus(item.id)}
                                            style={{ marginRight: 10 }}  // Dando espaço entre os botões
                                        >
                                            <Text className="bg-green-500 text-white px-2 py-1 rounded">Concluir</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => disupidate(item.id)}
                                        >
                                            <Text className="bg-red-500 text-white px-2 py-1 rounded">Cancelar</Text>
                                        </TouchableOpacity>
                                    </>
                                )}
                            </View>

                        </View>
                    )}
                />
            </View>
        </SafeAreaView>

    )
}