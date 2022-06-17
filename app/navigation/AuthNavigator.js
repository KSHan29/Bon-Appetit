import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  LoginScreen,
  RegisterScreen,
  HomeScreen,
  ForgotPasswordScreen,
} from "../screens";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name="Forgot Password" component={ForgotPasswordScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
  </Stack.Navigator>
);

export default AuthNavigator;
