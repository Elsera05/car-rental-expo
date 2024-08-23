import { View, StyleSheet } from 'react-native'
import React from 'react'

export  function Container(style,children) {
  return (
    <View style={{...styles.container,style}}>
      {children}
    </View>
  )
}


export  function Row({alignItems,justifyContent,children, gap = 0}) {
    return (
      <View style={{
        ...styles.row,
        alignItems:alignItems ? alignItems :'baseline',
        justifyContent:justifyContent ? justifyContent:'flex-start',
        gap:gap,
        ...styles
      }}>
        {children}
      </View>
    )
  }


  
export  function Col({style,children}) {
    return (
      <View style={style}>
        {children}
      </View>
    )
  }


  const styles =StyleSheet.create({
    row:{
        flexDirection:'row',
    },

    container:{
        paddingHorizontal:20,
    },






  })