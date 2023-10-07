import { createStackNavigator } from "@react-navigation/stack";

// importação rotas privadas
import { HomePrivate } from "../pagesprivate/homeprivate";
import { FirstDataPrivate } from "../pagesprivate/firstdataprivate";
import { ServicoPrivate } from "../pagesprivate/servicoprivate";
import { SubServicoPrivate } from "../pagesprivate/subservicoprivate";
import { AgendadoPrivate } from "../pagesprivate/agendadoprivate";

const Stack = createStackNavigator();

export function Private() {
  return (
    <Stack.Navigator
    initialRouteName="HomePrivate"
      screenOptions={{
        cardStyle: {
          backgroundColor: "#a5f3fc",
        },
        headerShown: false 
      }}
    >
      <Stack.Screen name="HomePrivate" component={HomePrivate} />
      <Stack.Screen name="FirstDataPrivate" component={FirstDataPrivate} />
      <Stack.Screen name="ServicoPrivate" component={ServicoPrivate} />
      <Stack.Screen name="SubServicoPrivate" component={SubServicoPrivate} />
      <Stack.Screen name="AgendadoPrivate" component={AgendadoPrivate} />
    </Stack.Navigator>
  );
}
