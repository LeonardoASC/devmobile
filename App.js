import 'react-native-gesture-handler';
// import 'expo-dev-client';
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from 'react';
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/context/AuthContext"


export default function App() {

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

