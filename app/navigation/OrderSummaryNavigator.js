import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OrdersScreen } from "../screens";
import OrderSummaryScreen from "../screens/OrderSummaryScreen";

const Stack = createNativeStackNavigator();

const OrderSummaryNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Orders"
      component={OrdersScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="OnGoingOrders"
      component={OrderSummaryScreen}
      options={{ headerTitle: "Order Summary" }}
    />
  </Stack.Navigator>
);

export default OrderSummaryNavigator;
