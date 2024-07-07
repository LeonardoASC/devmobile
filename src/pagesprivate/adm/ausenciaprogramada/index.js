import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import OpenDrawerButton from '../../../components/opendrawer'
import api from '../../../services/api'
import { FlatList } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react';
import { Calendar } from 'react-native-calendars';

export function AusenciaProgramada() {
    const [dayOff, setDayOff] = useState([]);

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

    const renderItem = ({ item }) => {
        return (
            <View className="border">
                <Text className="text-white">{item.id}</Text>
                <Text className="text-white">{item.data_inicial}</Text>
                <Text className="text-white">{item.data_final}</Text>
                <Text className="text-white">{item.hora_inicial}</Text>
                <Text className="text-white">{item.hora_final}</Text>
            </View>
        );
    }

    const [selectedDate, setSelectedDate] = useState('');
    const [attendanceInfo, setAttendanceInfo] = useState({});


    const attendanceData = {
        '2024-01-01': { entry: '08:00', exit: '09:00' },
        '2024-01-03': { entry: '09:00', exit: '10:00' },
        '2024-01-04': { entry: '09:00', exit: '10:00' },
    };

    const onDayPress = (day) => {
        setSelectedDate(day.dateString);
        if (attendanceData[day.dateString]) {
            setAttendanceInfo(attendanceData[day.dateString]);
        } else {
            setAttendanceInfo({});
        }
    };

    const markedDates = Object.keys(attendanceData).reduce((acc, date) => {
        acc[date] = {
            marked: true,
            dotColor: '#e91e63',
            ...(selectedDate === date && { selected: true, selectedColor: '#e91e63', selectedTextColor: '#fff' })
        };
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
                    // Marque a data atual
                    current={new Date().toISOString().split('T')[0]}
                    // Chame uma função quando uma data é pressionada
                    onDayPress={onDayPress}
                    // Personalize o estilo do calendário
                    markedDates={markedDates}

                    theme={{
                        backgroundColor: '#000',
                        calendarBackground: '#fff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#e91e63',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: '#FFA500',
                        monthTextColor: '#0000ff',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '100',
                        monthTextColor: '#000',
                        // textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                    }}
                />

                {/* <TouchableOpacity className="bg-blue-500 p-2 rounded-md">
                    <Text>Adicionar Ausencia Programada</Text>
                </TouchableOpacity>

                <TouchableOpacity className="bg-blue-500 p-2 rounded-md">
                    <Text>Editar Ausencia Programada</Text>
                </TouchableOpacity> */}

                <Text className="text-center font-bold text-white"> Dias Registrados</Text>

                <FlatList
                    data={dayOff}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                />

            </View>
        </SafeAreaView>
    )
}

