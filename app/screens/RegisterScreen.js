import React, { useContext } from "react";
import { StyleSheet, Button } from "react-native";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { getIdToken, createUserWithEmailAndPassword } from "firebase/auth";
import jwtDecode from "jwt-decode";
import { doc, setDoc, collection } from "firebase/firestore";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { auth } from "../components/firebase/firebase";
import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

// validation checks for inputs
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords don't match!")
    .required()
    .label("Password"),
  phoneNumber: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
});

function RegisterScreen() {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  const handleRegisterSubmit = (values) => {
    createUserWithEmailAndPassword(auth, values["email"], values["password"])
      .then(() => {
        // Create new database for the cart
        const userID = auth.currentUser.uid;
        const docRef = doc(db, "Users", userID);
        getIdToken(auth.currentUser).then((token) => {
          const user = jwtDecode(token);
          authContext.setUser(user);
          authStorage.storeToken(token);
          setDoc(docRef, {
            Name: values["name"],
            Email: values["email"],
            Phone: values["phoneNumber"],
          }).catch((err) => console.log(err.message));
          setDoc(doc(db, "Users", userID, "Orders", userID), {});
          // console.log(values);
        });
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
          phoneNumber: "",
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
          placeholder="Confirm Password"
          secureTextEntry
          textContentType="password"
          width="100%"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          name="phoneNumber"
          placeholder="Phone Number"
          textContentType="telephoneNumber"
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
