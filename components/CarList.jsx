import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Row, Col } from "./Grid";

const formatCurrency = new Intl.NumberFormat('id-ID',{
    style:'currency',
    currency:'IDR'
})
export default function CarList({
  image,
  carName,
  passengers,
  baggage,
  price,
  style,
  onPress,
}) {
  return (
    <Pressable style={{...styles.card,...style}}
    onPress={onPress}>
      <Row alignItems={'center'} gap ={15} >
        <Col>
          <Image style={styles.img} source={image} />
        </Col>
        <Col>
          <Text style={styles.carName}>{carName} </Text>
          <Row gap={10}>
            <Col>
              <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
              <Text style={styles.capacityText}>{passengers}</Text>
            </Col>
            <Col>
              <Ionicons
                size={14}
                name={"briefcase-outline"}
                color={"#8A8A8A"}
              />
              <Text style={styles.capacityText}>{baggage}</Text>
            </Col>
          </Row>
          <Text style={styles.price}>{formatCurrency.format(price)}</Text>
        </Col>
      </Row>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "rgba(0,0,0,0.5)",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 1.5,
    elevation: 1.5,
    // borderColor:'rgba(0,0,0,1)',
    // borderWidth: 0.2,
    borderRadius:2,
    padding:20,
    marginBottom:20,
  },

  img: {
    width: 60,
    height: 60,
    objectFit:'contain'
  },

  //gunain objectfit buat ga kepotong
  carName: {
    fontSize: 14,
  },
  capacityText: {
    color: "#8A8A8A",
  },
  price: {
    color: "#5CB85F",
  },
});
