import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AccountScreen } from "../screens";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import ChangeUserInfoScreen from "../screens/ChangeUserInfoScreen";
import SetPaymentScreen from "../screens/SetPaymentScreen";

const Stack = createNativeStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Account"
      component={AccountScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ChangeUserInfo"
      component={ChangeUserInfoScreen}
      options={{ headerTitle: "Update User Info" }}
    />
    <Stack.Screen
      name="SetPayment"
      component={SetPaymentScreen}
      options={{ headerTitle: "Set Payment" }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePasswordScreen}
      options={{ headerTitle: "Change Password" }}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
