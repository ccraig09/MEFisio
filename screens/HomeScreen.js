import React, { useState, useCallback, useEffect, useContext } from "react";
import { StyleSheet, FlatList, Button, View } from "react-native";
import CategoryItem from "../components/CategoryItem";

export default function HomeScreen({ navigation }) {
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
      <Button
        title=" go to pdf"
        onPress={() => {
          navigation.navigate("Pdf");
        }}
      />
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
});
