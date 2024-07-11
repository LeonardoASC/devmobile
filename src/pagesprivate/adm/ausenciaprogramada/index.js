import { View, Text, SafeAreaView, TouchableOpacity, Modal, TextInput, Button, Alert } from 'react-native';
import OpenDrawerButton from '../../../components/opendrawer';
import api from '../../../services/api';
import { FlatList } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import {MaterialIcons} from '@expo/vector-icons';

export function AusenciaProgramada() {
    const [dayOff, setDayOff] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [attendanceInfo, setAttendanceInfo] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [modalUpdateVisible, setModalUpdateVisible] = useState(false);
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [initialHour, setInitialHour] = useState('');
    const [finalHour, setFinalHour] = useState('');

    useEffect(() => {
        fetchTimes();
    }, []);

    const fetchTimes = async () => {
        try {
            const response = await api.get('/horario-personalizado');
            if (response.data && response.data.length) {
                console.log(response.data);
                setDayOff(response.data);
            }
        } catch (error) {
            console.error("Erro ao buscar dias de ausencia programada:", error);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View className="flex-row justify-between my-2">
                <View className="">
                    <Text className="text-white">{item.id}</Text>
                    <Text className="text-white">Data Inicial: {item.data_inicial}</Text>
                    <Text className="text-white">Data Final: {item.data_final}</Text>
                    <Text className="text-white">Horario Inicial: {item.hora_inicial}</Text>
                    <Text className="text-white">Horario Final: {item.hora_final}</Text>
                </View>
                <View className="flex-row items-center">
                    <TouchableOpacity
                        className=" p-2 rounded-lg mr-2 shadow-neu-inset"
                        onPress={() => setModalUpdateVisible(true)}
                    >
                        <MaterialIcons name="edit" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        className=" p-2 rounded-lg shadow-neu-inset"
                        onPress={() => confirmDelete(item.id)}
                    >
                        <MaterialIcons name="delete" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        const dayData = dayOff.find(
            item => item.data_inicial <= day.dateString && item.data_final >= day.dateString
        );
        if (dayData) {
            setAttendanceInfo({
                entry: dayData.hora_inicial,
                exit: dayData.hora_final
            });
        } else {
            setAttendanceInfo({});
        }
    };

    const markedDates = dayOff.reduce((acc, item) => {
        const startDate = new Date(item.data_inicial);
        const endDate = new Date(item.data_final);

        for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
            const dateStr = d.toISOString().split('T')[0];
            if (d.getTime() === startDate.getTime()) {
                acc[dateStr] = { startingDay: true, color: 'green' };
            } else if (d.getTime() === endDate.getTime()) {
                acc[dateStr] = { endingDay: true, color: 'green', textColor: 'gray' };
            } else {
                acc[dateStr] = { color: 'green' };
            }
        }
        return acc;
    }, {});

    if (selectedDate && !markedDates[selectedDate]) {
        markedDates[selectedDate] = {
            selected: true,
            disableTouchEvent: true,
            selectedColor: '#e91e63',
            selectedTextColor: '#fff'
        };
    }

    const handleAddAbsence = async () => {
        try {
            const postData = {
                data_inicial: initialDate,
                data_final: finalDate,
                hora_inicial: initialHour,
                hora_final: finalHour
            };
            const response = await api.post('/horario-personalizado', postData);
            if (response.status === 200 || response.status === 201) {
                Alert.alert('Sucesso!', 'Ausência programada adicionada com sucesso.');
                fetchTimes(); // Atualizar a lista após adicionar um novo horário
                setModalVisible(false);
                resetModalInputs();
            } else {
                Alert.alert('Erro!', 'Não foi possível adicionar a ausência programada.');
            }
        } catch (error) {
            console.error("Erro ao adicionar ausência programada:", error);
            Alert.alert('Erro!', 'Erro ao adicionar ausência programada.');
        }
    };
    
    const resetModalInputs = () => {
        setInitialDate('');
        setFinalDate('');
        setInitialHour('');
        setFinalHour('');
    };
    
    const deleteServico = async (id) => {
        try {
          const response = await api.delete(`/horario-personalizado/${id}`);
          if (response.status === 200) {
            Alert.alert('Sucesso!', 'Horário deletado com sucesso.');
            fetchTimes(); // Atualizar a lista após deletar o horário
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
            {
              text: 'Cancelar',
              style: 'cancel'
            },
            {
              text: 'Confirmar',
              onPress: () => deleteServico(id)
            }
          ]
        );
    };

    const handleUpdateAbsence = async (id) => {
        try {
            const updatedAbsence = {
                data_inicial: initialDate,
                data_final: finalDate,
                hora_inicial: initialHour,
                hora_final: finalHour
            };
    
            const response = await api.put(`/horario-personalizado/${id}`, updatedAbsence);
            if (response.status === 200) {
                Alert.alert('Sucesso!', 'Ausência atualizada com sucesso.');
                setModalUpdateVisible(false);
                fetchTimes(); // Atualizar a lista após a atualização da ausência
            } else {
                Alert.alert('Erro!', 'Falha ao atualizar ausência.');
            }
        } catch (error) {
            console.error("Erro ao atualizar ausência:", error);
            Alert.alert('Erro!', 'Erro ao atualizar ausência.');
        }
    };
    

    return (
        <SafeAreaView className="flex-1 bg-[#082f49]">
            <View className="h-1/5 w-full  justify-center items-center">
                <View className="w-full flex-row items-center justify-center mb-5">
                    <OpenDrawerButton />
                    <View className="flex-1 items-center">
                        <Text className="text-white font-bold text-xl">Ausencia Programada</Text>
                    </View>
                </View>
            </View>

            <View className="p-5 h-4/5 w-full">
                <Calendar
                    current={new Date().toISOString().split('T')[0]}
                    onDayPress={onDayPress}
                    markedDates={markedDates}
                    markingType={'period'}
                    theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        textSectionTitleDisabledColor: '#d9e1e8',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        disabledArrowColor: '#d9e1e8',
                        monthTextColor: 'blue',
                        indicatorColor: 'blue',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />

                <TouchableOpacity className="bg-blue-500 p-2 rounded-md mt-4" onPress={() => setModalVisible(true)}>
                    <Text className="text-white text-center">Adicionar Ausencia Programada</Text>
                </TouchableOpacity>

                <Text className="text-center font-bold text-white mt-4">Dias Registrados</Text>

                <FlatList
                    data={dayOff}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        resetModalInputs();
                    }}>
                    <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
                        <View className="bg-white p-5 rounded-lg w-4/5">
                            <Text className="text-xl font-bold mb-4">Adicionar Ausencia Programada</Text>
                            <TextInput
                                className="border p-2"
                                placeholder="Data Inicial"
                                value={initialDate}
                                onChangeText={setInitialDate}
                            />
                            <Text className="text-sm mb-4">Ex: '24/06/2024'</Text>
                            <TextInput
                                className="border p-2"
                                placeholder="Data Final"
                                value={finalDate}
                                onChangeText={setFinalDate}
                            />
                            <Text className="text-sm mb-4">Ex: '26/06/2024 (valor maior que a data inicial)'</Text>
                            <TextInput
                                className="border p-2"
                                placeholder="Hora Inicial"
                                value={initialHour}
                                onChangeText={setInitialHour}
                            />
                            <Text className="text-sm mb-4">Ex: '08:00'</Text>
                            <TextInput
                                className="border p-2"
                                placeholder="Hora Final"
                                value={finalHour}
                                onChangeText={setFinalHour}
                            />
                            <Text className="text-sm mb-4">Ex: '09:00 (valor maior que o horario inicial)'</Text>
                            <View className="flex-row justify-between">
                                <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                                <Button title="Salvar" onPress={handleAddAbsence} />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalUpdateVisible}
                    onRequestClose={() => {
                        setModalUpdateVisible(!modalVisible);
                        resetModalInputs();
                    }}>
                    <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-50">
                        <View className="bg-white p-5 rounded-lg w-4/5">
                            <Text className="text-xl font-bold mb-4">Editar Ausencia Programada</Text>
                            <TextInput
                                className="border p-2"
                                placeholder="Data Inicial"
                                value={initialDate}
                                onChangeText={setInitialDate}
                            />
                            <Text className="text-sm mb-4">Ex: '24/06/2024'</Text>
                            <TextInput
                                className="border p-2"
                                placeholder="Data Final"
                                value={finalDate}
                                onChangeText={setFinalDate}
                            />
                            <Text className="text-sm mb-4">Ex: '26/06/2024 (valor maior que a data inicial)'</Text>
                            <TextInput
                                className="border p-2"
                                placeholder="Hora Inicial"
                                value={initialHour}
                                onChangeText={setInitialHour}
                            />
                            <Text className="text-sm mb-4">Ex: '08:00'</Text>
                            <TextInput
                                className="border p-2"
                                placeholder="Hora Final"
                                value={finalHour}
                                onChangeText={setFinalHour}
                            />
                            <Text className="text-sm mb-4">Ex: '09:00 (valor maior que o horario inicial)'</Text>
                            <View className="flex-row justify-between">
                                <Button title="Cancelar" onPress={() => setModalUpdateVisible(false)} />
                                <Button title="Salvar" onPress={handleUpdateAbsence} />
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>
        </SafeAreaView>
    );
}
