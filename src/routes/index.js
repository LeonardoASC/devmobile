import { NavigationContainer } from "@react-navigation/native";
import { Private } from "./private";
import { Public } from "./public";
import { StatusBar } from "expo-status-bar";


export function Routes() {
  return (
    <NavigationContainer>
      <StatusBar />
      {
        // signed ? <Public /> : <Private />
        <Public />
        
      }
    </NavigationContainer>
  )
}