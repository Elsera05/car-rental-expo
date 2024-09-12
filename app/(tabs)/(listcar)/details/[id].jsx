import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getCarDetails,
  selectCarDetails,
  closeDetails,
} from "../../../../redux/reducers/car/carDetailsSlice";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Row, Col } from "@/components/Grid";
import Button from "@/components/Button";
import { normalize } from "@/utils/normalize";
import { setCarId } from "@/redux/reducers/order/orderSlice";
import { useCallback } from "react";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function details() {
  const { id } = useLocalSearchParams();
  const { data, isloading } = useSelector(selectCarDetails);
  const dispatch = useDispatch();
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup to avoid memory leak
    const signal = controller.signal;

    dispatch(getCarDetails({ id, signal }));
    dispatch(setCarId(id));

    return () => {
      controller.abort();
      // cancel request before component is closed
    };
  }, [id]);

  return (
    <View style={style.container}>
      <Button
        style={style.backButton}
        onPress={() => {
          dispatch(closeDetails());
          router.back();
        }}
      >
        <Ionicons size={32} name={"arrow-back"} color={"#00000"} />
      </Button>
      <ScrollView contentContainerStyle={style.scrollContainer}>
        <Text style={style.name}>{data.name}</Text>
        <Row gap={20}>
          <Col style={style.textIcon}>
            <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
            <Text style={style.capacityText}>
              {data.passengers}
              {7}
            </Text>
          </Col>
          <Col style={style.textIcon}>
            <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
            <Text style={style.capacityText}>
              {data.baggage}
              {4}
            </Text>
          </Col>
        </Row>
        <Image
          source={data.image ? { uri: data.image } : null}
          style={style.image}
        />
        <View style={style.card}>
          <Text style={style.cardTitle}>Tentang Paket</Text>
          <Text style={style.cardSubtitle}>Include</Text>
          <Text style={style.cardText}>
            • Apa saja yang termasuk dalam paket misal durasi max 12 jam
          </Text>
          <Text style={style.cardText}>
            • Sudah termasuk bensin selama 12 jam
          </Text>
          <Text style={style.cardText}>• Sudah termasuk Tiket Wisata</Text>
          <Text style={style.cardText}>• Sudah termasuk pajak</Text>
          <Text style={style.cardSubtitle}>Exclude</Text>
          <Text style={style.cardText}>
            • Tidak termasuk biaya makan sopir Rp 75.000/hari
          </Text>
          <Text style={style.cardText}>
            • Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp
            20.000/jam
          </Text>
          <Text style={style.cardText}>• Tidak termasuk Akomodasi</Text>
        </View>
      </ScrollView>

      <View style={style.footer}>
        <Text style={style.price}>{formatIDR(data.price || 0)}</Text>
        <Button
          color="#3D7B3F"
          onPress={() => {
            dispatch(setCarId(id));
            router.navigate("(order)");
          }}
          title="Lanjutkan Pembayaran"
        />
      </View>
    </View>
  );
}
const style = StyleSheet.create({
  container: {
    paddingTop: 15,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContainer: {
    alignItems: "center", // Center content horizontally
  },
  name: {
    fontFamily: "Poppins",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center", // Center text horizontally
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  capacityText: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#8A8A8A",
    marginLeft: 4,
  },
  image: {
    height: 150,
    width: 250,
    marginBottom: 10, // Optional: Add some margin below the image
  },
  price: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },
  footer: {
    backgroundColor: "#eeeeee",
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
  },
  card: {
    shadowColor: "rgba(0,0,0,1)",
    elevation: 2,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 20,
    marginVertical: 20, // Menambah jarak vertikal dari elemen lain
    marginHorizontal: 30, // Memberikan ruang lebih pada bagian kiri dan kanan
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 15,
  },
  cardSubtitle: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginBottom: 10,
  },
  cardText: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginBottom: 10,
  },
  backButton: {
    alignItems: "flex-start",
    position: "fixed",
    backgroundColor: "transparent",
    top: 40,
    left: 10,
    zIndex: 9,
    flex: 0,
  },
  details: {
    body: {
      fontSize: normalize(16),
      marginBottom: 10,
    },
    bullet_list: {
      marginBottom: 10,
    },
    heading2: {
      marginBottom: 10,
      fontSize: normalize(18),
      fontFamily: "PoppinsBold",
    },
  },
});
