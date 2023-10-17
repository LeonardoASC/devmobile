import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OpenDrawerButton from '../../../components/opendrawer';
import api from "../../../services/api";
import { FontAwesome5, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";


export function Home({ navigation }) {
  const [totalAgendamentos, setTotalAgendamentos] = useState(0);
  const [receitaTotal, setReceitaTotal] = useState(0.0);
  const [ultimoCliente, setUltimoCliente] = useState({});
  const [receitaMensal, setReceitaMensal] = useState(0);
  const [receitaSemanal, setReceitaSemanal] = useState(0);
  const [receitaDiaria, setReceitaDiaria] = useState(0);
  const [tipoServicoMaisSelecionado, setTipoServicoMaisSelecionado] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const totalRes = await api.get('/total');
      if (totalRes.data && totalRes.data.total) {
        setTotalAgendamentos(totalRes.data.total);

        const receitaRes = await api.get('/receita-total');
        setReceitaTotal(parseFloat(receitaRes.data.receita_total));

        const responseUltimoCliente = await api.get('/ultimo-cliente');
        setUltimoCliente(responseUltimoCliente.data);

        const responseReceitaMensal = await api.get('/receita-mensal');
        setReceitaMensal(responseReceitaMensal.data.receita_mensal);

        const responseReceitaSemanal = await api.get('/receita-semanal');
        setReceitaSemanal(responseReceitaSemanal.data.receita_semanal);

        const responseReceitaDiaria = await api.get('/receita-diaria');
        setReceitaDiaria(responseReceitaDiaria.data.receita_diaria);

        const responseServicoMaisSelecionado = await api.get('/servico-mais-selecionado');
        setTipoServicoMaisSelecionado(responseServicoMaisSelecionado.data.tipo_servico);
      } else {
        setMessage('Nenhum agendamento encontrado.');
        return;  // Se não há registros, não prossegue para as demais chamadas
      }

    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
      setMessage('Erro ao buscar dados. Por favor, tente novamente.');
    }
  };

  const Card = ({ icon, title, data }) => {
    return (
      <View className="flex-1 m-3 bg-white rounded-xl p-4 flex-col items-center">
        {icon}
        <View className="mt-2">
          <Text className="font-bold text-center mb-1">{title}</Text>
          <Text className="text-lg text-center">{data}</Text>
        </View>
      </View>
    );
  };
  
  return (
    <SafeAreaView className="flex-1">
      <View className="h-full justify-center p-5">
  
        <OpenDrawerButton />
  
        <Text className="text-white text-2xl font-bold text-center mb-6">Área do administrador</Text>
  
        {message ? (
          <Text className="text-red-500 text-center mt-5">{message}</Text>
        ) : (
          <ScrollView>
            <View className="flex-row">
              <Card
                icon={<FontAwesome5 name="calendar-check" size={18} color="gray" />}
                title="Total de Agendamentos"
                data={totalAgendamentos}
              />
  
              <Card
                icon={<FontAwesome5 name="money-bill-wave" size={18} color="gray" />}
                title="Receita Total"
                data={`R$ ${receitaTotal.toFixed(2)}`}
              />
            </View>
  
            <View className="flex-row">
              <Card
                icon={<MaterialCommunityIcons name="account-check-outline" size={18} color="gray" />}
                title="Último Cliente"
                data={ultimoCliente.nome}
              />
  
              <Card
                icon={<Entypo name="pie-chart" size={18} color="gray" />}
                title="Receita Mensal"
                data={`R$ ${receitaMensal}`}
              />
            </View>
  
            <View className="flex-row">
              <Card
                icon={<Entypo name="line-graph" size={18} color="gray" />}
                title="Receita Semanal"
                data={`R$ ${receitaSemanal}`}
              />
  
              <Card
                icon={<FontAwesome5 name="calendar" size={18} color="gray" />}
                title="Receita Diária"
                data={`R$ ${receitaDiaria}`}
              />
            </View>
  
            {/* If you have an odd number of cards, the last one can stand alone without a row wrap. */}
            <Card
              icon={<FontAwesome5 name="tools" size={18} color="gray" />}
              title="Serviço mais selecionado"
              data={tipoServicoMaisSelecionado}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
  
}
