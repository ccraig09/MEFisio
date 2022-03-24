import React, { useState, useCallback, useEffect, useContext } from "react";
import { StyleSheet, FlatList, Button, View, Text } from "react-native";
import CategoryItem from "../components/CategoryItem";
import { useFocusEffect } from "@react-navigation/native";
import firebase from "../components/firebase";
import Colors from "../constants/Colors";
import { AuthContext } from "../navigation/AuthProvider";

const currentHour = new Date().getHours();

const greetingMessage =
  currentHour >= 4 && currentHour < 12 // after 4:00AM and before 12:00PM
    ? "Buenos Días"
    : currentHour >= 12 && currentHour <= 17 // after 12:00PM and before 6:00pm
    ? "Buenas Tardes"
    : currentHour > 17 || currentHour < 4 // after 5:59pm or before 4:00AM (to accommodate night owls)
    ? "Buenas Noches" // if for some reason the calculation didn't work
    : "Bienvenido";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      // registerForPushNotificationsAsync().then((token) => {
      //   setExpoPushToken(token);
      //   addToken(token);
      // });
      // console.log("loading home and user", user);
      const fetchMemberDetails = async () => {
        try {
          const list = [];
          await firebase
            .firestore()
            .collection("Members")
            .doc(user.uid)
            .get()
            .then((doc) => {
              if (doc.exists) {
                console.log("Document data:", doc.data());
                setUserInfo(doc.data());
              } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
              }
            });
        } catch (e) {
          console.log(e);
        }
      };

      fetchMemberDetails();
    }, [])
  );

  const data = [
    {
      key: "1",
      Subtitle: "Consulta General",
      Image: require("../assets/consult.png"),
      info: ["go go", "toto", "lala"],
    },
    {
      key: "2",
      Subtitle: "Valoraciones Funcionales",
      Image: require("../assets/Valor.png"),
      info: ["Goniometria", "Examen", "Postural"],
    },
    {
      key: "3",
      Subtitle: "Fisioterapia Neuro",
      subDetail: "Muscolo Esquelético",
      Image: require("../assets/Neuro.png"),
    },
    {
      key: "4",
      Subtitle: "Fisioterapia traumatologica",
      subDetail: "Deportivo",
      Image: require("../assets/Trauma.png"),
    },
    {
      key: "5",
      Subtitle: "Alteraciones postorales",
      subDetail: "desequilibrios musculares",
      Image: require("../assets/postoral.png"),
    },
    { key: "6", Subtitle: "Masajes", Image: require("../assets/masaje.png") },
    {
      key: "7",
      Subtitle: "Maderoterapia",
      Image: require("../assets/Mader.png"),
    },
    {
      key: "8",
      Subtitle: "Acondicionamiento fisico",
      Image: require("../assets/fisico.png"),
    },
  ];

  return (
    <View>
      <View style={styles.displayName}>
        <Text style={styles.subtitle}>{greetingMessage}, </Text>
        <Text style={styles.hello}>{userInfo.FirstName} </Text>
      </View>
      {/* <Button
        title=" go to pdf"
        onPress={() => {
          navigation.navigate("Pdf");
        }}
      /> */}
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={(itemData) => (
          <CategoryItem
            image={itemData.item.Image}
            title={itemData.item.Title}
            logo={itemData.item.logo}
            caption={itemData.item.Caption}
            info={itemData.item.info}
            subtitle={itemData.item.Subtitle}
            subDetail={itemData.item.subDetail}
            difficulty={itemData.item.Difficulty}
            time={itemData.item.Time}
            description={itemData.item.description}
            onClassClick={() => {
              navigation.navigate("Details", {
                service: itemData.item,
                type: itemData.item.Subtitle,
                userInfo: userInfo,

                // classes: data,
              });
            }}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f3f5",
    alignItems: "center",
    justifyContent: "center",
  },
  displayName: {
    marginTop: 50,
    padding: 10,
    marginBottom: 25,
    alignItems: "flex-start",
    // marginTop: 20,
    marginLeft: 10,
    width: "45%",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
  hello: {
    flexWrap: "wrap",
    fontWeight: "bold",
    color: Colors.primary,
    fontSize: 20,
  },
});
