import React, { useState, useCallback, useEffect, useContext } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";

export default function HomeScreen() {
  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView style={styles.container}>
      <Text>este es para Mayra Fisio</Text>
    </SafeAreaView>
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
