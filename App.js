import { NavigationContainer } from "@react-navigation/native";

import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  HomeScreen,
} from "./app/screens";
import AuthNavigator from "./app/navigation/AuthNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator></AuthNavigator>
    </NavigationContainer>
  );
}
