import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from 'react';
import { Routes } from "./src/routes";
import { AuthProvider } from "./src/context/AuthContext"

// import messaging from '@react-native-firebase/messaging';
// import api from './src/services/api';

export default function App() {

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     // console.log('Authorization status:', authStatus);
  //   }
  // }

  // useEffect(() => {
  //   if (requestUserPermission()) {
  //     // retorna o token do dispositivo
  //     messaging().getToken().then(token => {
  //         // console.log(token);
         
  //     })
  //   } 
  //   else {
  //     console.log("falhou o token man", authStatus);
  //   }

  //   // Check whether an initial notification is available
  //   messaging()
  //     .getInitialNotification()
  //     .then(async(remoteMessage) => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         );
  //       }
  //     });

  //   // Assume a message-notification contains a "type" property in the data payload of the screen to open

  //   messaging().onNotificationOpenedApp(async (remoteMessage) => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.notification,
  //     );
  //   });

  //   // Register background handler
  //   messaging().setBackgroundMessageHandler(async remoteMessage => {
  //     console.log('Message handled in the background!', remoteMessage);
  //   });

  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;

  // }, [])

  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

