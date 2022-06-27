import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AppText from "../components/AppText";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function LoadingScreen() {
  return (
    <View style={styles.container}>
      <AppText style={styles.loading}>Loading</AppText>
      <MaterialCommunityIcons name="reload" color={colors.black} size={80} />
      {/* <ActivityIndicator size="large" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    fontSize: 20,
  },
});

export default LoadingScreen;
