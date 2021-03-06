import React, { useContext } from "react";
import { View, StyleSheet, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";
import jwtDecode from "jwt-decode";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { auth } from "../components/firebase/firebase";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().label("Password"),
});

function LoginScreen() {
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();
  const handleLoginSubmit = async (values) => {
    signInWithEmailAndPassword(auth, values["email"], values["password"])
      .then(() => {
        console.log("Loggedin");
        getIdToken(auth.currentUser).then((token) => {
          const user = jwtDecode(token);
          authContext.setUser(user);
          authStorage.storeToken(token);
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

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
        onSubmit={handleLoginSubmit}
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
            onPress={() => navigation.navigate("ForgotPassword")}
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
