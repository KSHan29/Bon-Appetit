import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import { auth } from "../components/firebase/firebase";
import CartListItem from "../components/CartListItem";
import colors from "../config/colors";
import ListItemSeparator from "../components/ListItemSeparator";

function CartScreen(props) {
  const route = useRoute();
  const [cartItems, setCartItems] = useState();
  const [totalCost, setTotalCost] = useState(0);
  const postalCode = route.params.postalCode;
  const restaurant = route.params.restaurant;
  const userID = auth.currentUser.uid;

  const navigation = useNavigation();
  const onConfirmOrderPress = () => {
    //navigation.navigate("Cart");
    console.log("order confirmed");
  };

  if (cartItems === undefined) {
    const colRef = collection(db, "Users", userID, "Cart");
    onSnapshot(colRef, (snapshot) => {
      let temp = [];
      let tempAmt = 0;
      snapshot.docs.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
        const price = doc.data().Price;
        console.log(price);
        const quantity = doc.data().quantity;
        console.log(quantity);
        tempAmt += price * quantity;
      });
      setTotalCost(tempAmt);
      setCartItems(temp);
    });
  }

  return (
    <Screen>
      <View style={styles.headers}>
        <AppText style={styles.headersFont}>Address: {postalCode}</AppText>
        <AppText style={styles.headersFont}>Restaurant: {restaurant}</AppText>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
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
      <TouchableOpacity
        style={styles.cartButton}
        underlayColor={colors.black}
        onPress={onConfirmOrderPress}
      >
        <AppText style={styles.confirmOrderButton}>Confirm Order</AppText>
        <View style={styles.cartIcon}>
          <MaterialCommunityIcons name="cart-check" size={25} />
        </View>
      </TouchableOpacity>
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

export default CartScreen;
