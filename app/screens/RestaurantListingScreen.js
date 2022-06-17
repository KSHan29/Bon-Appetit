import React from "react";
import Screen from "../components/Screen";

function RestaurantListingScreen({ route }) {
  return (
    <Screen>
      <Text>Address: {route.params.postalCode}</Text>
    </Screen>
  );
}

export default RestaurantListingScreen;
