import React, { useState } from "react";
import Screen from "../components/Screen";
import { FlatList, StyleSheet, View } from "react-native";

import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

// maybe create new list item for restaurant then can change the search icon also
function RestaurantListingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [restaurantListing, setRestaurantListing] = useState();
  const [filterListings, setFilterListings] = useState();
  const postalCode = route.params.postalCode;
  const orderID = undefined;
  const changeText = (newText) => {
    setFilterListings(
      restaurantListing.filter((obj) =>
        obj.Name.toLowerCase().startsWith(newText.toLowerCase())
      )
    );
  };

  const colRef = query(collection(db, "Restaurants"), orderBy("Name"));
  if (restaurantListing === undefined) {
    onSnapshot(colRef, (snapshot) => {
      let restaurants = [];
      snapshot.docs.forEach((doc) => {
        restaurants.push({ ...doc.data(), id: doc.id });
      });
      setRestaurantListing(restaurants);
      setFilterListings(restaurants);
    });
  }

  return (
    <Screen>
      <View style={styles.headers}>
        <AppText style={styles.headersFont}>Address: {postalCode}</AppText>
      </View>
      <AppTextInput
        icon="map-search"
        placeholder="Search Restaurant"
        onChangeText={changeText}
      ></AppTextInput>

      <FlatList
        data={filterListings}
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

const styles = StyleSheet.create({
  headersFont: {
    fontSize: 20,
    fontWeight: "500",
  },
  headers: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RestaurantListingScreen;
