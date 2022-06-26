import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { OrdersScreen } from "../screens";
import OnGoingOrdersScreen from "../screens/OnGoingOrdersScreen";

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
      component={OnGoingOrdersScreen}
      options={{ headerTitle: "Order Summary" }}
    />
  </Stack.Navigator>
);

export default OrderSummaryNavigator;
