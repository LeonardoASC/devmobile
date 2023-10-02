import { View, Text, TouchableOpacity } from "react-native";
import SvgComponent from "../../../svg/circulo";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="items-center  ">
        <View className="flex justify-end ">
          <TouchableOpacity
            className="bg-white rounded p-2 shadow-md "
            onPress={() => { logout() }}
          >
            <Text className="text-cyan-500 font-bold text-sm text-center">Sair</Text>
          </TouchableOpacity>
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
            onPress={() => navigation.navigate("FirstData")}
          >
            <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Serviços</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded p-3 shadow-md mb-4"
            onPress={() => navigation.navigate("FirstData")}
          >
            <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Produtos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-white rounded p-3 shadow-md mb-4"
            onPress={() => navigation.navigate("FirstData")}
          >
            <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Horarios</Text>
          </TouchableOpacity>





        </View>

      </View>
    </SafeAreaView>
  );
}
