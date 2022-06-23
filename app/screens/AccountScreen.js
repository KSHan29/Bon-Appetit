import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import { auth } from "../components/firebase/firebase";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import authStorage from "../auth/storage";
import AuthContext from "../auth/context";

function AccountScreen(props) {
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLogOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        handleLogOut();
        console.log("signedout");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Screen style={styles.screen}>
      <AppText>Account (TODO)</AppText>
      <AppButton title="Logout" onPress={handleSignOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 50,
  },
});

export default AccountScreen;
