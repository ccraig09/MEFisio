import React, { Component, useState, useContext, useEffect } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Animbutton from "../components/animbutton";
import firebase from "../components/firebase";
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../constants/Colors";
import { AuthContext } from "../navigation/AuthProvider";

const jsonData = {
  slots: {
    slot1: "9:00am a 9:00am",
    slot2: "10:00am a 11:00am",
    slot3: "11:00am a 12:00am",
    slot4: "15:00pm a 16:00pm",
    slot5: "17:00pm a 18:00pm",
    slot6: "18:00pm a 19:00pm",
    slot7: "19:00pm a 20:00pm",
  },
};

const SlotScreen = ({ route, navigation }) => {
  const { reserveSlot, user } = useContext(AuthContext);

  const [bookingDate, setBookingDate] = useState();
  const [bookingData, setBookingData] = useState([{}]);
  const [taken, setTaken] = useState({});
  const bookParam = route.params;

  useFocusEffect(
    React.useCallback(() => {
      const month = bookParam.bookingDate.month.toString();
      const date = bookParam.bookingDate.dateString;
      const year = bookParam.bookingDate.year.toString();

      const fetchSlots = async () => {
        try {
          const list = [];
          await firebase
            .firestore()
            .collection(`${month}_${year}`)
            .doc(date)
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("Document data:", doc.data());

                setTaken(Object.keys(doc.data().userDataJson));
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            });
        } catch (e) {
          console.log(e);
        }
      };

      fetchSlots();
      // const mappedSlots = Object.keys(taken.userDataJson);
      // console.log("slots token", mappedSlots);
    }, [])
  );

  const slotHandler = () => {
    console.log("we gogt data?", bookingData);
    Alert.alert(`Confirmar hora por ${bookingData.slots}`, "", [
      {
        text: "No",
        style: "default",
      },
      {
        text: "Si",
        style: "destructive",
        onPress: () => {
          reserveSlot(bookingData, bookParam, user);
        },
      },
    ]);
  };

  const slots = jsonData.slots;
  const slotsarr = Object.keys(slots).map(function (k) {
    return (
      <View key={k} style={{ margin: 5 }}>
        <Animbutton
          data={slots}
          slots={taken}
          countCheck={0}
          onColor={"green"}
          effect={"pulse"}
          _onPress={(status) =>
            setBookingData({ status: status, k: k, slots: slots[k] })
          }
          text={slots[k]}
        />
      </View>
    );
  });
  return (
    <View style={styles.container}>
      <Text>Tiempos disponible por {bookParam.bookingDate.dateString}</Text>
      {slotsarr}
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => {
          slotHandler();
        }}
      >
        <Text style={styles.panelButtonTitle}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    alignItems: "center",
    alignSelf: "center",
    marginVertical: 15,
    width: 200,
  },
  panelButtonTitle: {
    fontSize: 23,
    fontWeight: "bold",
    color: "white",
  },
});
export default SlotScreen;
