import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native'
import { useState } from 'react'
import ModalPopup from '../../components/Modal'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router } from 'expo-router';
import * as Yup from 'yup';
import { Formik } from 'formik';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Too Short!')
    .max(20, 'Too Long!')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character")
    .required('Required'),
});

export default function Register() {
  const [modalVisible, setModalVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async(values) => {
    console.log('test submit')
    try{
      const req = await
      fetch('https://api-car-rental.binaracademy.org/customer/auth/register', {
        method: 'POST',
        headers:{
          'Content-Type': "application/json",
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
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
      <Formik
        initialValues={{ 
          name: '',
          email: '',
          password: ''
        }}
        validationSchema={SignupSchema}
        onSubmit={values => handleSubmit(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <>
              <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Name*</Text>
                <TextInput 
                    onBlur={handleBlur('name')}
                    onChangeText={handleChange('name')}
                    style={styles.formInput}
                    placeholder='name' />
                    { errors.name && touched.name ? <Text >{ errors.name }</Text> : null}
              </View>
              <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Email*</Text>
                <TextInput
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    style={styles.formInput}
                    placeholder='johndee@gmail.com' />
                    { errors.email && touched.email ? <Text >{ errors.email }</Text> : null}
              </View>
              <View style={styles.formContainer}>
                <Text style={styles.formLabel}>Create Password</Text>
                <TextInput 
                    style={styles.formInput}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    secureTextEntry={true}
                    placeholder='password' 
                    />
                    { errors.password && touched.password ? <Text >{ errors.password }</Text> : null}
              </View>
              <View style={styles.formContainer}>
                <Button
                  onPress={handleSubmit}
                  color="#3D7B3F"
                  title="Sign Up"
                />
                <Text style={styles.textRegister}>
                    Already have an account?{` `}
                    <Link style={styles.linkRegister} href="/">Sign in free</Link></Text>
              </View>
            </>
          )}
      </Formik>
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
