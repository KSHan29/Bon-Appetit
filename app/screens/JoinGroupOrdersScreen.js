import React, { useState } from "react";
import { Text, FlatList } from "react-native";
import { collection, onSnapshot } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";

import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ListItem from "../components/ListItem";

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
  // return <Text>hello</Text>;
  const navigation = useNavigation();
  const route = useRoute();
  const [orderListings, setOrderListings] = useState();
  const postalCode = route.params.postalCode;
  let unsubCol;
  // useEffect(() => {
  //   return () => {
  //     unsubCol();
  //   };
  // }, []);
  const colRef = collection(db, "Current Orders");

  if (orderListings === undefined) {
    unsubCol = onSnapshot(colRef, (snapshot) => {
      const temp = [];
      snapshot.docs.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });
      setOrderListings(temp);
    });
    return <AppText>Loading</AppText>;
  }

  return (
    <Screen>
      <AppText>Address: {postalCode}</AppText>

      <AppTextInput icon="map-search" placeholder="Search"></AppTextInput>

      <FlatList
        data={orderListings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => {
          const onPress = () =>
            navigation.navigate("Menu", {
              postalCode: item.Destination,
              restaurant: item.Name,
            });

          return (
            <ListItem
              title={item.Name}
              subTitle={`Delivery Address: ${item.Destination}`}
              image
              onPress={onPress}
            />
          );
        }}
      />
    </Screen>
  );
}

export default JoinGroupOrdersScreen;
