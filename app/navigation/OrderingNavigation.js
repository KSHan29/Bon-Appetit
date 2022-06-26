import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "../screens";
import MenuScreen from "../screens/MenuScreen";
import RestaurantListingScreen from "../screens/RestaurantListingScreen";
import JoinGroupOrdersScreen from "../screens/JoinGroupOrdersScreen";
import CartScreen from "../screens/CartScreen";
import OnGoingOrdersScreen from "../screens/OnGoingOrdersScreen";

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
    <Stack.Screen name="Menu" component={MenuScreen} />
    <Stack.Screen
      name="JoinGroupOrdersScreen"
      component={JoinGroupOrdersScreen}
      options={{ headerTitle: "" }}
    />
    <Stack.Screen
      name="Cart"
      component={CartScreen}
      options={{ headerTitle: "" }}
    />
  </Stack.Navigator>
);

export default OrderingNavigator;
