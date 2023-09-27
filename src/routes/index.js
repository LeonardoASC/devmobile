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
// importação rotas privadas
import { HomePrivate } from "../pagesprivate/homeprivate";
import { FirstDataPrivate } from "../pagesprivate/firstdataprivate";
import { ServicoPrivate } from "../pagesprivate/servicoprivate";
import { SubServicoPrivate } from "../pagesprivate/subservicoprivate";
import { AgendadoPrivate } from "../pagesprivate/agendadoprivate";

const Stack = createStackNavigator();

export function Routes() {
  return (
    <Stack.Navigator
    initialRouteName="Home"
      screenOptions={{
        cardStyle: {
          backgroundColor: "#06b6d4",
        },
        headerShown: false 
      }}
    >
      {/* rotas publicas */}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FirstData" component={FirstData} />
      <Stack.Screen name="Inbox" component={Inbox} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Servico" component={Servico} />
      <Stack.Screen name="SubServico" component={SubServico} />
      <Stack.Screen name="Agendado" component={Agendado} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      {/* rotas privadas */}
      <Stack.Screen name="HomePrivate" component={HomePrivate} />
      <Stack.Screen name="FirstDataPrivate" component={FirstDataPrivate} />
      <Stack.Screen name="ServicoPrivate" component={ServicoPrivate} />
      <Stack.Screen name="SubServicoPrivate" component={SubServicoPrivate} />
      <Stack.Screen name="AgendadoPrivate" component={AgendadoPrivate} />
    </Stack.Navigator>
  );
}
