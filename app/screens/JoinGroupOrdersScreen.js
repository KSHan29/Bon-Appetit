import React from "react";
import { Text, FlatList } from "react-native";

import Screen from "../components/Screen";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../components/firebase/firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";

/* const colRef = collection(db, "Current Orders");
let snapshot = await db
  .collection("current Orders")
  .doc("15fwTj5O8GaSkZuJPQWW")
  .collection("User")
  .get();

snapshot.forEach((doc) => {
  console.log(doc.data());
}); */

/* getDocs(colRef).then((snapshot) => {
  let orders = [];
  snapshot.docs.forEach((doc) => {
    orders.push({ ...doc.data(), id: doc.id });
  });
  console.log(orders);
}); */

const restaurant = [
  {
    id: 1,
    name: "McDonald's - Bedok Mall",
    image: require("../assets/McDonalds-logo.png"),
  },
  {
    id: 2,
    name: "KFC",
    image: require("../assets/McDonalds-logo.png"),
  },
  {
    id: 3,
    name: "Burger King",
    image: require("../assets/McDonalds-logo.png"),
  },
];

const orders = [
  {
    id: 1,
    postalCode: 123456,
    name: "McDonald's - Bedok Mall",
    image: require("../assets/McDonalds-logo.png"),
  },
];
function JoinGroupOrdersScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const postalCode = route.params.postalCode;
  return (
    <Screen>
      <AppText>Address: {postalCode}</AppText>

      <AppTextInput icon="map-search" placeholder="Search"></AppTextInput>

      <FlatList
        data={orders}
        keyExtractor={(listing) => listing.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => {
          const onPress = () =>
            navigation.navigate("Menu", { postalCode, restaurant: item.name });
          return (
            <ListItem title={item.name} image={item.image} onPress={onPress} />
          );
        }}
      />
    </Screen>
  );
}

export default JoinGroupOrdersScreen;
