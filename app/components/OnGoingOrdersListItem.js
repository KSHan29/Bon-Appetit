import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import AppText from "./AppText";
import Swipeable from "react-native-gesture-handler/Swipeable";
import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";

function OnGoingOrdersListItem({
  restaurant,
  time,
  image,
  renderRightActions,
  status,
  orderID,
}) {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate("OnGoingOrders", {
      restaurant,
      postalCode,
      status,
      orderID,
    });
  };
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title}>{restaurant}</AppText>
            {status && (
              <AppText style={styles.subTitle}>Status: {status}</AppText>
            )}
            {time && (
              <AppText style={styles.subTitle}>
                Close Order Time: {time}
              </AppText>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
});

export default OnGoingOrdersListItem;
