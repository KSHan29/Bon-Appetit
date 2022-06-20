import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens";
import MenuScreen from "../screens/MenuScreen";
import RestaurantListingScreen from "../screens/RestaurantListingScreen";
import JoinGroupOrdersScreen from "../screens/JoinGroupOrdersScreen";

const Stack = createNativeStackNavigator();

const OrderingNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RestaurantListing"
      component={RestaurantListingScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="Menu"
      component={MenuScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="JoinGroupOrdersScreen"
      component={JoinGroupOrdersScreen}
      options={{ headerTitle: "" }}
    />
  </Stack.Navigator>
);

export default OrderingNavigator;
