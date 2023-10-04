import { View, Text, TouchableOpacity } from "react-native";
import SvgComponent from "../../svg/circulo";

export function Home({ navigation }) {
  return (
    <View className="flex-1 ">
      <View className="bg-white flex h-1/4 justify-center items-center rounded-bl-full ">
      </View>
      <View className="flex justify-center items-center -translate-y-24">
        <SvgComponent />

        <Text className="text-white text-xl mt-6">Bem vindo ao nosso salão</Text>
        <Text className="text-white">Clique abaixo para agendar</Text>
        <View className="mt-8 items-center">
          <TouchableOpacity
            className="bg-white rounded p-3 shadow-md mb-4"
            onPress={() => navigation.navigate("FirstData")}
          >
            <Text className="text-cyan-500 font-bold text-lg text-center px-14 mt">Agendar sem registro</Text>
          </TouchableOpacity>

          {/* Divisor visual */}
          <View className="flex-row items-center mb-4">
            <View className="border-b border-white w-1/4"></View>
            <Text className="text-white mx-2">ou</Text>
            <View className="border-b border-white w-1/4"></View>
          </View>

          {/* "Login" e "Registrar" */}
          <View className="flex-row justify-between w-3/4">
            <TouchableOpacity
              className="bg-cyan-900 rounded p-3 shadow-md mr-2 flex-1"
              onPress={() => navigation.navigate("Login")}
            >
              <Text className="text-white font-bold text-center">Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white  rounded p-3 shadow-md ml-2 flex-1"
              onPress={() => navigation.navigate("Register")}
            >
              <Text className="text-cyan-500 font-bold text-center">Registrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
