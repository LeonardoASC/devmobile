import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';

const WeekdayButtons = () => {
    const [dates, setDates] = useState([]);

    useEffect(() => {
        // Obter os próximos 25 dias a partir de hoje
        const generateDates = () => {
            const result = [];
            const today = new Date();

            for (let i = 0; i < 25; i++) {
                const currentDate = new Date();
                currentDate.setDate(today.getDate() + i);
                result.push(currentDate);
            }

            return result;
        };

        setDates(generateDates());
    }, []);

    const isDisabled = (date) => {
        const day = date.getDay();
        return day === 0 || day === 1; // 0 é domingo e 1 é segunda-feira
    };

    return (
        <FlatList
            horizontal={true}
            data={dates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="m-2 p-4 bg-cyan-500 rounded-lg"
                    disabled={isDisabled(item)}
                    onPress={() => {
                        // Aqui você pode adicionar a ação do botão, se necessário
                    }}
                >
                    <View className="flex flex-row gap-4">
                        <Text className="text-white">{item.toLocaleDateString('pt-BR', { weekday: 'long' })}</Text> 
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default WeekdayButtons;
