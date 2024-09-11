import { Pressable, Text, View, StyleSheet } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'

export default function ButtonIcon({onPress, text, style, ...rest}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
        <View style={styles.box}>
          <Ionicons size={32} style={style} {...rest} />
        </View>
        <Text style={styles.text}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    container:{
      alignItems:'center'
    },
    box:{
        borderRadius:8,
        backgroundColor: '#A43333',
        padding: 15,
        marginBottom: 5,
    },
    text:{
      fontFamily:'PoppinsBold',
      fontSize: 12,
      textAlign: 'center',
      minWidth: 70
    }
})