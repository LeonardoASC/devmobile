import { View, Text, TouchableOpacity } from "react-native";
import SvgComponent from "../../svg/circulo";

export function HomePrivate({route, navigation }) {
  const userName = route.params?.userName || 'Convidado';
  return (
    <View className="flex-1 items-center justify-center">
      <SvgComponent />
      <Text className="text-white text-xl ">Bem vindo, {userName}</Text>
      <Text className="text-white">Clique abaixo para agendar</Text>
      <View className="mt-8 items-center">
        <TouchableOpacity
          className="bg-white rounded p-3 shadow-md mb-4"
          onPress={() => navigation.navigate("FirstData")}
        >
          <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Agendar</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}