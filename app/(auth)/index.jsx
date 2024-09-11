import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import ModalPopup from "../../components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
// import * as SecureStore from "expo-secure-store";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, postLogin, selectUser } from "../../redux/reducers/auth/loginSlice";
import * as Yup from "yup";
import { Formik } from "formik";
import { GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
});

export default function Login() {
  // State for user and initialization
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  
  const { data, errorMessage, isModalVisible, isError } = useSelector(selectUser);
  const dispatch = useDispatch();

  // Function for Google Sign-in
  async function onGoogleButtonPress() {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { data :{ idToken }} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log(idToken, googleCredential); // cek token aja bro 
    return auth().signInWithCredential(googleCredential);
  }

  // Listen to authentication state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  useEffect(() => {
    if (isModalVisible) {
      setTimeout(() => {
        dispatch(closeModal());
        if (!isError) router.replace("../(tabs)");
      }, 2000);
    }
  }, [isModalVisible]);

  const handleSubmit = (values) => {
    console.log("test submit", values);
    dispatch(postLogin(values));
  };

  // Validation Schema using Yup
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(20, "Too Long!")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
      .required("Required"),
  });

  return (
    <View>
      <Image source={require("@/assets/images/logo-tmmin.png")} />
      <Text style={styles.heading}>Welcome Back!</Text>

      {/* Formik Integration */}
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Email</Text>
              <TextInput
                onBlur={handleBlur("email")}
                onChangeText={handleChange("email")}
                value={values.email}
                style={styles.formInput}
                placeholder="hehe123@gmail.com"
              />
              {errors.email && touched.email ? (
                <Text style={styles.errorText}>{errors.email}</Text>
              ) : null}
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.formLabel}>Password</Text>
              <TextInput
                onBlur={handleBlur("password")}
                onChangeText={handleChange("password")}
                value={values.password}
                style={styles.formInput}
                secureTextEntry={true}
                placeholder="password"
              />
              {errors.password && touched.password ? (
                <Text style={styles.errorText}>{errors.password}</Text>
              ) : null}
            </View>

            <View style={styles.formContainer}>
              <Button onPress={handleSubmit} color="#3D7B3F" title="Sign In" />
              <Text style={styles.textRegister}>
                Don't have an account?{` `}
                <Link style={styles.linkRegister} href="/register">
                  Sign up for free
                </Link>
              </Text>
              <View>
                {/* <Text>or</Text> */}
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  onPress={onGoogleButtonPress}
                />
              </View>
            </View>
          </>
        )}
      </Formik>

      <ModalPopup visible={isModalVisible}>
        <View style={styles.modalBackground}>
          {errorMessage !== null ? (
            <View style={styles.modalContent}>
              <Ionicons size={32} name={"close-circle"} />
              <Text>{errorMessage}</Text>
            </View>
          ) : (
            <View style={styles.modalContent}>
              <Ionicons size={32} name={"checkmark-circle"} />
              <Text>Berhasil Login!</Text>
            </View>
          )}
        </View>
      </ModalPopup>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 40,
    fontFamily: "PoppinsBold",
    textAlign: "center",
    marginVertical: 40,
  },
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  formLabel: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  formInput: {
    borderWidth: 1,
    padding: 10,
  },
  textRegister: {
    marginTop: 10,
    textAlign: "center",
  },
  linkRegister: {
    color: "#0D28A6",
    textDecorationLine: "underline",
  },
  modalBackground: {
    width: "90%",
    backgroundColor: "#fff",
    elevation: 20,
    borderRadius: 4,
    padding: 20,
  },
  modalContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});
