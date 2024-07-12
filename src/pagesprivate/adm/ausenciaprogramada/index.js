import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, Alert } from 'react-native';
import OpenDrawerButton from '../../../components/opendrawer';
import api from '../../../services/api';
import { MaterialIcons } from '@expo/vector-icons';
import CalendarPersonalizado from './calendarPersonalizado';

export function AusenciaProgramada({ navigation }) {
    const [dayOff, setDayOff] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        fetchTimes();
    }, []);

    const fetchTimes = async () => {
        try {
            const response = await api.get('/horario-personalizado');
            if (response.data && response.data.length) {
                setDayOff(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar dias de ausencia programada:", error);
        }
    };

    const deleteServico = async (id) => {
        try {
            const response = await api.delete(`/horario-personalizado/${id}`);
            if (response.status === 200) {
                Alert.alert('Sucesso!', 'Horário deletado com sucesso.');
                fetchTimes();
            } else {
                Alert.alert('Erro!', 'Erro ao deletar horário.');
            }
        } catch (error) {
            console.error("Erro ao deletar horário:", error);
            Alert.alert('Erro!', 'Erro ao deletar horário.');
        }
    };

    const confirmDelete = (id) => {
        Alert.alert(
            'Confirmação',
            'Tem certeza que deseja excluir este registro?',
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => deleteServico(id) }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View className="flex-row bg-white justify-between my-2 rounded-md p-2">
            <View>
                <Text className="text-black font-medium">Data Inicial: {item.data_inicial}</Text>
                <Text className="text-black font-medium">Data Final: {item.data_final}</Text>
                <Text className="text-black font-medium">Horario Inicial: {item.hora_inicial}</Text>
                <Text className="text-black font-medium">Horario Final: {item.hora_final}</Text>
            </View>
            <View className="flex-row items-center">
                <TouchableOpacity
                    className="p-2 rounded-lg mr-2 shadow-neu-inset"
                    onPress={() => navigation.navigate('AusenciaProgramadaEdit', { item: item })}
                >
                    <MaterialIcons name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    className="p-2 rounded-lg shadow-neu-inset"
                    onPress={() => confirmDelete(item.id)}
                >
                    <MaterialIcons name="delete" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );

    const handleDaySelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <SafeAreaView className="flex-1 bg-[#082f49]">
            <View className="h-1/5 w-full justify-center items-center">
                <View className="w-full flex-row items-center justify-center mb-5">
                    <OpenDrawerButton />
                    <View className="flex-1 items-center">
                        <Text className="text-white font-bold text-xl">Ausencia Programada</Text>
                    </View>
                </View>
            </View>

            <View className="p-5 h-4/5 w-full">
                <CalendarPersonalizado dayOff={dayOff} onDaySelect={handleDaySelect} />

                <TouchableOpacity className="bg-white p-2 rounded-md mt-4" onPress={() => navigation.navigate('AusenciaProgramadaCreate')}>
                    <Text className="text-black text-center">Adicionar Ausencia Programada</Text>
                </TouchableOpacity>

                <Text className="text-center font-bold text-white mt-4">Dias Registrados</Text>

                <FlatList
                    data={dayOff}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                />
            </View>
        </SafeAreaView>
    );
}
