import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "../screens/SignupScreen";
import Login from "../screens/LoginScreen";
import Verify from "../screens/VerifyScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
          animation: "fade",
          headerTintColor: "#25a2d5",
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          animation: "fade",
          headerTintColor: "#25a2d5",
        }}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{
          headerShown: false,
          animation: "fade",
          headerTintColor: "#25a2d5",
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
