import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeScreen";
import Details from "../screens/DetailsScreen";
import Pdf from "../screens/PdfScreen";
import Booking from "../screens/BookingScreen";
import Slot from "../screens/SlotScreen";
import Select from "../screens/SelectScreen";
// import Signup from '../src/screens/signup';
// import Preguntas from '../src/screens/preguntas';
// import Wheels from '../src/screens/wheels';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          animation: "fade",
          title: "Servicios",
          headerTintColor: "#25a2d5",
        }}
      />

      <Stack.Screen
        name="Details"
        component={Details}
        options={{ headerShown: true, animation: "fade" }}
      />
      <Stack.Screen
        name="Select"
        component={Select}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Pdf"
        component={Pdf}
        options={{ headerShown: true, animation: "fade" }}
      />
      <Stack.Screen
        name="booking"
        component={Booking}
        options={{
          headerShown: true,
          animation: "fade",
          title: "Fecha",
          headerTintColor: "#5B91A6",
        }}
      />
      <Stack.Screen
        name="Slot"
        component={Slot}
        options={{ headerShown: true, animation: "fade" }}
      />
      {/* 
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Wheels" component={Wheels} />
      <Stack.Screen name="Preguntas" component={Preguntas} /> */}
    </Stack.Navigator>
  );
};
export default AppStack;
