import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import { FlatList } from "react-native";
import ListItem from "../components/ListItem";

function MenuScreen(props) {
  const route = useRoute();
  const [menuItems, setMenuItems] = useState();
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
      <AppText>Address: {postalCode}</AppText>
      <AppText>Restaurant: {restaurant}</AppText>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          return <ListItem title={item.Name} />;
        }}
      />
    </Screen>
  );
}

export default MenuScreen;
