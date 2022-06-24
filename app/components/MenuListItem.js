import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  updateDoc,
  getDoc,
  doc,
  query,
  where,
  setDoc,
} from "firebase/firestore";

import AppText from "./AppText";
import colors from "../config/colors";
import { auth, db } from "./firebase/firebase";

function MenuListItem({ title, subTitle, price, item, restaurant }) {
  // check if the value exist
  let initalValue = useSelector((state) => {
    if (state[restaurant]) {
      if (state[restaurant].filter((obj) => title === obj.Name).length !== 0) {
        return state[restaurant].filter((obj) => title === obj.Name)[0]
          .quantity;
      }
    }
    return undefined;
  });
  const dispatch = useDispatch();
  const userID = auth.currentUser.uid;
  // console.log(initalValue);

  const [orderCount, setOrderCount] = useState(
    initalValue === undefined ? 0 : initalValue
  );
  useEffect(() => {
    const temp = {
      type: "updateCart",
      restaurant: restaurant,
      value: { Name: title, Price: price, quantity: orderCount },
    };
    dispatch(temp);
  }, [orderCount]);

  const onAddPress = () => {
    setOrderCount((prevCount) => prevCount + 1);
  };

  const onMinusPress = () => {
    if (orderCount > 0) {
      setOrderCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.subTitle} numberOfLines={1}>
            ${price}
          </AppText>
          {subTitle && (
            <AppText style={styles.subTitle} numberOfLines={2}>
              {subTitle}
            </AppText>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableHighlight underlayColor={"#45b6ae"} onPress={onAddPress}>
            <MaterialCommunityIcons name="plus" size={25} />
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"#45b6ae"} onPress={onMinusPress}>
            <MaterialCommunityIcons name="minus" size={25} />
          </TouchableHighlight>
          <AppText style={styles.counter}>x{orderCount}</AppText>
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
  buttonContainer: {
    flexDirection: "row",
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

export default MenuListItem;
