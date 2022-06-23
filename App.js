import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import OrderingNavigator from "./app/navigation/OrderingNavigation";
import TestingScreen from "./app/screens/TestingScreen";
import JoinGroupOrdersScreen from "./app/screens/JoinGroupOrdersScreen";
import authStorage from "./app/auth/storage";
import AuthContext from "./app/auth/context";

export default function App() {
  const [user, setUser] = useState();

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
    // console.log(user);
  };

  useEffect(() => {
    restoreUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
