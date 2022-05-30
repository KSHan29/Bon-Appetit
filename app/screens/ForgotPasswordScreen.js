import React from "react";
import { StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

function ForgotPasswordScreen(props) {
  const navigation = useNavigation();
  return (
    <Screen style={styles.modal}>
      <MaterialCommunityIcons name="lock" size={150} color={"black"} />
      <AppForm
        initialValues={{ email: "" }}
        onSubmit={
          // TODO
          /* SEND EMAIL TO RESET PASSWORD and return to LoginScreen */
          () => navigation.navigate("Login")
        }
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
  modal: {
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
