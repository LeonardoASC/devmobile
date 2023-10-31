import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import api from '../../../services/api';
import LoadingComponent from '../../../components/loadingcomponent';



export function Agendamento({ navigation }) {
    const [agendamentos, setAgendamentos] = useState([]);
    const [filterDate, setFilterDate] = useState(new Date());
    const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAgendamentos();
    }, []);

    useEffect(() => {
        filterAgendamentos();
    }, [agendamentos, filterDate]);

    const fetchAgendamentos = async () => {
        try {
            setLoading(true);
            const response = await api.get('/agendamento');
            // console.log('API Response:', response.data);
            if (response.data && response.data.length) {
                setAgendamentos(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        } finally {
            setLoading(false); // Exemplo de código para executar no finally
        }
    };

    const filterAgendamentos = () => {
        const filtered = agendamentos.filter(item => {
            const d = new Date(item.dia);
            return d.getUTCDate() === filterDate.getUTCDate() &&
                d.getUTCMonth() === filterDate.getUTCMonth() &&
                d.getUTCFullYear() === filterDate.getUTCFullYear();
        });

        setFilteredAgendamentos(filtered);
    };

    const isToday = (someDate) => {
        const today = new Date();
        return someDate.getUTCDate() === today.getUTCDate() &&
            someDate.getUTCMonth() === today.getUTCMonth() &&
            someDate.getUTCFullYear() === today.getUTCFullYear();
    };

    const generateDateList = () => {
        const dates = [];
        const today = new Date();
        for (let i = 0; i < 25; i++) {
            const newDate = new Date(today);
            newDate.setDate(today.getDate() + i);
            dates.push(newDate);
        }
        return dates;
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`;
    };

    const updateAgendamentoStatus = (id) => {
        Alert.alert(
            "Confirmação",
            "Cliente Atendido?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim",
                    onPress: async () => {
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
                    }
                }
            ]
        );
    };

    const disupidate = (id) => {
        Alert.alert(
            "Confirmação",
            "Tem certeza de que deseja desmarcar?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Sim",
                    onPress: async () => {
                        try {
                            const response = await api.delete(`/agendamento/${id}`);
                            if (response.status === 200) {
                                fetchAgendamentos(); // Atualizar a lista após alterar o status
                                filterAgendamentos();
                            }
                            fetchAgendamentos(); // Atualizar a lista após alterar o status
                        } catch (error) {
                            console.error("Erro ao atualizar o status do agendamento:", error);
                            console.error("Erro ao atualizar o status do agendamento:", error.response ? error.response.data : error.message);
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-[#082f49]">
            <View className="shadow-offset-[0,5] mt-4">
                <View className="flex-row justify-start mt-10 ml-4">
                    <TouchableOpacity
                        className="bg-white rounded-lg p-3 shadow-offset-[0,5] mb-3"
                        onPress={() => navigation.navigate("Home")}
                    >
                        <Text className="text-center text-#00B8D9 font-bold text-base">Home</Text>
                    </TouchableOpacity>
                </View>

                <Text className="text-center text-white font-bold text-xl mb-3">Agendamentos</Text>
                <View className="px-2 py-2 bg-white">
                <FlatList
                className="bg-white"
                    horizontal
                    data={generateDateList()}
                    keyExtractor={(item) => item.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => {
                                setFilterDate(item);
                                setSelectedDate(item);  // Atualizando o item selecionado
                            }}
                            className={`m-1 p-2 ${selectedDate && formatDate(selectedDate) === formatDate(item) ? 'border-b' : ''}`}
                        >
                            <Text className="text-sm font-medium">
                                {isToday(item) ? "Hoje" : `${item.getDate()}/${item.getMonth() + 1}`}
                            </Text>
                        </TouchableOpacity>
                    )}
                />


            </View>
            </View>

            <View className="flex-1 justify-center items-center p-4">
                {loading ? <LoadingComponent width={100} height={100} /> :
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
                                                <Text className="bg-green-500 text-white px-2 py-1 rounded">Atendido</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => disupidate(item.id)}
                                            >
                                                <Text className="bg-red-500 text-white px-2 py-1 rounded">Desmarcar</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                </View>

                            </View>
                        )}
                    />
                }
            </View>
        </SafeAreaView>

    )
}