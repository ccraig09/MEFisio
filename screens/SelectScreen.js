import React, { Component, useState, useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Animbutton from "../components/animbutton";
import firebase from "../components/firebase";
import { Avatar } from "react-native-elements";
import Colors from "../constants/Colors";
import * as Animatable from "react-native-animatable";

const SelectScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 25,
          fontWeight: "bold",
          textAlign: "center",
          color: Colors.primary,
          marginBottom: 40,
        }}
      >
        Eligé Fisioterapeuta
      </Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: 50,
        }}
      >
        <View>
          <Avatar
            rounded
            size={150}
            source={require("../assets/Mayyra.png")}
            onPress={() => {
              navigation.navigate("booking", { helper: "Mayra" });
            }}
          />
          <Text style={styles.nameText}>Mayra</Text>
          <Text style={styles.nameText}>Em</Text>
        </View>
        <View>
          <Avatar
            rounded
            size={150}
            source={require("../assets/Emmm.png")}
            onPress={() => {
              navigation.navigate("booking", { helper: "Emma" });
            }}
          />
          <Text style={styles.nameText}>Emma</Text>
          <Text style={styles.nameText}>Em</Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: Colors.primary,
    // marginBottom: 40,
  },
});
export default SelectScreen;
