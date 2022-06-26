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

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  phoneNumber: Yup.string()
    .required()
    .matches(phoneRegExp, "Phone number is not valid")
    .label("Phone Number"),
});

function ChangeUserInfoScreen() {
  const userID = auth.currentUser.uid;
  const handleChangeSubmit = (values) => {
    const docRef = doc(db, "Users", userID);
    updateDoc(docRef, {
      Name: values["name"],
      Phone: values["phoneNumber"],
    })
      .then(() => {
        alert("Updated.");
      })
      .catch((err) => console.log(err));
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
          name: "",
          phoneNumber: "",
        }}
        onSubmit={handleChangeSubmit}
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
          icon="phone"
          name="phoneNumber"
          placeholder="Phone Number"
          textContentType="telephoneNumber"
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

export default ChangeUserInfoScreen;
