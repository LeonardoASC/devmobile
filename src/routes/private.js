import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
// importação rotas privadas
import { HomePrivate } from "../pagesprivate/homeprivate";
import { FirstDataPrivate } from "../pagesprivate/firstdataprivate";
import { ServicoPrivate } from "../pagesprivate/servicoprivate";
import { SubServicoPrivate } from "../pagesprivate/subservicoprivate";
import { AgendadoPrivate } from "../pagesprivate/agendadoprivate";

import { CustomDrawerContent } from "./CustomDrawerContent";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="HomePrivate"
      screenOptions={{
        cardStyle: {
          backgroundColor: "#082f49",
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




export function Private() {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        cardStyle: {
          backgroundColor: "#082f49",
        },
        headerShown: false
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} options={{ drawerLabel: 'Home' }}/>
    </Drawer.Navigator>
  );
}
