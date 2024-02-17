import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { SvgXml } from 'react-native-svg';
import SvgComponent from '../svg/circulo';
import { Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function CustomDrawerContent(props) {
  const { logout } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props} >
      <View className="bg-sky-900 h-screen flex flex-col justify-between">
        <View className="items-center justify-center m-4">
          <SvgComponent />
        </View>
        <View className="">
          <DrawerItemList {...props}/>
        </View>

        <View className="mb-4 mx-6">
          <TouchableOpacity
            className="bg-white rounded-lg p-2 shadow-lg gap-x-2 items-center justify-center flex-row mb-5"
            onPress={logout}
          >
            <MaterialCommunityIcons name="exit-run" size={16} color="gray" />
            <Text className="text-center text-zinc-500 font-bold">Sair</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}
