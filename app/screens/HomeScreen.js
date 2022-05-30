import React from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

function HomeScreen(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <AppText>Home Screen (TODO)</AppText>
      <AppButton
        title="Logout"
        onPress={
          /* TODO CLEAR CACHE AND SIGN OUT */
          () => navigation.navigate("Login")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", justifyContent: "center", flex: 1 },
});

export default HomeScreen;
