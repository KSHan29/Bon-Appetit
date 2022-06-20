import { NavigationContainer } from "@react-navigation/native";

import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  HomeScreen,
} from "./app/screens";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import OrderingNavigator from "./app/navigation/OrderingNavigation";

export default function App() {
  return (
    <NavigationContainer>
      {/* <AuthNavigator /> */}
      <OrderingNavigator />
    </NavigationContainer>
  );
}
