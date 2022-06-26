import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { auth } from "./firebase/firebase";
import AppText from "./AppText";
import colors from "../config/colors";
function CartListItem({ title, subTitle, quantity, price, image }) {
  const amount = quantity * price;

  return (
    <>
      <View style={styles.container}>
        {image && <Image style={styles.image} source={image} />}
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.subTitle} numberOfLines={1}>
            ${price}
          </AppText>
          {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        </View>

        <View style={styles.buttonContainer}>
          <AppText style={styles.counter}>x{quantity}</AppText>
          <AppText>${amount}</AppText>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightgray",
    borderRadius: 7,
    margin: 1,
  },
  buttonContainer: {
    alignItems: "center",
  },
  counter: {
    paddingHorizontal: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default CartListItem;
