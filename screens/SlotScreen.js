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
const jsonData = {
  slots: {
    slot1: "9:00am a 9:00am",
    slot2: "10:00am a 10:00am",
    slot3: "11:00am a 12:00am",
    slot4: "15:00am a 16:00am",
    slot5: "17:00am a 18:00am",
    slot6: "18:00am a 19:00pm",
    slot7: "19:00am a 20:00pm",
  },
};

const SlotScreen = ({ route, navigation }) => {
  const [bookingDate, setBookingDate] = useState();
  const bookParam = route.params;

  // useEffect(() => {
  //   setBookingDate(bookParam);
  //   // console.log("try this", bookingDate.bookingDate.dateString);
  // }, []);

  const bookSlot = (status, key, value) => {
    const month = bookingDate.bookingDate.month;
    const date = bookingDate.bookingDate.day;
    console.log(month, date, status, key, value);
  };
  const slots = jsonData.slots;
  const slotsarr = Object.keys(slots).map(function (k) {
    return (
      <View key={k} style={{ margin: 5 }}>
        <Animbutton
          countCheck={0}
          onColor={"green"}
          effect={"pulse"}
          _onPress={(status) => bookSlot(status, k, slots[k])}
          text={slots[k]}
        />
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <Text>Tiempos disponible por {bookParam.bookingDate.dateString}</Text>
      {slotsarr}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SlotScreen;
