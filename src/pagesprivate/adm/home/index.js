import { View, Text, TouchableOpacity, Image } from "react-native";
import SvgComponent from "../../../svg/circulo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext"
import { FontAwesome } from '@expo/vector-icons';
import OpenDrawerButton from '../../../components/opendrawer'

export function Home({ navigation }) {

  const { logout } = useContext(AuthContext);

  const ActionCard = ({ label, onPress, iconName }) => (
    <TouchableOpacity
      className="w-1/2 p-4"
      onPress={onPress}
    >
      <View className="bg-white rounded-lg shadow-lg p-6 items-center">
        <FontAwesome name={iconName} size={32} color="#06B6D4" />
        <Text className="text-cyan  font-bold mt-4">{label}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView className="flex-1 ">
      <View className="flex-1 justify-center ">
        <OpenDrawerButton />
        
        <View className="flex-row justify-center">
          {/* <SvgComponent width={150} height={150} /> */}
          {/* <Image source={Top_Knot} className="w-80 h-80 border rounded-full" /> */}
        </View>
        <View className="items-center mb-4 mt-4">
          <Text className="text-white text-3xl font-bold text-center">Área do administrador</Text>
          <Text className="text-white text-3xl font-bold text-center">DashBoard abaixo futuramente</Text>
        </View>
        {/* <View className="flex-row flex-wrap justify-between">
          <ActionCard label="Agendamentos" iconName="calendar" onPress={() => navigation.navigate("Agendamento")} />
          <ActionCard label="Horários" iconName="clock-o" onPress={() => navigation.navigate("Horario")} />
          <ActionCard label="Serviços" iconName="wrench" onPress={() => navigation.navigate("Servico")} />
          <ActionCard label="Sub Serviços" iconName="tasks" onPress={() => navigation.navigate("SubServico")} />
        </View> */}
      </View>
    </SafeAreaView>
  );
}
