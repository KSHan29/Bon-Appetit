import React from "react";
import { StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { sendPasswordResetEmail } from "firebase/auth";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { auth } from "../components/firebase/firebase";
import AppText from "../components/AppText";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgotPasswordScreen() {
  const navigation = useNavigation();
  const handleForgotPassword = (values) => {
    sendPasswordResetEmail(auth, values["email"])
      .then(() => {
        navigation.navigate("Login");
        console.log("Forgot Password");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <Screen style={styles.screen}>
      <MaterialCommunityIcons name="lock" size={150} color={"black"} />
      <AppForm
        initialValues={{ email: "" }}
        onSubmit={handleForgotPassword}
        validationSchema={validationSchema}
      >
        <AppText style={styles.header}>Forgot your password?</AppText>
        <AppText style={styles.subHeader}>
          Enter your email below to reset your password.
        </AppText>
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
        <SubmitButton title="Submit" color="secondary" />
        <Button title="Back" onPress={() => navigation.navigate("Login")} />
      </AppForm>
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
  header: {
    fontWeight: "800",
    marginTop: 20,
    marginBottom: 10,
  },
  subHeader: {
    margin: 10,
  },
});

export default ForgotPasswordScreen;
