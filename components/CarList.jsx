import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Row, Col } from "./Grid";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function CarList({
  onPress,
  image,
  carName,
  passengers,
  baggage,
  price,
  style,
}) {
  return (
    <Pressable 
        style={{ ...styles.card, ...style }} 
        onPress={onPress}>
      <Row alignItems={"center"} gap={20}>
        <Col>
          <Image style={styles.img} source={image} />
        </Col>
        <Col>
          <Text style={styles.carName}>{carName}</Text>
          <Row gap={5}>
            <Col style={styles.textIcon}>
              <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
              <Text style={styles.capacityText}>{passengers}</Text>
            </Col>
            <Col style={styles.textIcon}>
              <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
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
    shadowColor: "rgba(0,0,0,1)",
    // shadowOffset: {
    //     width: 0,
    //     height: 3,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 1.5,
    elevation: 2,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    borderRadius: 2,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  img: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },
  carName: {
    fontSize: 14,
  },
  capacityText: {
    color: "#8A8A8A",
  },
  price: {
    color: "#5CB85F",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
