import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import MenuListItem from "../components/MenuListItem";
import AppButton from "../components/AppButton";
import ListItemSeparator from "../components/ListItemSeparator";
import colors from "../config/colors";
import AppTextInput from "../components/AppTextInput";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

function TestingScreen(props) {
  const [cartItems, setCartItems] = useState();
  const postalCode = 123456;
  const Address = 123456;
  const restaurant = "KFC";

  const [menuItems, setMenuItems] = useState();
  const [docID, setDocID] = useState();
  const [idSet, setIdSet] = useState();

  /*   // adding items
  if (docID === undefined) {
    const colRef = collection(db, "Testing");
    const docRef = addDoc(colRef, {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    })
      .then((doc) => {
        setDocID(doc.id);
      })
      .catch((err) => console.log(err.message));
  }

  // getting items
  if (menuItems === undefined) {
    const colRef = collection(db, "Testing");
    getDocs(colRef)
      .then((snapshot) => {
        let temp = [];
        snapshot.docs.forEach((doc) => {
          temp.push({ ...doc.data(), id: doc.id });
        });
        setMenuItems(temp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  console.log();
  console.log("Testing");
  console.log("Menu Items outside: ");
  console.log(menuItems);
  console.log("Doc ID outside: ");
  console.log(docID); */

  // USE EFFECT

  /* // onSnapshot
  console.log("Testing");
  if (true) {
    const colRef = collection(db, "Testing");

    onSnapshot(colRef, (snapshot) => {
      let temp = [];
      snapshot.docs.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      console.log(temp);
    });
  }

  // queries
  if (true) {
    const colRef = collection(db, "Restaurants");
    const q = query(colRef, where("Name", "==", "KFC"));
    onSnapshot(q, (snapshot) => {
      let temp = [];
      snapshot.docs.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      console.log(temp);
    });
  } */
  const colRef = collection(db, "Restaurants", "8dtKhcOGRFXArDRtVcPz", "Menu");
  onSnapshot(colRef, (snapshot) => {
    let temp = [];
    snapshot.docs.forEach((doc) => {
      temp.push({ ...doc.data(), id: doc.id });
    });
    console.log(temp);
  });

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
          return <MenuListItem title={item.Name} price={item.Price} />;
        }}
      />
      <View>
        {/*     <AppTextInput
          name="name"
          placeholder="Name"
          onChangeText={(text) => setName(text)}
        />
        <AppTextInput
          name="age"
          placeholder="Age"
          onChangeText={(text) => setAge(text)}
        />
        <AppTextInput
          name="currLoc"
          placeholder="CurrLoc"
          onChangeText={(text) => setCurrLoc(text)}
        />
        <AppButton title="submit" onPress={handleSubmit}></AppButton> */}
        <TouchableOpacity
          style={styles.cartButton}
          underlayColor={colors.black}
          onPress={() => console.log("view cart")}
        >
          <AppText>View Cart</AppText>
          <View style={styles.cartIcon}>
            <MaterialCommunityIcons name="cart-check" size={25} />
          </View>
          {
            //<AppText>Items</AppText>
          }
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

export default TestingScreen;
