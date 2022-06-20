import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";
function MenuListItem({ title, subTitle, onPress, price }) {
  const [orderCount, setOrderCount] = useState(0);

  const onAddPress = () => {
    setOrderCount(orderCount + 1);
  };

  const onMinusPress = () => {
    if (orderCount > 0) {
      setOrderCount(orderCount - 1);
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
          <View style={styles.button}>
            <Button title="+" onPress={onAddPress}></Button>
          </View>
          <View style={styles.button}>
            <Button title="-" onPress={onMinusPress}></Button>
          </View>

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
  button: {
    backgroundColor: "lightgray",
    borderRadius: 7,
    margin: 1,
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
