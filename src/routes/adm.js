import { createStackNavigator } from "@react-navigation/stack";

import { DashBoard } from "../pagesprivate/adm/dashboard"

const Stack = createStackNavigator();

export function Adm() {
    return (
        <Stack.Navigator
            initialRouteName="DashBoard"
            screenOptions={{
                cardStyle: {
                    backgroundColor: "#06b6d4",
                },
                headerShown: false
            }}
        >
            <Stack.Screen name="DashBoard" component={DashBoard} />

        </Stack.Navigator>
    );
}
