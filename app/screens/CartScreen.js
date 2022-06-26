import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { collection, doc, addDoc, updateDoc, getDoc } from "firebase/firestore";
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

function CartScreen() {
  const route = useRoute();
  const dispatch = useDispatch();
  const postalCode = route.params.postalCode;
  const restaurant = route.params.restaurant;
  const restaurantImage = route.params.restaurantImage;
  const orderID = route.params.orderID;
  const userID = auth.currentUser.uid;
  const deliveryFee = 5;
  const [count, setCount] = useState(1);

  const navigation = useNavigation();
  if (orderID !== undefined) {
    const docRef = doc(db, "Orders", orderID);
    getDoc(docRef).then((snapshot) => {
      const num = snapshot.data().count + 1;
      setCount(num);
    });
  }
  const onConfirmOrderPress = () => {
    if (cartItems.length === 0) {
      alert("Please add items to your cart.");
    } else {
      if (orderID === undefined) {
        navigation.navigate("Order History");

        const colRef = collection(db, "Orders");
        addDoc(colRef, {
          status: "Pending",
          address: postalCode,
          name: restaurant,
          image: restaurantImage,
          count: 1,
          deliveryFee: (deliveryFee / count).toFixed(2),
          // time:
        }).then((docRef) => {
          cartItems.forEach((obj) =>
            addDoc(collection(db, "Orders", docRef.id, userID), {
              Name: obj.Name,
              Price: obj.Price,
              quantity: obj.quantity,
              image: obj.image,
            })
          );
          updateDoc(doc(db, "Users", userID, "Orders", userID), {
            [docRef.id]: docRef,
          });
          dispatch({ type: "clearCart" });
          navigation.popToTop();
        });
        console.log("order confirmed");
      } else {
        navigation.navigate("Orders");
        cartItems.forEach((obj) =>
          addDoc(collection(db, "Orders", orderID, userID), {
            Name: obj.Name,
            Price: obj.Price,
            quantity: obj.quantity,
            image: obj.image,
          })
        );
        const docRef = doc(db, "Orders", orderID);
        updateDoc(doc(db, "Users", userID, "Orders", userID), {
          [orderID]: docRef,
        });
        getDoc(docRef).then((snapshot) => {
          const num = snapshot.data().count + 1;
          updateDoc(docRef, {
            count: num,
            deliveryFee: (deliveryFee / count).toFixed(2),
          });
        });
        dispatch({ type: "clearCart" });
        navigation.popToTop();
      }
    }
  };

  const itemArr = useSelector((store) => store[restaurant]);
  let cartItems;
  let totalCost;
  if (itemArr !== undefined) {
    cartItems = itemArr.filter((obj) => obj.quantity !== 0);
    totalCost = itemArr.reduce(
      (total, currObj) => total + currObj.Price * currObj.quantity,
      0
    );
  }

  return (
    <Screen>
      <View style={styles.headers}>
        <AppText style={styles.headersFont}>Address: {postalCode}</AppText>
        <AppText style={styles.headersFont}>Restaurant: {restaurant}</AppText>
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.Name}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => {
          return (
            <CartListItem
              title={item.Name}
              price={item.Price}
              quantity={item.quantity}
              image={{ uri: item.image }}
            />
          );
        }}
      />
      <View style={styles.priceContainer}>
        <AppText>No. of users in group order: {count}</AppText>
        <AppText>
          Subtotal: ${totalCost ? totalCost.toFixed(2) : totalCost}
        </AppText>
        <AppText>Delivery Fee: ${(deliveryFee / count).toFixed(2)}</AppText>
        <AppText>
          Total Price: ${(totalCost + deliveryFee / count).toFixed(2)}
        </AppText>
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
