import React, { useState, useRef, useContext } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
  StatusBar,
} from "react-native";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import firebase from "../components/firebase";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import * as Animatable from "react-native-animatable";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { AuthContext } from "../navigation/AuthProvider";

const VerifyScreen = ({ route }) => {
  const { phoneRegister, phoneLogin } = useContext(AuthContext);

  const { verificationId, fName, lName, age, cell, login } = route.params;
  const recaptchaVerifier = useRef(null);
  const [verificationCode, setVerificationCode] = useState();

  const attemptInvisibleVerification = false;

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      verificationCode
    );
    if (login) {
      phoneLogin(credential);
    } else {
      phoneRegister(credential, fName, lName, age, cell);
    }
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

          <Text style={[styles.text_footer, { marginTop: 35 }]}>
            Código de Verificación
          </Text>
          <OTPInputView
            style={{ width: "80%", height: 200 }}
            pinCount={6}
            editable={!!verificationId}
            // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={(code) => setVerificationCode(code)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={(code) => {
              // setVerificationCode(code);
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />
          {/* <TextInput
            style={{ marginVertical: 10, fontSize: 17 }}
            editable={!!verificationId}
            placeholder="123456"
            onChangeText={setVerificationCode}
          /> */}
          <TouchableOpacity
            onPress={confirmCode}
            disabled={!verificationId}
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
              Confirmar Código
            </Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

export default VerifyScreen;
const styles = StyleSheet.create({
  logo: {
    height: 200,
    width: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  text: {
    fontFamily: "Kufam-SemiBoldItalic",
    fontSize: 28,
    marginBottom: 10,
    color: "#051d5f",
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 15,
    alignSelf: "center",
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#2e64e5",
    fontFamily: "Lato-Regular",
  },

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
