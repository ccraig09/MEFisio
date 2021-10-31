import React, { Component, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
// import styles from '../../components/commonstyle'
import { Calendar } from "react-native-calendars";
import Colors from "../constants/Colors";

const BookingScreen = ({ navigation }) => {
  const [selected, setSelected] = useState();

  const onDayPress = (day) => {
    setSelected(day.dateString);
    navigation.navigate("Slot", { bookingDate: day });
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          onDayPress(day);
        }}
        style={styles.calendar}
        hideExtraDays
        markedDates={{ [selected]: { selected: true } }}
        theme={{
          selectedDayBackgroundColor: Colors.primary,
          todayTextColor: Colors.primary,
          arrowColor: Colors.primary,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: "#eee",
    height: 350,
  },
});
export default BookingScreen;
