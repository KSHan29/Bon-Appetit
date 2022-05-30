import React from "react";
import { View, StyleSheet, Image } from "react-native";
import { Formik } from "formik";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Yup from "yup";

import Screen from "../components/Screen";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ErrorMessage from "../components/ErrorMessage";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen() {
  return (
    <Screen style={styles.container}>
      <MaterialCommunityIcons
        name="food-off-outline"
        size={100}
        color={"black"}
      />
      <AppText>Bon Appetit</AppText>
      <Formik
        initialValues={{ email: "", password: "" }}
        /* TODO */
        onSubmit={(values) => console.log(values)}
        validationSchema={validationSchema}
      >
        {({ handleChange, setFieldTouched, handleSubmit, touched, errors }) => (
          <>
            <AppTextInput
              onBlur={() => setFieldTouched("email")}
              onChangeText={handleChange("email")}
              autoCapitalize="none"
              autoCorrect={false}
              icon="email"
              keyboardType="email-address"
              placeholder="Email"
              textContentType="emailAddress"
            />
            <ErrorMessage error={errors.email} visible={touched.email} />
            <AppTextInput
              onBlur={() => setFieldTouched("password")}
              onChangeText={handleChange("password")}
              autoCapitalize="none"
              autoCorrect={false}
              icon="lock"
              placeholder="Password"
              secureTextEntry
              textContentType="password"
            />
            <ErrorMessage error={errors.password} visible={touched.password} />
            <AppButton title="Login" onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 25,
  },
  logo: {},
});

export default LoginScreen;
