import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import firebase from "../components/firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
  const [user, setUser] = useState(null);
  const db = firebase.firestore().collection("Users");

  const firebaseErrors = {
    "auth/app-deleted": "No se encontró la base de datos",
    "auth/expired-action-code": "El código de acción o el enlace ha caducado",
    "auth/invalid-action-code":
      "El código de acción no es válido. Esto puede suceder si el código está mal formado o ya se ha utilizado",
    "auth/user-disabled":
      "El usuario correspondiente a la credencial proporcionada ha sido deshabilitado",
    "auth/user-not-found": "El usuario no coincide con ninguna credencial",
    "auth/weak-password": "La contraseña es demasiado débil",
    "auth/email-already-in-use":
      "Ya tenía una cuenta con la dirección de correo electrónico proporcionada",
    "auth/invalid-email": "La dirección de correo electrónico no es válida",
    "auth/operation-not-allowed":
      "El tipo de cuenta correspondiente a esta credencial aún no está activado",
    "auth/account-exists-with-different-credential":
      "Correo electrónico ya asociado con otra cuenta",
    "auth/auth-domain-config-required":
      "No se ha proporcionado la configuración para la autenticación",
    "auth/credential-already-in-use":
      "Ya existe una cuenta para esta credencial",
    "auth/operation-not-supported-in-this-environment":
      "Esta operación no se admite en el entorno que se realiza. Asegúrese de que debe ser http o https",
    "auth/timeout":
      "Tiempo de respuesta excedido. Es posible que el dominio no esté autorizado para realizar operaciones",
    "auth/missing-android-pkg-name":
      "Se debe proporcionar un nombre de paquete para instalar la aplicación de Android",
    "auth/missing-continue-uri":
      "La siguiente URL debe proporcionarse en la solicitud",
    "auth/missing-ios-bundle-id":
      "Se debe proporcionar un nombre de paquete para instalar la aplicación iOS",
    "auth/invalid-continue-uri":
      "La siguiente URL proporcionada en la solicitud no es válida",
    "auth/unauthorized-continue-uri":
      "El dominio de la siguiente URL no está en la lista blanca",
    "auth/invalid-dynamic-link-domain":
      "El dominio de enlace dinámico proporcionado, no está autorizado o configurado en el proyecto actual",
    "auth/argument-error":
      "Verifique la configuración del enlace para la aplicación",
    "auth/invalid-persistence-type":
      "El tipo especificado para la persistencia de datos no es válido",
    "auth/unsupported-persistence-type":
      "El entorno actual no admite el tipo especificado para la persistencia de datos",
    "auth/invalid-credential": "La credencial ha caducado o está mal formada",
    "auth/wrong-password": "Contraseña incorrecta",
    "auth/invalid-verification-code":
      "El código de verificación de credencial no es válido",
    "auth/invalid-verification-id":
      "El ID de verificación de credencial no es válido",
    "auth/custom-token-mismatch":
      "El token es diferente del estándar solicitado",
    "auth/invalid-custom-token": "El token proporcionado no es válido",
    "auth/captcha-check-failed":
      "El token de respuesta reCAPTCHA no es válido, ha caducado o el dominio no está permitido",
    "auth/invalid-phone-number":
      "El número de teléfono está en un formato no válido (estándar E.164)",
    "auth/missing-phone-number": "El número de teléfono es obligatorio",
    "auth/quota-exceeded": "Se ha excedido la cuota de SMS",
    "auth/cancelled-popup-request":
      "Solo se permite una solicitud de ventana emergente a la vez",
    "auth/popup-blocked": "El navegador ha bloqueado la ventana emergente",
    "auth/popup-closed-by-user":
      "El usuario cerró la ventana emergente sin completar el inicio de sesión en el proveedor",
    "auth/unauthorized-domain":
      "El dominio de la aplicación no está autorizado para realizar operaciones",
    "auth/invalid-user-token": "El usuario actual no fue identificado",
    "auth/user-token-expired": "El token del usuario actual ha caducado",
    "auth/null-user": "El usuario actual es nulo",
    "auth/app-not-authorized":
      "Aplicación no autorizada para autenticarse con la clave dada",
    "auth/invalid-api-key": "La clave API proporcionada no es válida",
    "auth/network-request-failed": "Error al conectarse a la red",
    "auth/requires-recent-login":
      "El último tiempo de acceso del usuario no cumple con el límite de seguridad",
    "auth/too-many-requests":
      "Las solicitudes se bloquearon debido a una actividad inusual. Vuelva a intentarlo después de un tiempo",
    "auth/web-storage-unsupported":
      "El navegador no es compatible con el almacenamiento o si el usuario ha deshabilitado esta función",
    "auth/invalid-claims":
      "Los atributos de registro personalizados no son válidos",
    "auth/claims-too-large":
      "El tamaño de la solicitud excede el tamaño máximo permitido de 1 Megabyte",
    "auth/id-token-expired": "El token informado ha caducado",
    "auth/id-token-revoked": "El token informado ha caducado",
    "auth/invalid-argument":
      "Se proporcionó un argumento no válido a un método",
    "auth/invalid-creation-time":
      "La hora de creación debe ser una fecha UTC válida",
    "auth/invalid-disabled-field":
      "La propiedad para el usuario deshabilitado no es válida",
    "auth/invalid-display-name": "El nombre de usuario no es válido",
    "auth/invalid-email-verified": "El correo electrónico no es válido",
    "auth/invalid-hash-algorithm":
      "El algoritmo HASH no es compatible con la criptografía",
    "auth/invalid-hash-block-size": " El tamaño del bloque HASH no es válido ",
    "auth/invalid-hash-derived-key-length":
      "El tamaño de la clave derivada de HASH no es válido",
    "auth/invalid-hash-key":
      "La clave HASH debe tener un búfer de bytes válido",
    "auth/invalid-hash-memory-cost": "El costo de la memoria HASH no es válido",
    "auth/invalid-hash-parallelization": "La carga paralela HASH no es válida",
    "auth/invalid-hash-rounds": "El redondeo HASH no es válido",
    "auth/invalid-hash-salt-separator":
      "El campo separador SALT del algoritmo de generación HASH debe ser un búfer de bytes válido",
    "auth/invalid-id-token": "El código de token ingresado no es válido",
    "auth/invalid-last-sign-in-time":
      "La última hora de inicio de sesión debe ser una fecha UTC válida",
    "auth/invalid-page-token":
      "La siguiente URL proporcionada en la solicitud no es válida",
    "auth/invalid-password":
      "La contraseña no es válida, debe tener al menos 6 caracteres de longitud",
    "auth/invalid-password-hash": "La contraseña HASH no es válida",
    "auth/invalid-password-salt": "La contraseña SALT no es válida",
    "auth/invalid-photo-url": "La URL de la foto del usuario no es válida",
    "auth/invalid-provider-id":
      "El identificador del proveedor no es compatible",
    "auth/invalid-session-cookie-duration":
      "La duración de la COOKIE de la sesión debe ser un número válido en milisegundos, entre 5 minutos y 2 semanas",
    "auth/invalid-uid":
      "El identificador proporcionado debe tener un máximo de 128 caracteres",
    "auth/invalid-user-import":
      "El registro de usuario a importar no es válido",
    "auth/invalid-provider-data": "El proveedor de datos no es válido",
    "auth/maximum-user-count-exceeded":
      "Se ha excedido el número máximo permitido de usuarios a importar",
    "auth/missing-hash-algorithm":
      "Es necesario proporcionar el algoritmo de generación HASH y sus parámetros para importar usuarios",
    "auth/missing-uid": "Se requiere un identificador para la operación actual",
    "auth/reserved-claims":
      "Una o más propiedades personalizadas proporcionaron palabras reservadas usadas",
    "auth/session-cookie-revoked": "La sesión COOKIE ha expirado",
    "auth/uid-alread-exists": "El identificador proporcionado ya está en uso",
    "auth/email-already-exists":
      "El correo electrónico proporcionado ya está en uso",
    "auth/phone-number-already-exists":
      "El teléfono proporcionado ya está en uso",
    "auth/project-not-found": "No se encontraron proyectos",
    "auth/insufficient-permission":
      "La credencial utilizada no tiene acceso al recurso solicitado",
    "auth/internal-error":
      "El servidor de autenticación encontró un error inesperado al intentar procesar la solicitud",
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log(firebase.auth().currentUser.uid);
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
            console.log(e.code);
          }
        },
        // register: async (fName, lName, email, password) => {
        //   try {
        //     await firebase
        //       .auth()
        //       .createUserWithEmailAndPassword(email, password)
        //       .then(() => {
        //         db.doc(firebase.auth().currentUser.uid).set({
        //           userId: firebase.auth().currentUser.uid,
        //           FirstName: fName,
        //           LastName: lName,
        //           Phone: '',
        //           password,
        //           email: email,
        //           plan: '',
        //           startDate: '',
        //           endDate: '',
        //           goal: '',
        //           points: '',
        //           history: '',
        //           sport: '',
        //           Age: '',
        //           Height: '',
        //           Weight: '',
        //           Gender: '',
        //           BaseStartDate: '',
        //           Imc: '',
        //           Grasa: '',
        //           Musculo: '',
        //           Basal: '',
        //           GoalBasal: '',
        //           Agua: '',
        //           Proteina: '',
        //           Osea: '',
        //           Metabolica: '',
        //           Viseral: '',
        //           createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        //           userImg: null,
        //         });
        //       });
        //   } catch (e) {
        //     const errorMes = firebaseErrors[e.code];
        //     alert(errorMes);
        //     console.log(errorMes);
        //   }
        // },
        register: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                console.log(firebase.auth().currentUser.uid);
                db.doc(firebase.auth().currentUser.uid).set({
                  userId: firebase.auth().currentUser.uid,
                  password,
                  email: email,

                  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                });
              });
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(e);
          }
        },
        phoneRegister: async (credential, fName, lName, age, cell) => {
          try {
            firebase
              .auth()
              .signInWithCredential(credential)
              .then(() => {
                firebase
                  .firestore()
                  .collection("Members")
                  .doc(firebase.auth().currentUser.uid)
                  .set(
                    {
                      userId: firebase.auth().currentUser.uid,
                      FirstName: fName,
                      LastName: lName,
                      Age: age,
                      Cell: cell,

                      createdAt:
                        firebase.firestore.FieldValue.serverTimestamp(),
                    },
                    { merge: true }
                  );

                // Do something with the results here
                // console.log(result.additionalUserInfo.isNewUser);
              });
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(e);
          }
        },
        phoneLogin: async (credential) => {
          try {
            firebase.auth().signInWithCredential(credential);
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(e);
          }
        },
        sendNotification: async (
          userInfo,
          bookingData,
          bookParam,
          helper,
          type
        ) => {
          const time = bookingData.k.slot;
          const date = bookParam.bookingDate.dateString;
          const Name = userInfo.FirstName;
          const Last = userInfo.LastName;
          const Cell = userInfo.Cell;
          const Age = userInfo.Age;
          const userId = userInfo.userId;
          const increment = firebase.firestore.FieldValue.increment(1);
          // console.log(Name, Cell, Age, userId);
          // let array = {};
          // array[date] = [
          //   {
          //     Name: Name,
          //     Cell: Cell,
          //     Age: Age,
          //     userId: userId,
          //     Time: time,
          //     Type: type,
          //     read: false,
          //   },
          // ];
          // at beginning of script
          // let array = {};

          // // later, when you want to add to it
          // if (!array[date]) {
          //   array[date] = [];
          // }
          // array[date].push({
          //   Name: Name,
          //   Cell: Cell,
          //   Age: Age,
          //   userId: userId,
          //   Time: time,
          //   Type: type,
          //   read: false,
          // });

          // array({
          //   Name: Name,
          //   Cell: Cell,
          //   Age: Age,
          //   userId: userId,
          //   Time: time,
          //   Type: type,
          //   read: false,
          // });

          // try {
          //   await firebase
          //     .firestore()
          //     .collection("Notifications")
          //     .doc(`${helper}`)
          //     .set(
          //       array,

          //       { merge: true }
          //     );
          // } catch (e) {
          //   alert(e);
          //   console.log(e);
          // }
          let array = {};
          // array[date] = [];
          try {
            await firebase
              .firestore()
              .collection("Data")
              .doc(`${helper}`)
              .collection("Slots")
              .doc(`${helper}`)
              .update({
                [date]: firebase.firestore.FieldValue.arrayUnion({
                  Name: Name,
                  Last: Last,
                  Cell: Cell,
                  Age: Age,
                  userId: userId,
                  Time: time,
                  Type: type,
                  read: false,
                }),
              });
          } catch (e) {
            alert(e);
            console.log(e);
          }
          try {
            await firebase
              .firestore()
              .collection("Data")
              .doc(`${helper}`)
              .collection("Marked Dates")
              .doc("marked")
              .set(
                {
                  [date]: { marked: true },
                },
                { merge: true }
              );
          } catch (e) {
            alert(e);
            console.log(e);
          }
          try {
            await firebase
              .firestore()
              .collection("Notifications")
              .doc(`${helper}`)

              .set(
                {
                  TotalDates: increment,
                },
                { merge: true }
              );
          } catch (e) {
            alert(e);
            console.log(e);
          }
        },
        createNotification: async (
          userInfo,
          bookingData,
          bookParam,
          helper,
          type
        ) => {
          const time = bookingData.k.slot;
          const startTime = bookingData.startTime;
          const endTime = bookingData.endTime;
          const date = bookParam.bookingDate.dateString;
          const Name = userInfo.FirstName;
          const Last = userInfo.LastName;
          const Cell = userInfo.Cell;
          const Age = userInfo.Age;
          const userId = userInfo.userId;
          console.log(Name, Last, Cell, Age, userId);

          try {
            await firebase
              .firestore()
              .collection("Data")
              .doc(`${helper}`)
              .collection("Client Notifications")
              .doc()
              .set({
                Date: date,
                Name: Name,
                Last: Last,
                Cell: Cell,
                Age: Age,
                userId: userId,
                Time: time,
                startTime,
                endTime,
                Type: type,
                read: false,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              });
          } catch (e) {
            alert(e);
            console.log(e);
          }
          try {
            await firebase
              .firestore()
              .collection("Notifications")
              .doc(`${helper}`)
              .collection("Marked Dates")
              .doc("marked")
              .set(
                {
                  [date]: { marked: true },
                },
                { merge: true }
              );
          } catch (e) {
            alert(e);
            console.log(e);
          }
        },
        reserveSlot: async (bookingData, bookParam, user, slots, helper) => {
          const status = bookingData.status;
          const key = bookingData.k.slot;
          const value = bookingData.slots;
          const month = bookParam.bookingDate.month.toString();
          const year = bookParam.bookingDate.year.toString();
          const date = bookParam.bookingDate.dateString;

          // const array = {
          //   date: [
          //     {
          //       name: "loso",
          //       time: key,
          //       type: "somethings blah",
          //       userId: firebase.auth().currentUser.uid,
          //     },
          //   ],
          // };

          const uid = user.uid;
          let userDataJson = {};
          if (status) userDataJson[key] = uid;
          else userDataJson[key] = null;
          try {
            await firebase.firestore().collection(`${helper}`).doc(date).set(
              {
                // things,

                // array,

                // {
                //   // User: uid,
                //   // Date: date,
                //   // Key: key,
                //   // Slot: value,
                userDataJson,
              },
              { merge: true }
            );
          } catch (e) {
            alert(e);
            console.log(e);
          }
          // console.log(month, date, status, key, value);
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            console.log(e);
          }
          try {
          } catch (e) {
            const errorMes = firebaseErrors[e.code];
            alert(errorMes);
            console.log(errorMes);
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
