import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { Private } from "./private";
import { Public } from "./public";
import { Adm } from "./adm";

import { StatusBar } from "expo-status-bar";
import { AuthContext } from '../context/AuthContext';



export function Routes() {
  const { userToken } = useContext(AuthContext);
  const { userInfo } = useContext(AuthContext);


  return (
    <NavigationContainer>
      <StatusBar />
      {
        userToken ?
          (userInfo && userInfo.email === 'admin@adm.com' ? <Adm /> : <Private />)
            :
          (<Public />)
      }

    </NavigationContainer>
  )
}