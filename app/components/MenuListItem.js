import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppText from "./AppText";
import colors from "../config/colors";
import { addDoc, collection, updateDoc, getDoc, doc } from "firebase/firestore";
import { auth } from "./firebase/firebase";
import { db } from "./firebase/firebase";
function MenuListItem({ title, subTitle, price, item }) {
  const [orderCount, setOrderCount] = useState(0);
  const [menuItemID, setMenuItemID] = useState();
  const userID = auth.currentUser.uid;

  const onAddPress = () => {
    setOrderCount(orderCount + 1);
  };

  const onMinusPress = () => {
    if (orderCount > 0) {
      setOrderCount(orderCount - 1);
    }
  };

  // add items chosen to cart (stored in firestore)
  const onBasketPress = () => {
    const colRef = collection(db, "Users", userID, "Cart");
    if (orderCount === 0) {
      alert("Please set quantity to at least 1.");
    } else {
      // first time adding the item
      if (menuItemID === undefined) {
        addDoc(colRef, {
          ...item,
          quantity: orderCount,
        })
          .then((doc) => {
            setOrderCount(0);
            setMenuItemID(doc.id);
            alert("Added to cart.");
          })
          .catch((err) => console.log(err.message));
      } else {
        // item added before, update quantity
        const docRef = doc(db, "Users", userID, "Cart", menuItemID);
        getDoc(docRef)
          .then((doc) => {
            const qty = doc.data().quantity + orderCount;
            updateDoc(docRef, {
              quantity: qty,
            })
              .then(() => {
                setOrderCount(0);
                alert("Added to cart.");
              })
              .catch((err) => console.log(err.message));
          })
          .catch((err) => console.log(err.message));
      }
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
        <TouchableHighlight underlayColor={"#45b6ae"} onPress={onBasketPress}>
          <MaterialCommunityIcons name="basket" size={25} />
        </TouchableHighlight>
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
