import { createStackNavigator } from "@react-navigation/stack";

import { DashBoard } from "../pagesprivate/adm/dashboard"
import { Home } from "../pagesprivate/adm/home";
import { Horario } from "../pagesprivate/adm/horario"
import { Servico } from "../pagesprivate/adm/servicos"
import { HorarioCreate } from "../pagesprivate/adm/horario/create"
import { HorarioEdit } from "../pagesprivate/adm/horario/edit"
const Stack = createStackNavigator();

export function Adm() {
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
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DashBoard" component={DashBoard} />
            <Stack.Screen name="Horario" component={Horario} />
            <Stack.Screen name="Servico" component={Servico} />
            <Stack.Screen name="HorarioCreate" component={HorarioCreate} />
            <Stack.Screen name="HorarioEdit" component={HorarioEdit} />

        </Stack.Navigator>
    );
}
