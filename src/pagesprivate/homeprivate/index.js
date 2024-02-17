import { View, Text, TouchableOpacity, Button, SafeAreaView } from "react-native";
import SvgComponent from "../../svg/circulo";
import { AuthContext } from "../../context/AuthContext"
import { useContext, useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';
import OpenDrawerButton from "../../components/opendrawer";
import api from "../../services/api";
import { Ionicons } from '@expo/vector-icons';
import LoadingComponent from "../../components/loadingcomponent";

export function HomePrivate({ route, navigation }) {
  const { userInfo } = useContext(AuthContext);
  const [lastAppointment, setLastAppointment] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchAgendamentos);
    return unsubscribe;
  }, [navigation]);

  const fetchAgendamentos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/agendamento');
      if (response.data && response.data.length) {
        const userAppointments = response.data.filter(appointment => appointment.user_id === userInfo.id);
        if (userAppointments.length) {
          setLastAppointment(userAppointments[userAppointments.length - 1]);
        }
      }
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <SafeAreaView className="flex-1">
      <View className=" h-screen items-center justify-center">
        <OpenDrawerButton />

        <Text className="text-white text-xl ">Bem vindo, {userInfo.name}</Text>
        <Text className="text-white">Clique abaixo para agendar</Text>
        <View className="mt-8 items-center">
          <TouchableOpacity
            className="bg-white rounded p-3 shadow-md mb-4"
            onPress={() => navigation.navigate("FirstDataPrivate")}
          >
            <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Agendar</Text>
          </TouchableOpacity>
        </View>
        <View className="mx-5 p-5">
          {loading ? (
            <LoadingComponent width={100} height={100} />
          ) : (
            <>
              <Text className="text-white text-xl mb-6 font-bold text-center">Ultimo agendamento:</Text>
              {lastAppointment ? (
                <View className="bg-white p-5 rounded-xl shadow-xl">
                  <Text className="text-#00B8D9 font-bold text-xl mb-4">{lastAppointment.nome}, este é o seu ultimo agendamento!</Text>

                  <View className="flex-row mb-3 items-center">
                    <Ionicons name="ios-calendar" size={24} color="#00B8D9" className="mr-2" />
                    <Text className="">Dia: {lastAppointment.dia}</Text>
                  </View>

                  <View className="flex-row mb-3 items-center">
                    <Ionicons name="ios-time" size={24} color="#00B8D9" className="mr-2" />
                    <Text className="">Horário: {lastAppointment.horario}</Text>
                  </View>

                  <View className="flex-row mb-3 items-center">
                    <Ionicons name="ios-list" size={24} color="#00B8D9" className="mr-2" />
                    <Text className="">Tipo de Serviço: {lastAppointment.tipo_servico}</Text>
                  </View>

                  <View className="flex-row mb-3 items-center">
                    <Ionicons name="ios-information-circle" size={24} color="#00B8D9" className="mr-2" />
                    <Text className="">Serviço Específico: {lastAppointment.servico_especifico}</Text>
                  </View>

                  <View className="flex-row mb-3 items-center">
                    <Ionicons name="ios-checkmark-circle" size={24} color="green" className="mr-2" />
                    <Text className="">Status: {lastAppointment.status}</Text>
                  </View>
                </View>
              ) : (
                <View className="bg-white rounded-lg flex p-5 items-center justify-center">
                  <Text className="text-black text-xl">{userInfo.name},</Text>
                  <Text className="text-black">quando você fizer um agendamento, os detalhes aparecerão aqui.</Text>
                </View>
              )}
            </>
          )}
        </View>

      </View>
    </SafeAreaView>
  );
}