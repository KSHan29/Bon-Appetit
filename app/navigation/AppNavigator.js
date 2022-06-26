import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountScreen from "../screens/AccountScreen";
import OrderingNavigator from "./OrderingNavigator";
import OrderSummaryNavigator from "./OrderSummaryNavigator";
import AccountNavigator from "./AccountNavigator";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen
      name="OrderingStack"
      component={OrderingNavigator}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="OrdersStack"
      component={OrderSummaryNavigator}
      options={{
        unmountOnBlur: true,
        tabBarLabel: "Orders",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="receipt" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="AccountStack"
      component={AccountNavigator}
      options={{
        tabBarLabel: "Account",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default AppNavigator;
