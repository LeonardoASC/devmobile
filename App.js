import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import React, {useContext} from 'react';
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/context/AuthContext"


export default function App() {

 
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

