import React, { useState } from "react";
import { Text, FlatList, StyleSheet, View } from "react-native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useNavigation, useRoute } from "@react-navigation/native";

import Screen from "../components/Screen";
import { db } from "../components/firebase/firebase";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ListItemSeparator";

function JoinGroupOrdersScreen(props) {
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
              postalCode: item.address,
              restaurant: item.name,
              orderID: item.id,
            });

          return (
            <ListItem
              title={item.name}
              subTitle={`Delivery Address: ${item.address}`}
              image={{ uri: item.image }}
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

export default JoinGroupOrdersScreen;
