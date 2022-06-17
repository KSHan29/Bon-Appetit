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
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen
      name="LoggedIn"
      component={AppNavigator}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AuthNavigator;
