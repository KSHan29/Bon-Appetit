import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ForgotPasswordScreen,
} from "../screens";
import AppNavigator from "./AppNavigator";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="LoggedIn" component={AppNavigator} />
  </Stack.Navigator>
);

export default AuthNavigator;
