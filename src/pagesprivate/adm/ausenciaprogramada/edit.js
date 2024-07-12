import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TextInput, Button, Alert } from 'react-native';
import OpenDrawerButton from '../../../components/opendrawer';
import api from '../../../services/api'; // Importando a função API

export function AusenciaProgramadaEdit({ navigation, route }) {
    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');
    const [initialHour, setInitialHour] = useState('');
    const [finalHour, setFinalHour] = useState('');
    const { item } = route.params;

    useEffect(() => {
        if (item) {
            setInitialDate(item.data_inicial);
            setFinalDate(item.data_final);
            setInitialHour(item.hora_inicial);
            setFinalHour(item.hora_final);
        }
    }, [item]);

    const handleUpdateAbsence = async () => {
        if (!item.id) {
            Alert.alert('Erro!', 'ID não definido!');
            return;
        }

        try {
            const updatedAbsence = {
                data_inicial: initialDate,
                data_final: finalDate,
                hora_inicial: initialHour,
                hora_final: finalHour,
                _method: 'PUT'
            };
            const response = await api.put(`/horario-personalizado/${item.id}`, updatedAbsence);
            if (response.status === 200) {
                Alert.alert('Sucesso!', 'Ausência atualizada com sucesso.');
                navigation.navigate('Ausencia Programada');
            } else {
                Alert.alert('Erro!', 'Falha ao atualizar ausência.');
            }
        } catch (error) {
            if (error.response && error.response.status === 422) {
                let errorMessage = 'Erros de validação:\n';
                for (let field in error.response.data.errors) {
                    errorMessage += error.response.data.errors[field].join('\n');
                }
                Alert.alert('Erro!', errorMessage);
            } else {
                console.error("Erro na requisição:", error);
                Alert.alert('Erro!', 'Ocorreu um erro. Tente novamente mais tarde.');
            }
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#082f49' }}>
            <View style={{ height: '20%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 5 }}>
                    <OpenDrawerButton />
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Editar Ausência Programada</Text>
                    </View>
                </View>
            </View>

            <View style={{ padding: 20, height: '80%', width: '100%' }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>Editar Ausência Programada</Text>
                        <TextInput
                            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                            placeholder="Data Inicial"
                            value={initialDate}
                            onChangeText={setInitialDate}
                        />
                        <Text style={{ fontSize: 12, marginBottom: 10 }}>Ex: '24/06/2024'</Text>
                        <TextInput
                            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                            placeholder="Data Final"
                            value={finalDate}
                            onChangeText={setFinalDate}
                        />
                        <Text style={{ fontSize: 12, marginBottom: 10 }}>Ex: '26/06/2024 (valor maior que a data inicial)'</Text>
                        <TextInput
                            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                            placeholder="Hora Inicial"
                            value={initialHour}
                            onChangeText={setInitialHour}
                        />
                        <Text style={{ fontSize: 12, marginBottom: 10 }}>Ex: '08:00'</Text>
                        <TextInput
                            style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
                            placeholder="Hora Final"
                            value={finalHour}
                            onChangeText={setFinalHour}
                        />
                        <Text style={{ fontSize: 12, marginBottom: 10 }}>Ex: '09:00 (valor maior que o horário inicial)'</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Button title="Cancelar" onPress={() => navigation.navigate('Ausencia Programada')} />
                            <Button title="Salvar" onPress={handleUpdateAbsence} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
