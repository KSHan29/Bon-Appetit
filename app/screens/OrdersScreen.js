import React, { useEffect, useState } from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { onSnapshot, doc, getDoc } from "firebase/firestore";

import Screen from "../components/Screen";
import { auth, db } from "../components/firebase/firebase";
import AppText from "../components/AppText";
import ListItemSeparator from "../components/ListItemSeparator";
import ListItem from "../components/ListItem";
import OnGoingOrdersListItem from "../components/OnGoingOrdersListItem";

function OrdersScreen(props) {
  const userID = auth.currentUser.uid;
  const [ordersArr, setOrdersArr] = useState();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    setOrdersArr(undefined);
  }, [isFocused]);

  const onPress = () => {
    console.log("GoToOrderSummary");
  };

  const docRef = doc(db, "Users", userID, "Orders", userID);
  if (ordersArr === undefined) {
    let temp = [];
    getDoc(docRef)
      .then((docs) => {
        const ordersObj = docs.data();
        const orderRefArr = Object.values(ordersObj);
        const forLoop = async () => {
          for (const orderPath of orderRefArr) {
            const orderDoc = await getDoc(orderPath);
            temp.push({ ...orderDoc.data(), orderID: orderDoc.id });
          }
          //console.log(temp);
          setOrdersArr(temp);
        };
        forLoop();
      })
      .catch((err) => {
        console.log(err.message);
      });
    return <Screen>{/* <AppText>Loading</AppText> */}</Screen>;
  }
  // onSnapshot(docRef, (docs) => {
  //   const ordersObj = docs.data();
  //   const orderRefArr = Object.values(ordersObj);
  //   orderRefArr.forEach((orderPath) => {
  //     onSnapshot(orderPath, (orderDoc) => {
  //       temp.push({ ...orderDoc.data(), orderID: orderDoc.id });
  //     });
  //   });
  // });
  // console.log("test2");

  return (
    <Screen>
      <View style={styles.headers}>
        <AppText>Ongoing</AppText>
      </View>
      <FlatList
        data={ordersArr}
        keyExtractor={(item) => item.orderID}
        ItemSeparatorComponent={ListItemSeparator}
        renderItem={({ item }) => {
          return (
            <OnGoingOrdersListItem
              image={item.image}
              restaurant={item.name}
              postalCode={item.address}
              status={item.status}
              orderID={item.orderID}
              onPress={onPress}
            />
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  headers: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
