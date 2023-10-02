import { createStackNavigator } from "@react-navigation/stack";

import { DashBoard } from "../pagesprivate/adm/dashboard"
import { Home } from "../pagesprivate/adm/home";
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

        </Stack.Navigator>
    );
}
