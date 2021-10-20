import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/HomeScreen";
// import Login from '../src/screens/login';
// import Signup from '../src/screens/signup';
// import Preguntas from '../src/screens/preguntas';
// import Wheels from '../src/screens/wheels';

const Stack = createNativeStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: true,
          animation: "fade",
          title: "Servicios",
          headerTintColor: "#25a2d5",
        }}
      />
      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false, animation: 'fade'}}
      />
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
