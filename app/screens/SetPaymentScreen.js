import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { useFormik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";
import valid from "card-validator";
//import "tailwindcss/dist/tailwind.min.css";
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

const digitsOnly = (value) => /^\d+$/.test(value);
const validationSchema = Yup.object().shape({
  cardNumber: Yup.string().test(
    "test-number",
    "Credit Card number is invalid",
    (value) => valid.number(value).isValid
  ),
  name: Yup.string().required().label("Name"),
  expiryYear: Yup.number()
    .test(
      "len",
      "Must be exactly 4 characters",
      (val) => val && val.toString().length === 4
    )
    .min(new Date().getFullYear()),
  expiryMonth: Yup.number()
    .test(
      "len",
      "Must be less than 3 characters",
      (val) => val && val.toString().length < 3
    )
    .min(1)
    .max(12),
  securityCode: Yup.string().required().label("Security code").min(3).max(4),
});

function SetPaymentScreen() {
  const user = auth.currentUser;
  const userID = user.uid;

  const handleChangeSubmit = (values) => {
    alert("Default Payment added");
    const docRef = doc(db, "Users", userID);
    updateDoc(docRef, { CreditCard: true });
  };
  // const formik = useFormik({
  //   initialValues: {
  //     creditCard: "",
  //   },
  //   validationSchema,
  //   onSubmit: () => console.log("."),
  // });
  // const creditCard = formik.getFieldMeta("creditCard");

  return (
    <Screen style={styles.container}>
      <ScrollView style={styles.scroll}>
        <AppForm
          initialValues={{
            cardNumber: "",
            name: "",
            expiryMonth: "",
            expiryYear: "",
            securityCode: "",
          }}
          onSubmit={handleChangeSubmit}
          validationSchema={validationSchema}
        >
          <AppFormField
            keyboardType="number-pad"
            icon="credit-card"
            name="cardNumber"
            placeholder="Card number"
            textContentType="creditCardNumber"
            width="100%"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            icon="account"
            name="name"
            placeholder="Name"
            textContentType="givenName"
            width="100%"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            icon="calendar-month"
            name="expiryMonth"
            placeholder="Expiry month"
            width="100%"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            icon="calendar-month"
            name="expiryYear"
            placeholder="Expiry year"
            width="100%"
          />
          <AppFormField
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            icon="lock-check"
            name="securityCode"
            placeholder="Security Code"
            secureTextEntry
            textContentType="password"
            width="100%"
          />
          <View style={styles.buttons}>
            <SubmitButton title="Update" />
          </View>
        </AppForm>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
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
  scroll: {
    width: "100%",
    padding: "10%",
  },
});

export default SetPaymentScreen;
