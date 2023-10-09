import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import api from '../../../services/api';

export function DashBoard({ navigation }) {
    const [agendamentos, setAgendamentos] = useState([]);
    const [filteredAgendamentos, setFilteredAgendamentos] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedService, setSelectedService] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');


    useEffect(() => {
        fetchAgendamentos();
    }, []);

    useEffect(() => {
        const today = new Date().toLocaleDateString(); // Altere o formato conforme sua necessidade
        setSelectedDate(today);
    }, []);

    useEffect(() => {
        filterAgendamentos();
    }, [agendamentos, selectedDate, selectedService, selectedStatus]);

    const fetchAgendamentos = async () => {
        try {
            const response = await api.get('/agendamento');
            if (response.data && response.data.length) {
                setAgendamentos(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar horários:", error);
        }
    };

    const filterAgendamentos = () => {
        let filtered = agendamentos;
        if (selectedDate) {
            filtered = filtered.filter(item => item.dia === selectedDate);
        }
        if (selectedService) {
            filtered = filtered.filter(item => item.tipo_servico === selectedService);
        }
        if (selectedStatus) {
            filtered = filtered.filter(item => item.status === selectedStatus);
        }
        setFilteredAgendamentos(filtered);
    };

    const getUniqueValues = (key) => {
        const uniqueValues = [...new Set(agendamentos.map(item => item[key]))];
        return uniqueValues;
    }

    return (
        <SafeAreaView className="flex-1">
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
                    selectedValue={selectedDate}
                    onValueChange={(value) => setSelectedDate(value)}
                   
                >
                    <Picker.Item label="Hoje" value={selectedDate} />
                    {getUniqueValues('dia').map(date => (
                        <Picker.Item key={date} label={date} value={date} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedService}
                    onValueChange={(value) => setSelectedService(value)}
                >
                    <Picker.Item label="Selecione um serviço" value="" />
                    {getUniqueValues('tipo_servico').map(service => (
                        <Picker.Item key={service} label={service} value={service} />
                    ))}
                </Picker>

                <Picker
                    selectedValue={selectedStatus}
                    onValueChange={(value) => setSelectedStatus(value)}
                >
                    <Picker.Item label="Selecione um status" value="" />
                    {getUniqueValues('status').map(status => (
                        <Picker.Item key={status} label={status} value={status} />
                    ))}
                </Picker>
                </View>
        

            <View className="flex-1 justify-center items-center p-4">
                <FlatList
                    data={filteredAgendamentos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View className="flex-row justify-between items-center bg-white m-1 p-4 rounded-lg shadow-offset-[0,5]">
                            <View>
                                <Text className="text-#00B8D9 font-bold text-lg mb-2">Nome: {item.nome}</Text>
                                <Text className="text-#00B8D9 mb-1">Dia: {item.dia}</Text>
                                <Text className="text-#00B8D9 mb-1">Horário: {item.horario}</Text>
                                <Text className="text-#00B8D9 mb-1">Tipo de Serviço: {item.tipo_servico}</Text>
                                <Text className="text-#00B8D9 mb-1">Serviço Específico: {item.servico_especifico}</Text>
                                <Text className="text-#00B8D9 mb-1">Status: {item.status}</Text>
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