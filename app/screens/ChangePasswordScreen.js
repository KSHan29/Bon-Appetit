import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { auth } from "../components/firebase/firebase";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";
import { getDoc } from "firebase/firestore";
import LoadingScreen from "./LoadingScreen";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().required().min(6).label("Current password"),
  newPassword: Yup.string().required().min(6).label("New password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords don't match!")
    .required()
    .label("Password"),
});

function ChangePasswordScreen() {
  const user = auth.currentUser;
  const userID = user.uid;

  const handleChangeSubmit = (values) => {
    const credential = EmailAuthProvider.credential(
      user.email,
      values["currentPassword"]
    );
    const result = reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, values["newPassword"]);
        alert("Password updated.");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.icon}>
        <MaterialCommunityIcons
          name="food-off-outline"
          size={100}
          color={"black"}
        />
        <AppText>Bon Appetit</AppText>
      </View>
      <AppForm
        initialValues={{
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        onSubmit={handleChangeSubmit}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock-open"
          name="currentPassword"
          placeholder="Current password"
          secureTextEntry
          textContentType="password"
          width="100%"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="newPassword"
          placeholder="New password"
          secureTextEntry
          textContentType="password"
          width="100%"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock-check"
          name="confirmPassword"
          placeholder="Confirm new password"
          secureTextEntry
          textContentType="password"
          width="100%"
        />
        <View style={styles.buttons}>
          <SubmitButton title="Update" />
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
  icon: {
    padding: 40,
  },
});

export default ChangePasswordScreen;
