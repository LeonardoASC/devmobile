import { createStackNavigator } from "@react-navigation/stack";

import { DashBoard } from "../pagesprivate/adm/dashboard"
import { Home } from "../pagesprivate/adm/home";

import { Horario } from "../pagesprivate/adm/horario"
import { HorarioCreate } from "../pagesprivate/adm/horario/create"
import { HorarioEdit } from "../pagesprivate/adm/horario/edit"

import { Servico } from "../pagesprivate/adm/servico"
import { ServicoCreate } from "../pagesprivate/adm/servico/create";
import { ServicoEdit } from "../pagesprivate/adm/servico/edit"

import { SubServico } from "../pagesprivate/adm/subservico"
import { SubServicoCreate } from "../pagesprivate/adm/subservico/create"
import { SubServicoEdit } from "../pagesprivate/adm/subservico/edit"

const Stack = createStackNavigator();

export function Adm() {
    return (
        <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
                cardStyle: {
                    backgroundColor: "#a5f3fc",
                },
                headerShown: false
            }}
        >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="DashBoard" component={DashBoard} />
            
            <Stack.Screen name="Horario" component={Horario} />
            <Stack.Screen name="HorarioCreate" component={HorarioCreate} />
            <Stack.Screen name="HorarioEdit" component={HorarioEdit} />

            <Stack.Screen name="Servico" component={Servico} />
            <Stack.Screen name="ServicoCreate" component={ServicoCreate} />
            <Stack.Screen name="ServicoEdit" component={ServicoEdit} />

            <Stack.Screen name="SubServico" component={SubServico} />
            <Stack.Screen name="SubServicoCreate" component={SubServicoCreate} />
            <Stack.Screen name="SubServicoEdit" component={SubServicoEdit} />
        </Stack.Navigator>
    );
}
