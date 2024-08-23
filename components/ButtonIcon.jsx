import { Pressable,StyleSheet, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
// kenapa si on press atau style itu dikasih kurung kurawal ? maka fungsinya sama dengan seperti import maka  yang dibawah ini kayak press onpress dinamakan props
export default function ButtonIcon({onPress, text, style,...rest}) {
  return (
    <View style={{alignItems:'center'}}>
      <Pressable style={styles.box} onPress={onPress} >
        <Ionicons size={30} style={style} {...rest} />
      </Pressable>
      <Text >{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    box:{
        borderRadius:8,
        backgroundColor: '#AA4333',
        padding :12,
    },

    

})
