import React, { useContext, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { signOut } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

import Screen from "../components/Screen";
import { auth } from "../components/firebase/firebase";
import AppText from "../components/AppText";
import authStorage from "../auth/storage";
import AuthContext from "../auth/context";
import colors from "../config/colors";
import ListItem from "../components/ListItem";
import Icon from "../components/Icon";
import ListItemSeparator from "../components/ListItemSeparator";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../components/firebase/firebase";
import LoadingScreen from "./LoadingScreen";

function AccountScreen(props) {
  const { user, setUser } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState();
  const navigation = useNavigation();
  const userID = auth.currentUser.uid;
  const handleLogOut = () => {
    setUser(null);
    authStorage.removeToken();
  };
  const handleSignOut = () => {
    console.log("test");
    signOut(auth)
      .then(() => {
        handleLogOut();
        console.log("signedout");
      })
      .catch((error) => alert(error.message));
  };

  if (userInfo === undefined) {
    const docRef = doc(db, "Users", userID);

    getDoc(docRef).then((doc) => {
      setUserInfo(doc.data());
    });
    return <LoadingScreen />;
  }

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require("../assets/logo.jpeg")} />
        </View>
        <ListItemSeparator />
        <ListItem
          title={"Name: " + userInfo.Name}
          subTitle={"Email: " + userInfo.Email}
          phoneNumber={"Contact: " + userInfo.Phone}
        />
      </View>
      <ListItemSeparator />
      <TouchableOpacity onPress={() => console.log("Change User Info")}>
        <View style={styles.logOutContainer}>
          <View style={styles.iconContainer}>
            <Icon name="account-check" backgroundColor={colors.secondary} />
          </View>
          <AppText style={styles.logOut}>Change User Info</AppText>
        </View>
      </TouchableOpacity>
      <ListItemSeparator />
      <TouchableOpacity onPress={() => console.log("Change Password")}>
        <View style={styles.logOutContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name="shield-lock-open-outline"
              backgroundColor={colors.medium}
            />
          </View>
          <AppText style={styles.logOut}>Change Password</AppText>
        </View>
      </TouchableOpacity>
      <ListItemSeparator />
      <TouchableOpacity onPress={handleSignOut}>
        <View style={styles.logOutContainer}>
          <View style={styles.iconContainer}>
            <Icon name="logout" backgroundColor={colors.primary} />
          </View>
          <AppText style={styles.logOut}>Log Out</AppText>
        </View>
      </TouchableOpacity>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 30,
  },
  iconContainer: {
    paddingRight: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 5,
  },
  imageContainer: {
    alignItems: "center",
  },
  logOutContainer: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  logOut: {
    fontWeight: "500",
  },
});

export default AccountScreen;
