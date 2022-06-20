import React, { useState } from "react";
import Screen from "../components/Screen";
import { Text, FlatList } from "react-native";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ListItem from "../components/ListItem";
import { useNavigation, useRoute } from "@react-navigation/native";

const restaurant = [
  {
    id: 1,
    name: "McDonald's - Bedok Mall",
    image: require("../assets/McDonalds-logo.png"),
  },
  {
    id: 2,
    name: "KFC",
    image: require("../assets/KFC-logo.png"),
  },
  {
    id: 3,
    name: "WingStop",
    image: require("../assets/Wingstop-logo.png"),
  },
  {
    id: 4,
    name: "Subway",
    image: require("../assets/Subway-logo.png"),
  },
];

// maybe create new list item for restaurant then can change the search icon also
function RestaurantListingScreen(props) {
  const navigation = useNavigation();
  const route = useRoute();
  const postalCode = route.params.postalCode;

  return (
    <Screen>
      <AppText>Address: {postalCode}</AppText>
      <AppTextInput icon="map-search" placeholder="Search"></AppTextInput>

      <FlatList
        data={restaurant}
        keyExtractor={(listing) => listing.id.toString()}
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

export default RestaurantListingScreen;
