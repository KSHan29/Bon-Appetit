import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

import { auth } from "../components/firebase/firebase";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

function HomeScreen() {
  const navigation = useNavigation();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate("Login");
        console.log("signedout");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <Screen style={styles.screen}>
      <AppText>Home Screen (TODO)</AppText>
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

export default HomeScreen;
