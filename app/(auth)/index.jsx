import { View, Text, Image, Button, TextInput, StyleSheet } from "react-native"; //setiap kali mau diimport baik itu gambar tambahan css wajib diimport disini
import React from "react";
import { Link,router } from "expo-router"; //router dari link
//setiap mau buat style wajib di kasih classs
export default function Login() {
  return (
    <View style={styles.formContainer}>
      <Image source={require("@/assets/images/TMMIN-1.png")} />
      <Text style={styles.heading}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput style={styles.formInput} placeholder="mamad@gmail.com" />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          style={styles.formInput}
          SecureTextEntry={true} //buat jadi bintang bintang
          placeholder="password"
        />
      </View>
      <View style={styles.formContainer}>
        <Button 
          onPress={()=> router.navigate('../(tabs)')}
          color="#3D7B3F" 
          title="Sign In" />
        <Text style={styles.textRegister}>
          Don't have an account?{`        `}
          <Link style={styles.linkRegister} href="./Register">
            Sign up for free
          </Link>
        </Text>
      </View>
    </View>
  );
}

//router nya gimana
//semisalnya mau nambahin style harus ada function const styles=StyleSheet.create
const styles = StyleSheet.create({
  heading: {
    fontSize: 36,
    textAlign: "center",
    fontFamily: "PoppinsBold",
    marginVertical: 40,
  },

  //penggunaan form countainer ini untuk sebagai marginnya
  formContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  formLabel: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
  },
  formInput: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 4,
  },
  formButton: {
    backgroundColor: "#3D7B3F",
  },
  textRegister: {
    marginTop: 10,
    textAlign: "center",
  },
  linkRegister: {
    fontFamily: "PoppinsBold",
    color: "#0D28A6",
    textDecorationLine: "underline",
  },
  //   ContainerView:{
  //     paddintTop: 40,
  //   },
});
