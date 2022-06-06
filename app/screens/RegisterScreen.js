import React from "react";
import { StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as Yup from "yup";
import { auth } from "../components/firebase/firebase";

//import { firebase } from "../components/firebase/firebase";
//import { createUserWithEmailAndPassword } from "firebase/auth";
//import { authentication } from "../components/backend/firebase";

import Screen from "../components/Screen";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required()
    .label("Password"),
});

function RegisterScreen() {
  const navigation = useNavigation();
  const handleRegisterSubmit = (values) => {
    auth
      .createUserWithEmailAndPassword(values["email"], values["password"])
      .then((userCredentials) => {
        //const user = userCredentials.user;
        navigation.navigate("HomeScreen");
        console.log("registered");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={handleRegisterSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="words"
          autoCorrect={false}
          icon="account"
          keyboardType="email-address"
          name="name"
          placeholder="Name"
          textContentType="name"
          width="100%"
        />
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
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="confirmPassword"
          placeholder=" Confirm Password"
          secureTextEntry
          textContentType="password"
          width="100%"
        />
        <SubmitButton title="Register" color="secondary" />
        <Button title="Back" onPress={() => navigation.navigate("Login")} />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    padding: 25,
  },
});

export default RegisterScreen;
