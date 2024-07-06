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

        const responseAgendamentosDia = await api.get('/agendamentos-dia');
        setAgendamentosDia(responseAgendamentosDia.data.quantidade_agendamentos_dia)
        //console.log(responseAgendamentosDia.data);

        const responseAgendamentosSemana = await api.get('/agendamentos-semana');
        //console.log(responseAgendamentosSemana.data);
        setAgendamentosSemana(responseAgendamentosSemana.data.quantidade_agendamentos_semana)

        const responseAgendamentosMes = await api.get('/agendamentos-mes');
        //console.log(responseAgendamentosMes.data);
        setAgendamentosMes(responseAgendamentosMes.data.quantidade_agendamentos_mes)
      } else {
        setMessage('Nenhum agendamento encontrado.');
        return;  // Se não há registros, não prossegue para as demais chamadas
      }

    } catch (error) {
      console.error("Erro ao buscar dados do dashboard:", error);
      setMessage('Erro ao buscar dados. Por favor, tente novamente.');
    } finally {
      setLoading(false); // Exemplo de código para executar no finally
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
