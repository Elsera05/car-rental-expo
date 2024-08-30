import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import ModalPopup from "../../components/Modal";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useDispatch,useSelector, } from "react-redux";
import { closeModal, postLogin,selectUser } from "../../redux/reducers/auth/loginSlice";

async function save(key, value){
    await SecureStore.setItemAsync(key, value)
}

export default function Login() {
  const{data , errorMessage,isModalVisible,isError } = useSelector(selectUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text,
    });
  };
  const handleSubmit = async () => {
    console.log("test submit", formData);
    dispatch(postLogin(formData))
console.log(data)
  };
useEffect(() => {
  if (isModalVisible){
    setTimeout(()=>{
      dispatch(closeModal())
      if(!isError)router.replace('../(tabs)')
    },2000)
  }
},[isModalVisible])

  return (
    <View>
      <Image source={require("@/assets/images/logo-tmmin.png")} />
      <Text style={styles.heading}>Welcome Back!</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email</Text>
        <TextInput
          onChangeText={(text) => handleChange("email", text)}
          style={styles.formInput}
          placeholder="hehe123@gmail.com"
        />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Password</Text>
        <TextInput
          onChangeText={(text) => handleChange("password", text)}
          style={styles.formInput}
          secureTextEntry={true}
          placeholder="password"
        />
      </View>
      <View style={styles.formContainer}>
        <Button
          onPress={() => handleSubmit()}
          color="#3D7B3F"
          title="Sign In"
        />
        <Text style={styles.textRegister}>
          Don't have an account?{` `}
          <Link style={styles.linkRegister} href="/register">
            Sign up for free
          </Link>
        </Text>
      </View>
      <ModalPopup visible={isModalVisible}>
        <View style={styles.modalBackground}>
        { errorMessage !== null ?
        <View style={styles.modalContent}>
          <Ionicons size={32} name={'close-circle'} />
          <Text>{errorMessage}</Text>
        </View>
          :
        <View style={styles.modalContent}>
          <Ionicons size={32} name={'checkmark-circle'} />
          <Text>Berhasil Login!</Text>
        </View>
        }
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
    width:'90%',
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius: 4,
    padding:20
  },
  modalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
