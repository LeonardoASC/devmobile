import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from 'react';
import { Private } from "./private";
import { Public } from "./public";
import { StatusBar } from "expo-status-bar";
import { AuthContext } from '../context/AuthContext';
import { LoadingComponent } from "../pages/login/LoadingComponent";
import { Text } from 'react-native';
import { ActivityIndicator, View } from 'react-native';

export function Routes() {
  const { isLoading, userToken } = useContext(AuthContext);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center ">
        <Text>Carregando off the windows...</Text>
        <ActivityIndicator color="cyan" size={'large'} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar />
      {
        userToken !== null ? <Private /> : <Public />
      }

    </NavigationContainer>
  )
}