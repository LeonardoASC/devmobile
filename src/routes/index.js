import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from 'react';
import { ActivityIndicator, View, Text  } from 'react-native';
import { Private } from "./private";
import { Public } from "./public";
import { Adm } from "./adm";

import { StatusBar } from "expo-status-bar";
import { AuthContext } from '../context/AuthContext';
import { LoadingComponent } from "../pages/login/LoadingComponent";


export function Routes() {
  const { isLoading, userToken } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);
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
      {/* {
        userToken !== null ? <Private /> : <Public />
      } */}

      {
        userToken ? (userInfo && userInfo.email === 'admin@adm.com' ? <Adm />
          : 
          <Private />
        )
          :
          (
            <Public />
          )
      }

    </NavigationContainer>
  )
}