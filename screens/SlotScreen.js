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
import * as Notifications from "expo-notifications";
import Toast from "react-native-tiny-toast";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
    };
  },
});

// const jsonData = {
//   slots: {
//     slot1: "9:00am a 10:00am",
//     slot2: "10:00am a 11:00am",
//     slot3: "11:00am a 12:00pm",
//     slot4: "15:00pm a 16:00pm",
//     slot5: "17:00pm a 18:00pm",
//     slot6: "18:00pm a 19:00pm",
//     slot7: "19:00pm a 20:00pm",
//   },
// };

let slots = [
  {
    slot: "9:00am - 10:00am",
    startTime: "09:00:00",
    endTime: "10:00:00",
    isReserved: false,
    order: 1,
  },
  {
    slot: "10:00am - 11:00am",
    startTime: "10:00:00",
    endTime: "11:00:00",
    isReserved: false,
    order: 2,
  },
  {
    slot: "11:00am - 12:00pm",
    startTime: "11:00:00",
    endTime: "12:00:00",
    isReserved: false,
    order: 3,
  },
  ,
  {
    slot: "15:00pm - 16:00pm",
    startTime: "15:00:00",
    endTime: "16:00:00",
    isReserved: false,
    order: 4,
  },
  {
    slot: "17:00pm - 18:00pm",
    startTime: "17:00:00",
    endTime: "18:00:00",
    isReserved: false,
    order: 5,
  },
  {
    slot: "18:00pm - 19:00pm",
    startTime: "18:00:00",
    endTime: "19:00:00",
    isReserved: false,
    order: 6,
  },
  {
    slot: "19:00pm - 20:00pm",
    startTime: "19:00:00",
    endTime: "20:00:00",
    isReserved: false,
    order: 7,
  },
];

const SlotScreen = ({ route, navigation }) => {
  const { reserveSlot, user, sendNotification, createNotification } =
    useContext(AuthContext);

  const [isLoading, setIsLoading] = useState();
  const [bookingDate, setBookingDate] = useState();
  const [bookingData, setBookingData] = useState([{}]);
  const [taken, setTaken] = useState([]);
  const bookParam = route.params;
  const helper = route.params.helper;
  const userInfo = route.params.userInfo;
  const type = route.params.type;

  useFocusEffect(
    React.useCallback(() => {
      setIsLoading(true);
      const month = bookParam.bookingDate.month.toString();
      const date = bookParam.bookingDate.dateString;
      const year = bookParam.bookingDate.year.toString();

      const fetchSlots = async () => {
        try {
          const list = [];
          await firebase
            .firestore()
            .collection(`${helper.helper}`)
            .doc(date)
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log(
                  "Document data:",
                  Object.keys(doc.data().userDataJson)
                );
                const result = slots.map((o) => ({
                  ...o,
                  isReserved:
                    o.isReserved ||
                    Object.keys(doc.data().userDataJson).some(
                      (slot) => slot === o.slot
                    ),
                }));

                // console.log("these are the matches", result);

                setTaken(result);
              } else {
                setTaken(slots);
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            })
            .then(setIsLoading(false));
        } catch (e) {
          console.log(e);
        }
      };

      fetchSlots();
    }, [])
  );

  const slotHandler = () => {
    console.log("we gogt user data? data?", userInfo);
    Alert.alert(`Confirmar hora`, `${bookingData.slots} servicio de ${type}?`, [
      {
        text: "No",
        style: "destructive",
      },
      {
        text: "Si",
        style: "default",
        onPress: () => {
          confirmHandler(bookingData, bookParam, user, slots, helper.helper);
        },
      },
    ]);
  };

  const confirmHandler = async (
    bookingData,
    bookParam,
    user,
    slots,
    helper
  ) => {
    const toast = Toast.showLoading("Realizando Reservacion");

    // console.log("noti data", user, bookParam, slots);
    await reserveSlot(bookingData, bookParam, user, slots, helper);
    await sendNotification(userInfo, bookingData, bookParam, helper, type);
    await createNotification(userInfo, bookingData, bookParam, helper, type);
    triggerNotificationHandler(bookingData, bookParam);
    Toast.hide(toast);

    navigation.navigate("Review");
  };
  const triggerNotificationHandler = (bookingData, bookParam) => {
    // const coaches = coachList.map((code) => code.expoPushToken);
    // console.log("cheses", coaches);

    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: ["ExponentPushToken[ZBOucGIEvzCfrFdeUalJAf]"],
        sound: "default",
        data: { extraData: userInfo },
        title: `${userInfo.FirstName} ${userInfo.LastName} quisiera reservar!`,
        body: `${userInfo.FirstName} quisiera reservar en el horario de ${bookingData.k.slot} en la fecha de ${bookParam.bookingDate.dateString} para ${type}.`,
      }),
    });
  };

  const slotsarr = taken.map((k, index) => {
    // console.log("this k", k.isReserved);
    return (
      <View key={index} style={{ margin: 5 }}>
        <Animbutton
          data={slots}
          taken={k.isReserved}
          countCheck={0}
          onColor={"green"}
          effect={"pulse"}
          _onPress={(status) =>
            setBookingData({
              status: status,
              k: k,
              slots: k.slot,
              isReserved: k.isReserved,
              startTime: k.startTime,
              endTime: k.endTime,
            })
          }
          text={k.slot}
        />
      </View>
    );
  });
  // console.log("these them slots", slots);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tiempos disponible por {helper.helper} </Text>
      <Text style={styles.date}>{bookParam.bookingDate.dateString}</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  date: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
    color: Colors.primary,
  },
});
export default SlotScreen;
