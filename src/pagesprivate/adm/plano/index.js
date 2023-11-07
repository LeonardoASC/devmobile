import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'


export function Plano() {

    const disupidate = () => {
        alert('texto')
    }

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-[#082f49]">
            <View className="bg-slate-300 p-10 rounded-3xl w-[80%]">
                <Text className="text-[#082f49] text-center font-extrabold text-3xl">Planos</Text>
                <View className="bg-black w-[100%] h-1"></View>
                <Text className="text-[#082f49] text-center">Numero de cortes: 3</Text>
                <Text className="text-[#082f49] text-center font-extrabold text-3xl">Planos</Text>
                <Text className="text-[#082f49] text-center font-extrabold text-3xl">Planos</Text>
                <Text className="text-[#082f49] text-center font-extrabold text-3xl">Planos</Text>
                <TouchableOpacity
                    onPress={() => disupidate()}
                >
                    <Text className="bg-red-500 text-white px-2 py-1 rounded">Cadastrar plano</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

