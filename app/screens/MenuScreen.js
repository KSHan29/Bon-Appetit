import { useRoute } from "@react-navigation/native";
import React from "react";

import AppText from "../components/AppText";
import Screen from "../components/Screen";

function MenuScreen(props) {
  const route = useRoute();

  return (
    <Screen>
      <AppText>Address: {route.params.postalCode}</AppText>
      <AppText>Restaurant: {route.params.restaurant}</AppText>
    </Screen>
  );
}

export default MenuScreen;
