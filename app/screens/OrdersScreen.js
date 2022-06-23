import React from "react";
import { Text } from "react-native";

import Screen from "../components/Screen";
import { collection } from "firebase/firestore";
import { db } from "../components/firebase/firebase";

//const colRef = collection(db, "");

function OrdersScreen(props) {
  return (
    <Screen>
      <Text>Ongoing</Text>
    </Screen>
  );
}

export default OrdersScreen;
