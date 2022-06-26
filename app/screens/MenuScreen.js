import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import MenuListItem from "../components/MenuListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import { auth } from "../components/firebase/firebase";
import LoadingScreen from "./LoadingScreen";

function MenuScreen() {
  const route = useRoute();
  const [menuItems, setMenuItems] = useState();
  // const [cartItems, setCartItems] = useState();
  const userID = auth.currentUser.uid;
  // TODO ONPRESS, ADD ITEMS TO CART
  const postalCode = route.params.postalCode;
  const restaurant = route.params.restaurant;
  const restaurantImage = route.params.restaurantImage;
  const orderID = route.params.orderID;
  let unsubCol;
  let unsubSubCol;
  //   useEffect(() => {
  //     return () => {
  //       unsubCol();
  //       unsubSubCol();
  //     };
  //   }, []);
  const colRef = collection(db, "Restaurants");
  const q = query(colRef, where("Name", "==", restaurant));
  let docId;
  const navigation = useNavigation();
  const onViewCartPress = () => {
    navigation.navigate("Cart", {
      postalCode,
      restaurant,
      restaurantImage,
      orderID,
    });
  };

  // count items in cart
  const itemArr = useSelector((store) => store[restaurant]);
  const cartItems =
    itemArr === undefined
      ? 0
      : itemArr
          .filter((obj) => obj.quantity !== 0)
          .reduce((sum, obj) => sum + obj.quantity, 0);

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
    return <LoadingScreen />;
  }

  return (
    <Screen>
      <View style={styles.headers}>
        <AppText style={styles.headersFont}>
          {orderID ? "Joining Group Order" : "New Group Order"}
        </AppText>
        <AppText style={styles.headersFont}>Address: {postalCode}</AppText>
        <AppText style={styles.headersFont}>Restaurant: {restaurant}</AppText>
      </View>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => {
          return (
            <MenuListItem
              title={item.Name}
              price={item.Price}
              image={{
                uri: item.image,
              }}
              restaurant={restaurant}
            />
          );
        }}
      />
      <View>
        <TouchableOpacity
          style={styles.cartButton}
          underlayColor={colors.black}
          onPress={onViewCartPress}
        >
          <AppText>View Cart</AppText>
          <View style={styles.cartIcon}>
            <MaterialCommunityIcons name="cart-check" size={25} />
          </View>

          {cartItems > 0 && <AppText>{cartItems} Items</AppText>}
        </TouchableOpacity>
      </View>
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
  headers: {
    justifyContent: "center",
    alignItems: "center",
  },
  headersFont: {
    fontSize: 20,
    fontWeight: "500",
  },
});

export default MenuScreen;
