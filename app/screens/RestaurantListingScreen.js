import React, { useState } from "react";
import Screen from "../components/Screen";
import { FlatList } from "react-native";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

// const restaurant = [
//   {
//     id: 1,
//     name: "McDonald's - Bedok Mall",
//     image: require("../assets/McDonalds-logo.png"),
//   },
//   {
//     id: 2,
//     name: "KFC",
//     image: require("../assets/KFC-logo.png"),
//   },
//   {
//     id: 3,
//     name: "WingStop",
//     image: require("../assets/Wingstop-logo.png"),
//   },
//   {
//     id: 4,
//     name: "Subway",
//     image: require("../assets/Subway-logo.png"),
//   },
// ];

// maybe create new list item for restaurant then can change the search icon also
function RestaurantListingScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const [restaurantListing, setRestaurantListing] = useState();
  const postalCode = route.params.postalCode;
  const orderID = undefined;
  const changeText = (newText) => {
    console.log("test");
  };

  const colRef = collection(db, "Restaurants");
  if (restaurantListing === undefined) {
    onSnapshot(colRef, (snapshot) => {
      let restaurants = [];
      snapshot.docs.forEach((doc) => {
        restaurants.push({ ...doc.data(), id: doc.id });
      });
      setRestaurantListing(restaurants);
    });
  }

  return (
    <Screen>
      <AppText>Address: {postalCode}</AppText>
      <AppTextInput
        icon="map-search"
        placeholder="Search Restaurant"
        onChangeText={changeText}
      ></AppTextInput>

      <FlatList
        data={restaurantListing}
        keyExtractor={(listing) => listing.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => {
          const onPress = () =>
            navigation.navigate("Menu", {
              postalCode,
              restaurant: item.Name,
              restaurantImage: item.image,
              orderID,
            });
          return (
            <ListItem
              title={item.Name}
              image={{
                uri: item.image,
              }}
              onPress={onPress}
            />
          );
        }}
      />
    </Screen>
  );
}

export default RestaurantListingScreen;
