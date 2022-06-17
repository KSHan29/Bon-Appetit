import { NavigationContainer } from "@react-navigation/native";

import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  HomeScreen,
} from "./app/screens";
import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator></AuthNavigator>
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
}
