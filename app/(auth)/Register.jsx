import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native'
import { useState } from 'react'
import ModalPopup from '../../components/Modal'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';

export default function Register() {
  const [modalVisible, setModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (name, text) => {
    setFormData({
      ...formData,
      [name]: text
    })
  }
  const handleSubmit = async () => {
    console.log('test submit')
    try{
      const req = await
      fetch('https://api-car-rental.binaracademy.org/customer/auth/register', {
        method: 'POST',
        headers:{
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          role: 'Customer'
        })
      })
      const body = await req.json();
      if(!req.ok) throw new Error(body.message || body.errors[0].message || "Something Went Wrong!")
      setModalVisible(true)
      setTimeout(() => {
        setModalVisible(false)
        router.navigate('/')
      }, 1000)
    } catch(e) {
      setErrorMessage(e.message)
      setModalVisible(true)
      setTimeout(() => {
        setModalVisible(false)
        setErrorMessage(null)
      }, 3000)
    }
  }

  return (
    <View>
      <Image source={require('@/assets/images/logo-tmmin.png')} />
      <Text style={styles.heading}>Sign Up</Text>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Name*</Text>
        <TextInput 
            style={styles.formInput}
            placeholder='name' />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Email*</Text>
        <TextInput 
            style={styles.formInput}
            onChangeText={(text) => handleChange('email', text)}
            placeholder='johndee@gmail.com' />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formLabel}>Create Password</Text>
        <TextInput 
            style={styles.formInput}
            secureTextEntry={true}
            onChangeText={(text) => handleChange('password', text)}
            placeholder='password' 
            />
      </View>
      <View style={styles.formContainer}>
        <Button 
            onPress={() => handleSubmit()}
            color='#3D7B3F'
            title="Sign Up"/>
        <Text style={styles.textRegister}>
            Already have an account?{` `}
            <Link style={styles.linkRegister} href="/">Sign in free</Link></Text>
      </View>
      <ModalPopup visible={modalVisible}>
        <View style={styles.modalBackground}>
          { errorMessage !== null ?
            <>
              <Ionicons size={32} name={'close-circle'} />
              <Text>{errorMessage}</Text>
            </>
            : 
            <>
              <Ionicons size={32} name={'checkmark-circle'} />
              <Text>Berhasil Register!</Text>
            </>
          }
        </View>
      </ModalPopup>
      </View>
  )
}

const styles = StyleSheet.create({
  heading: {
      fontSize: 40,
      fontFamily: 'PoppinsBold',
      textAlign: 'center',
      marginVertical: 40
  },
  formContainer: {
      paddingHorizontal: 20,
      marginBottom: 30,
  },
  formLabel: {
      fontFamily: 'PoppinsBold',
      fontSize: 14,
  },
  formInput: {
      borderWidth: 1,
      padding: 10,
  }, 
  textRegister: {
      marginTop: 10,
      textAlign: 'center'
  },
  linkRegister:{
      color: '#0D28A6',
      textDecorationLine: 'underline'
  },
  modalBackground: {
    width:'90%',
    backgroundColor: '#fff',
    elevation: 20,
    borderRadius: 4,
    padding:20
  }
})