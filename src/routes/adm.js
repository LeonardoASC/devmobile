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

import { Plano } from "../pagesprivate/adm/plano";

import { CustomDrawerContent } from "./CustomDrawerContent";
import { Ionicons } from '@expo/vector-icons';



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


            <Stack.Screen name="Plano" component={Plano} />
        </Stack.Navigator>
    );
}


export function Adm() {
    return (
        <Drawer.Navigator
            initialRouteName="HomeStack"
            screenOptions={{
                headerShown: false,
                drawerActiveBackgroundColor: 'white',
                drawerActiveTintColor: 'black',
                drawerStyle: {
                    backgroundColor: 'white', // Cor de fundo que você deseja
                }
            }}
            drawerContent={props => <CustomDrawerContent {...props} />}
        >
            <Drawer.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    drawerLabel: 'Home',
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size}
                            color={focused ? 'black' : 'white'}
                        />
                    )
                    
                }}
            />
            <Drawer.Screen
                name="Agendamento"
                component={Agendamento}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={focused ? 'calendar' : 'calendar-outline'}
                            size={size}
                            color={focused ? 'black' : 'white'}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Horario"
                component={Horario}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={focused ? 'time' : 'time-outline'}
                            size={size}
                            color={focused ? 'black' : 'white'}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Servico"
                component={Servico}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={focused ? 'settings' : 'settings-outline'}
                            size={size}
                            color={focused ? 'black' : 'white'}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="SubServico"
                component={SubServico}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={focused ? 'settings' : 'settings-outline'}
                            size={size}
                            color={focused ? 'black' : 'white'}
                        />
                    )
                }}
            />
            <Drawer.Screen
                name="Plano"
                component={Plano}
                options={{
                    drawerIcon: ({ focused, size }) => (
                        <Ionicons
                            name={focused ? 'settings' : 'settings-outline'}
                            size={size}
                            color={focused ? 'black' : 'white'}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    );
}