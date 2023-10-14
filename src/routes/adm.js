import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Agendamento } from "../pagesprivate/adm/agendamento"
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

import { CustomDrawerContent } from "./CustomDrawerContent";



const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
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
            <Stack.Screen name="Agendamento" component={Agendamento} />
            
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

export function Adm() {
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
            <Drawer.Screen name="HomeStack" component={HomeStack} options={{ drawerLabel: 'Home' }} />
            <Drawer.Screen name="Agendamento" component={Agendamento} />
            <Drawer.Screen name="Horario" component={Horario} />
            <Drawer.Screen name="Servico" component={Servico} />
            <Drawer.Screen name="SubServico" component={SubServico} />
        </Drawer.Navigator>
    );
}
