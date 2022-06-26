import React, { useState } from "react";
import { Text, FlatList } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";

import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
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
}); 

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
*/

function JoinGroupOrdersScreen(props) {
  // return <Text>hello</Text>;
  const navigation = useNavigation();
  const route = useRoute();
  const [orderListings, setOrderListings] = useState();
  const [filterListings, setFilterListings] = useState();
  const postalCode = route.params.postalCode;
  let unsubCol;
  const changeText = (newText) => {
    setFilterListings(
      orderListings.filter((obj) =>
        obj.name.toLowerCase().startsWith(newText.toLowerCase())
      )
    );
  };
  // useEffect(() => {
  //   return () => {
  //     unsubCol();
  //   };
  // }, []);
  const colRef = collection(db, "Orders");
  const q = query(colRef, where("status", "==", "Pending"));

  if (orderListings === undefined) {
    unsubCol = onSnapshot(q, (snapshot) => {
      const temp = [];
      snapshot.docs.forEach((doc) => {
        temp.push({ id: doc.id, ...doc.data() });
      });
      // setOrderListings(temp);

      // Filter by address
      const temp1 = temp.filter((obj) => obj.address === postalCode);
      setOrderListings(temp1);
      setFilterListings(temp1);
    });
    return <AppText>Loading</AppText>;
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
        data={filterListings}
        keyExtractor={(listing) => listing.id.toString()}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => {
          const onPress = () =>
            navigation.navigate("Menu", {
              postalCode: item.address,
              restaurant: item.name,
              orderID: item.id,
            });

          return (
            <ListItem
              title={item.name}
              subTitle={`Delivery Address: ${item.address}`}
<<<<<<< HEAD
              image={{ uri: item.image }}
=======
              image={item.image}
>>>>>>> 3428ce787551d2604913db73ecf78bdcaf7747db
              onPress={onPress}
            />
          );
        }}
      />
    </Screen>
  );
}

export default JoinGroupOrdersScreen;
