import { View, Text, TouchableOpacity } from "react-native";
import SvgComponent from "../../../svg/circulo";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext } from "react";
import {AuthContext} from "../../../context/AuthContext"
export function Home({ navigation }) {
  const { logout } = useContext(AuthContext);
  return (
    <SafeAreaView className="flex-1">
      <View className="items-center  justify-center mt-2">
        <View className="flex  justify-end ">
          <TouchableOpacity
            className="bg-white rounded p-2 shadow-md "
            onPress={() => { logout() }}
          >
            <Text className="text-cyan-500 font-bold text-sm text-center">Sair</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-2">

          <SvgComponent />
        </View>
        <Text className="text-white text-xl ">Bem vindo a area do administrador</Text>

        <View className="mt-8 items-center">
          <TouchableOpacity
            className="bg-white rounded p-3 shadow-md mb-4"
            onPress={() => navigation.navigate("DashBoard")}
          >
            <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Agendamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded p-3 shadow-md mb-4"
            onPress={() => navigation.navigate("Servico")}
          >
            <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Serviços</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded p-3 shadow-md mb-4"
            onPress={() => navigation.navigate("SubServico")}
          >
            <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Sub Serviços</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded p-3 shadow-md mb-4"
            onPress={() => navigation.navigate("Horario")}
          >
            <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Horarios</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
