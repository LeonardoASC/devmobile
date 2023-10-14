import { createStackNavigator } from "@react-navigation/stack";
// importação para rotas publicas
import { Home } from "../pages/home";
import { FirstData } from "../pages/firstdata";
import { Inbox } from "../pages/inbox";
import { Profile } from "../pages/profile";
import { Servico } from "../pages/servico";
import { SubServico } from "../pages/subservico";
import { Agendado } from "../pages/agendado";
import { Login } from "../pages/login";
import { Register } from "../pages/register";

const Stack = createStackNavigator();
export function Public() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: "#082f49",
        },
        headerShown: false
      }}
    >

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FirstData" component={FirstData} />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Servico" component={Servico} />
      <Stack.Screen name="SubServico" component={SubServico} />
      <Stack.Screen name="Agendado" component={Agendado} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />

    </Stack.Navigator>
  );
}
