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
    slot4: "10:00am a 11:00am",
    slot5: "11:00am a 11:00am",
    slot6: "11:00am a 12:00pm",
  },
};

const SlotScreen = ({ route, navigation }) => {
  const [bookingDate, setBookingDate] = useState();

  useEffect(() => {
    const bookParam = route.params;
    setBookingDate(bookParam);
  }, []);

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
  return <View style={styles.container}>{slotsarr}</View>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default SlotScreen;
