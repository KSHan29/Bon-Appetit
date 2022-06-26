import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AppNavigator from "./app/navigation/AppNavigator";
import authStorage from "./app/auth/storage";
import AuthContext from "./app/auth/context";
import store from "./app/redux";
import LoadingScreen from "./app/screens/LoadingScreen";

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
    <Provider store={store}>
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
      </AuthContext.Provider>
    </Provider>
  );
}
