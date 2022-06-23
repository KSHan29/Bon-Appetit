import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import CartListItem from "../components/CartListItem";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import ListItemSeparator from "../components/ListItemSeparator";

function CartScreen(props) {
  const route = useRoute();
  const [menuItems, setMenuItems] = useState();
  const postalCode = route.params.postalCode;
  const restaurant = route.params.restaurant;
  let unsubCol;
  let unsubSubCol;
  /* useEffect(() => {
    return () => {
      unsubCol();
      unsubSubCol();
    };
  }, []);
   */ const colRef = collection(db, "Restaurants");
  const q = query(colRef, where("Name", "==", restaurant));
  let docId;

  const navigation = useNavigation();
  const onConfirmOrderPress = () => {
    //navigation.navigate("Cart");
    console.log("order confirmed");
  };

  if (menuItems === undefined) {
    unsubCol = onSnapshot(q, (snapshot) => {
      docId = snapshot.docs[0].id;
      const subColRef = collection(db, "Restaurants", docId, "Menu");
      unsubSubCol = onSnapshot(subColRef, (snapshot) => {
        const temp = [];
        snapshot.docs.forEach((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });
        setMenuItems(temp);
      });
    });
    return <AppText>Loading</AppText>;
  }

  return (
    <Screen>
      <View style={styles.headers}>
        <AppText style={styles.headersFont}>Address: {postalCode}</AppText>
        <AppText style={styles.headersFont}>Restaurant: {restaurant}</AppText>
      </View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => {
          return <CartListItem title={item.Name} price={item.Price} />;
        }}
      />
      <View style={styles.priceContainer}>
        <AppText>Subtotal: 10</AppText>
        <AppText>Delivery Fee: 20</AppText>
        <AppText>Total Price: 30</AppText>
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
