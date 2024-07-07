import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import OpenDrawerButton from '../../../components/opendrawer';
import api from "../../../services/api";
import { FontAwesome5, MaterialCommunityIcons, Entypo, FontAwesome } from '@expo/vector-icons';
import { ScrollView } from "react-native-gesture-handler";
import LoadingComponent from "../../../components/loadingcomponent";
import { useIsFocused } from '@react-navigation/native';

export function Home({ navigation }) {
  const [totalAgendamentos, setTotalAgendamentos] = useState(0);
  const [receitaTotal, setReceitaTotal] = useState(0.0);
  const [ultimoCliente, setUltimoCliente] = useState({});
  const [receitaMensal, setReceitaMensal] = useState(0);
  const [receitaSemanal, setReceitaSemanal] = useState(0);
  const [receitaDiaria, setReceitaDiaria] = useState(0);
  const [tipoServicoMaisSelecionado, setTipoServicoMaisSelecionado] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const [agendamentosDia, setAgendamentosDia] = useState(0);
  const [agendamentosSemana, setAgendamentosSemana] = useState(0);
  const [agendamentosMes, setAgendamentosMes] = useState(0);
  const isFocused = useIsFocused();




  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const totalRes = await api.get('/total');
      // console.log('Total Response:', totalRes);

      if (totalRes.data && totalRes.data.total !== undefined) {
        setTotalAgendamentos(totalRes.data.total);

        const receitaRes = await api.get('/receita-total');
        // console.log('Receita Total Response:', receitaRes);
        if (receitaRes.data && receitaRes.data.receita_total !== undefined) {
          setReceitaTotal(parseFloat(receitaRes.data.receita_total));
        }

        const responseUltimoCliente = await api.get('/ultimo-cliente');
        // console.log('Último Cliente Response:', responseUltimoCliente);
        if (responseUltimoCliente.data) {
          setUltimoCliente(responseUltimoCliente.data);
        }

        const responseReceitaMensal = await api.get('/receita-mensal');
        // console.log('Receita Mensal Response:', responseReceitaMensal);
        if (responseReceitaMensal.data && responseReceitaMensal.data.receita_mensal !== undefined) {
          setReceitaMensal(responseReceitaMensal.data.receita_mensal);
        }

        const responseReceitaSemanal = await api.get('/receita-semanal');
        // console.log('Receita Semanal Response:', responseReceitaSemanal);
        if (responseReceitaSemanal.data && responseReceitaSemanal.data.receita_semanal !== undefined) {
          setReceitaSemanal(responseReceitaSemanal.data.receita_semanal);
        }

        const responseReceitaDiaria = await api.get('/receita-diaria');
        // console.log('Receita Diaria Response:', responseReceitaDiaria);
        if (responseReceitaDiaria.data && responseReceitaDiaria.data.receita_diaria !== undefined) {
          setReceitaDiaria(responseReceitaDiaria.data.receita_diaria);
        }

        const responseServicoMaisSelecionado = await api.get('/servico-mais-selecionado');
        // console.log('Serviço Mais Selecionado Response:', responseServicoMaisSelecionado);
        if (responseServicoMaisSelecionado.data && responseServicoMaisSelecionado.data.tipo_servico !== undefined) {
          setTipoServicoMaisSelecionado(responseServicoMaisSelecionado.data.tipo_servico);
        }

        const responseAgendamentosDia = await api.get('/agendamentos-dia');
        // console.log('Agendamentos Dia Response:', responseAgendamentosDia);
        if (responseAgendamentosDia.data && responseAgendamentosDia.data.quantidade_agendamentos_dia !== undefined) {
          setAgendamentosDia(responseAgendamentosDia.data.quantidade_agendamentos_dia);
        }

        const responseAgendamentosSemana = await api.get('/agendamentos-semana');
        // console.log('Agendamentos Semana Response:', responseAgendamentosSemana);
        if (responseAgendamentosSemana.data && responseAgendamentosSemana.data.quantidade_agendamentos_semana !== undefined) {
          setAgendamentosSemana(responseAgendamentosSemana.data.quantidade_agendamentos_semana);
        }

        const responseAgendamentosMes = await api.get('/agendamentos-mes');
        // console.log('Agendamentos Mes Response:', responseAgendamentosMes);
        if (responseAgendamentosMes.data && responseAgendamentosMes.data.quantidade_agendamentos_mes !== undefined) {
          setAgendamentosMes(responseAgendamentosMes.data.quantidade_agendamentos_mes);
        }
      } else {
        setMessage('Nenhum agendamento encontrado.');
      }

    } catch (error) {
      // console.error("Erro ao buscar dados do dashboard:", error);
      setMessage('Erro ao buscar dados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchDashboardData();
    }
  }, [isFocused]);

  const Card = ({ icon, title, data }) => {
    return (
      <View className="flex-1 m-3 bg-white rounded-xl p-4 flex-col items-center">
        {icon}
        <View className="mt-2">
          <Text className="font-bold text-center mb-1">{title}</Text>
          {loading ? <LoadingComponent width={50} height={50} cor={"black"} /> :
            <Text className="text-lg text-center">{data}</Text>
          }
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1">

      <View className="h-[15%] w-full  justify-end items-center">
        <View className="w-full flex-row items-center justify-center mb-5">
          <OpenDrawerButton />
          <View className="flex-1 items-center">
            <Text className="text-white font-bold text-xl">Área do administrador</Text>
          </View>
        </View>
      </View>

      <View className="flex-row h-[85%] justify-center items-center">
        {message ? (
          <Text className="text-red-500 text-center mt-5">{message}</Text>
        ) : (
          <ScrollView>
            <View className="flex-row">

              <View className="flex-1 m-3 bg-white rounded-xl p-4 flex-col items-center">
                {icon = <FontAwesome5 name="calendar-check" size={18} color="gray" />}
                <View className="mt-2">
                  <Text className="font-bold text-center mb-1">Agendamentos</Text>
                  {loading ? <LoadingComponent width={50} height={50} cor={"black"} /> :
                    <View className="flex">
                      <Text className="text-lg text-center">Total:{totalAgendamentos}</Text>
                      <Text className="text-lg text-center">Diario:{agendamentosDia}</Text>
                      <Text className="text-lg text-center">Semanal:{agendamentosSemana}</Text>
                    </View>
                  }
                </View>
              </View>
            </View>

            <View className="flex-row">

              <Card
                icon={<FontAwesome5 name="money-bill-wave" size={18} color="gray" />}
                title="Receita Total"
                data={`R$ ${receitaTotal.toFixed(2)}`}
              />

            </View>

            <View className="flex-row">
              <View className="flex-1 m-3 bg-white rounded-xl p-4 flex-col items-center">
                {icon = <FontAwesome5 name="calendar-check" size={18} color="gray" />}
                <View className="mt-2">
                  <Text className="font-bold text-center mb-1">Receita</Text>
                  {loading ? <LoadingComponent width={50} height={50} cor={"black"} /> :
                    <View className="flex">
                      <Text className="text-lg text-center">Semanal:{receitaSemanal}</Text>
                      <Text className="text-lg text-center">Diario:{receitaDiaria}</Text>
                      <Text className="text-lg text-center">Mensal:{receitaMensal}</Text>
                    </View>
                  }
                </View>
              </View>

            </View>
            {tipoServicoMaisSelecionado ? (

              <Card
                icon={<FontAwesome5 name="tools" size={18} color="gray" />}
                title="Serviço mais selecionado"
                data={tipoServicoMaisSelecionado}
              />
            ) : (
              <Card icon={
                <FontAwesome5
                  name="tools" size={18}
                  color="gray" />}
                  title="Serviço mais selecionado"
                  data="Nenhum serviço encontrado." 
                />
            )}
          </ScrollView>
        )}
      </View>

    </SafeAreaView>
  );

}
