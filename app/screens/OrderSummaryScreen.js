import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  setDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import { auth } from "../components/firebase/firebase";
import CartListItem from "../components/CartListItem";
import colors from "../config/colors";
import ListItemSeparator from "../components/ListItemSeparator";

function OrderSummaryScreen(props) {
  const route = useRoute();
  const dispatch = useDispatch();
  const postalCode = route.params.postalCode;
  const restaurant = route.params.restaurant;
  const status = route.params.status;
  const orderID = route.params.orderID;
  const userID = auth.currentUser.uid;
  const [orderItems, setOrderItems] = useState();

  const navigation = useNavigation();
  if (orderItems === undefined) {
    const colRef = collection(db, "Orders", orderID, userID);

    onSnapshot(colRef, (snapshot) => {
      let temp = [];
      snapshot.docs.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setOrderItems(temp);
    });
  }

  let cartItems;
  let totalCost;
  if (orderItems !== undefined) {
    cartItems = orderItems.filter((obj) => obj.quantity !== 0);
    totalCost = orderItems.reduce(
      (total, currObj) => total + currObj.Price * currObj.quantity,
      0
    );
  }

  return (
    <Screen>
      <View style={styles.headers}>
        <AppText style={styles.headersFont}>Address: {postalCode}</AppText>
        <AppText style={styles.headersFont}>Restaurant: {restaurant}</AppText>
        <AppText style={styles.headersFont}>Status: {status}</AppText>
      </View>
      <FlatList
        data={orderItems}
        keyExtractor={(item) => item.Name}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => {
          return (
            <CartListItem
              title={item.Name}
              price={item.Price}
              quantity={item.quantity}
            />
          );
        }}
      />
      <View style={styles.priceContainer}>
        <AppText>Subtotal: ${totalCost}</AppText>
        <AppText>Delivery Fee: $5</AppText>
        <AppText>Total Price: ${totalCost + 5}</AppText>
      </View>
      {/* <TouchableOpacity
        style={styles.cartButton}
        underlayColor={colors.black}
        onPress={() => console.log("Confirm Order")}
      >
        <AppText style={styles.confirmOrderButton}>Confirm Order</AppText>
        <View style={styles.cartIcon}>
          <MaterialCommunityIcons name="cart-check" size={25} />
        </View>
      </TouchableOpacity> */}
    </Screen>
  );
}

const styles = StyleSheet.create({
  cartButton: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  cartIcon: {
    padding: 10,
    flexDirection: "row-reverse",
    justifyContent: "center",
  },
  confirmOrderButton: {
    fontSize: 20,
    fontWeight: "400",
  },
  headers: {
    justifyContent: "center",
    alignItems: "center",
  },
  headersFont: {
    fontSize: 20,
    fontWeight: "500",
  },
  priceContainer: {
    padding: 20,
  },
});

export default OrderSummaryScreen;
