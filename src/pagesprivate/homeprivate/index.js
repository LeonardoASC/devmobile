import { View, Text, TouchableOpacity, Button, SafeAreaView } from "react-native";
import SvgComponent from "../../svg/circulo";
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react";
import { useNavigation } from '@react-navigation/native';


export function HomePrivate({ route, navigation }) {
  const { logout } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);


  return (
    <SafeAreaView className="flex-1">

      <View className="flex-1 items-center justify-center">
        <TouchableOpacity
          className="bg-white rounded p-2 shadow-md mb-4"
          onPress={() => { logout() }}
        >
          <Text className="text-cyan-500 font-bold text-sm text-center   mt">Sair</Text>
        </TouchableOpacity>

        <SvgComponent />
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
      </View>
    </SafeAreaView>
  );
}