import React, { useState } from "react";
import { Alert, StyleSheet, TouchableHighlight, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../components/firebase/firebase";

function HomeScreen() {
  const navigation = useNavigation();
  const [postalCode, setPostalCode] = useState("");

  const onNewOrder = () => {
    if (postalCode === "") {
      Alert.alert("You need to input your delivery location postal code."),
        [{ text: "Ok" }];
    } else if (postalCode.length != 6) {
      Alert.alert("Please input a valid postal code."), [{ text: "Ok" }];
    } else {
      navigation.navigate("RestaurantListing", { postalCode });
    }
  };

  const onJoinOrder = () => {
    if (postalCode === "") {
      Alert.alert("You need to input your delivery location postal code."),
        [{ text: "Ok" }];
    } else if (postalCode.length != 6) {
      Alert.alert("Please input a valid postal code."), [{ text: "Ok" }];
    } else {
      navigation.navigate("JoinGroupOrdersScreen", { postalCode });
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.address}>
        <AppTextInput
          icon="directions"
          placeholder="Postal Code"
          onChangeText={(newText) => setPostalCode(newText)}
        ></AppTextInput>
      </View>
      <TouchableHighlight
        underlayColor={"#e05159"}
        style={styles.newOrder}
        onPress={onNewOrder}
      >
        <>
          <View style={styles.content}>
            <AppText style={styles.text}>Start New Order</AppText>
            <Entypo name="plus" size={150} color={colors.white} />
          </View>
        </>
      </TouchableHighlight>
      <TouchableHighlight
        underlayColor={"#45b6ae"}
        style={styles.groupOrder}
        onPress={onJoinOrder}
      >
        <>
          <AppText style={styles.text}>Join Group Order</AppText>
          <MaterialCommunityIcons
            name="account-group"
            size={150}
            color={colors.white}
          />
        </>
      </TouchableHighlight>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 10,
    flex: 1,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.75,
  },
  address: {
    width: "90%",
    flex: 0.15,
  },
  newOrder: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    margin: 25,
    flex: 0.5,
    backgroundColor: colors.primary,
    borderRadius: 25,
  },
  groupOrder: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: colors.secondary,
    marginBottom: 25,
    flex: 0.5,
    borderRadius: 25,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
  },
});

export default HomeScreen;
