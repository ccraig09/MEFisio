import React, { useState, useRef } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  StatusBar,
} from "react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from "../components/firebase";
import PhoneInput from "react-native-phone-number-input";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import * as Animatable from "react-native-animatable";

const Login = ({ navigation }) => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");

  const attemptInvisibleVerification = false;

  const sendVerification = () => {
    console.log(phoneNumber);
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then((verificationId) =>
        navigation.navigate("Verify", {
          verificationId: verificationId,
          cell: phoneNumber,
          login: true,
        })
      );
  };

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      style={styles.gradient}
    >
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
        <View style={styles.header}>
          <Text style={styles.text_header}>Bienvenido!</Text>
        </View>
        <Animatable.View animation="fadeInUpBig" style={styles.footer}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebase.app().options}
            attemptInvisibleVerification={attemptInvisibleVerification}
          />

          <Text style={styles.text_footer}>Teléfono</Text>
          <PhoneInput
            // ref={phoneInput}
            defaultValue={phoneNumber}
            defaultCode="BO"
            // onChangeText={(text) => {
            //   setPhoneNumber(text);
            // }}
            onChangeFormattedText={(text) => {
              setPhoneNumber(text);
            }}
            withDarkTheme
            withShadow
            autoFocus
            placeholder="Teléfono"
          />
          <TouchableOpacity
            onPress={sendVerification}
            disabled={!phoneNumber}
            style={[
              styles.signIn,
              {
                borderColor: Colors.primary,
                borderWidth: 1,
                marginTop: 15,
              },
            ]}
          >
            <Text style={[styles.textSign, { color: Colors.primary }]}>
              Enviar Código
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

export default Login;
const styles = StyleSheet.create({
  ////////
  gradient: {
    flex: 1,
  },
  activityContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    // backgroundColor: "#009387",
  },
  container: {
    flex: 1,
    // backgroundColor: "#009387",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 4,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    alignItems: "center",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
