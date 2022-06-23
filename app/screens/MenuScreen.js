import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addDoc, getDocs } from "firebase/firestore";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import MenuListItem from "../components/MenuListItem";
import AppButton from "../components/AppButton";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import { auth } from "../components/firebase/firebase";

function MenuScreen(props) {
  const route = useRoute();
  const [menuItems, setMenuItems] = useState();
  const [cartItems, setCartItems] = useState(0);
  const userID = auth.currentUser.uid;
  // TODO ONPRESS, ADD ITEMS TO CART
  const postalCode = route.params.postalCode;
  const restaurant = route.params.restaurant;
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
    navigation.navigate("Cart", { postalCode, restaurant });
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

  // count items in cart

  if (userID !== undefined) {
    const colRef = collection(db, "Users", userID, restaurant);
    onSnapshot(colRef, (snapshot) => {
      let temp = 0;
      snapshot.docs.forEach((doc) => {
        temp += doc.data().quantity;
      });
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
        data={menuItems}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => {
          return (
            <MenuListItem
              title={item.Name}
              price={item.Price}
              item={item}
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

          <AppText>{cartItems} Items</AppText>
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
