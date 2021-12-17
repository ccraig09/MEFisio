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
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import firebase from "../components/firebase";
import PhoneInput from "react-native-phone-number-input";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "../constants/Colors";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

const SignUp = ({ navigation }) => {
  const recaptchaVerifier = useRef(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();
  const [fName, setFName] = useState();
  const [lName, setLName] = useState();
  const [age, setAge] = useState();
  const [isValidName, setIsValidName] = useState(true);

  // const phoneInput = useRef < PhoneInput > null;

  // const [message, showMessage] = React.useState(
  //   !firebaseConfig || Platform.OS === "web"
  //     ? {
  //         text: "To get started, provide a valid firebase config in App.js and open this snack on an iOS or Android device.",
  //       }
  //     : undefined
  // );
  const attemptInvisibleVerification = false;

  const handleNameChange = (val) => {
    if (val.trim().length >= 2) {
      setFName(val);
      setIsValidName(true);
    } else {
      setFName(val);
      setIsValidName(false);
    }
  };

  const handleValidName = (val) => {
    if (val.trim().length >= 2) {
      setIsValidName(true);
    } else {
      setIsValidName(false);
    }
  };

  const sendVerification = () => {
    if (isValidName === false) {
      Alert.alert("Incompleto!", "Por favor revise los datos");
    } else {
      console.log(phoneNumber);
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      phoneProvider
        .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
        .then((verificationId) =>
          navigation.navigate("Verify", {
            verificationId: verificationId,
            fName: fName,
            lName: lName,
            age: age,
            cell: phoneNumber,
          })
        );
    }
  };

  // const confirmCode = () => {
  //   const credential = firebase.auth.PhoneAuthProvider.credential(
  //     verificationId,
  //     verificationCode
  //   );
  //   firebase
  //     .auth()
  //     .signInWithCredential(credential)
  //     .then((result) => {
  //       // Do something with the results here
  //       console.log(result);
  //     });
  // };

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
          <Text style={styles.text_footer}>Nombre</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={"#05375a"} size={20} />
            <TextInput
              placeholder="Tu nombre"
              placeholderTextColor="#666666"
              style={styles.textInput}
              value={fName}
              onChangeText={(val) => handleNameChange(val)}
              autoCorrect={false}
              autoCapitalize="words"
              onEndEditing={(e) => handleValidName(e.nativeEvent.text)}
            />
          </View>
          {isValidName ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Por Favor usar un nombre valido
              </Text>
            </Animatable.View>
          )}
          <Text style={[styles.text_footer, { marginTop: 25 }]}>Apellido</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color={"#05375a"} size={20} />
            <TextInput
              placeholder="Tu Apellido"
              placeholderTextColor="#666666"
              style={styles.textInput}
              value={lName}
              onChangeText={(val) => setLName(val)}
              autoCorrect={false}
              autoCapitalize="words"
            />
          </View>
          <Text style={[styles.text_footer, { marginTop: 25 }]}>Edad</Text>
          <View style={[styles.action, { marginBottom: 20 }]}>
            <FontAwesome name="user-o" color={"#05375a"} size={20} />
            <TextInput
              placeholder="Edad"
              placeholderTextColor="#666666"
              style={styles.textInput}
              value={age}
              onChangeText={(val) => setAge(val)}
              autoCorrect={false}
              keyboardType={"numeric"}
            />
          </View>
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

          <Text>
            Ya Tienes una cuenta?
            {/* <TouchableOpacity onPress={() => navigation.navigate('Login')}> */}
            <Text
              onPress={() => navigation.navigate("Login")}
              style={{ color: "blue", fontStyle: "italic" }}
            >
              Iniciar Sesión aqui
            </Text>
            {/* </TouchableOpacity> */}
          </Text>
        </Animatable.View>
      </View>
    </LinearGradient>
  );
};

export default SignUp;
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
