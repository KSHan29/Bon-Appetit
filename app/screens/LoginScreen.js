import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  const navigation = useNavigation();

  return (
    <Screen style={styles.container}>
      <MaterialCommunityIcons
        name="food-off-outline"
        size={100}
        color={"black"}
      />
      <AppText>Bon Appetit</AppText>
      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={() => navigation.navigate("HomeScreen")}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
          width="100%"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          width="100%"
        />
        <View style={styles.forgotPassword}>
          <Button
            title="Forgot password?"
            color="grey"
            onPress={() => navigation.navigate("Forgot Password")}
          />
        </View>
        <View style={styles.buttons}>
          <SubmitButton title="Login" />
          <AppButton
            title="Register"
            color="secondary"
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: "10%",
    width: "100%",
    justifyContent: "center",
  },
  buttons: {
    width: "100%",
    alignItems: "center",
    marginVertical: 60,
  },
  forgotPassword: {
    position: "relative",
    width: "100%",
    alignItems: "flex-end",
    top: 0,
  },
});

export default LoginScreen;
