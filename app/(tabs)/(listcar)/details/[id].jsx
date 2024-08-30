import { View, Text, ScrollView, Image, Button, StyleSheet } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getCarDetails, selectCarDetails } from '../../../../redux/reducers/car/carDetailsSlice';
import Ionicons from "@expo/vector-icons/Ionicons";
import { Row, Col } from "@/components/Grid";
import { router } from 'expo-router';

export default function details() {
  const { id } = useLocalSearchParams();
  const { data, isloading } = useSelector(selectCarDetails)
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup to avoid memory leak
    const signal = controller.signal;

    dispatch(getCarDetails({ id, signal }))

    return () => {
      controller.abort();
      // cancel request before component is closed
    };
  }, [id]);

  return (
    <View style={style.container}>
      <ScrollView contentContainerStyle={style.scrollContainer}>
        <Text style={style.name}>{data.name}</Text>
        <Row gap={20}>
          <Col style={style.textIcon}>
            <Ionicons size={14} name={"people-outline"} color={"#8A8A8A"} />
            <Text style={style.capacityText}>{data.passengers}</Text>
          </Col>
          <Col style={style.textIcon}>
            <Ionicons size={14} name={"bag-outline"} color={"#8A8A8A"} />
            <Text style={style.capacityText}>{data.baggage}</Text>
          </Col>
        </Row>
        <Image
          source={{ uri: data.image }}
          style={style.image}
        />
      <View style={style.card}>
        <Text style={style.cardTitle}>Tentang Paket</Text>
        <Text style={style.cardSubtitle}>Include</Text>
        <Text style={style.cardText}>• Apa saja yang termasuk dalam paket misal durasi max 12 jam</Text>
        <Text style={style.cardText}>• Sudah termasuk bensin selama 12 jam</Text>
        <Text style={style.cardText}>• Sudah termasuk Tiket Wisata</Text>
        <Text style={style.cardText}>• Sudah termasuk pajak</Text>
        <Text style={style.cardSubtitle}>Exclude</Text>
        <Text style={style.cardText}>• Tidak termasuk biaya makan sopir Rp 75.000/hari</Text>
        <Text style={style.cardText}>• Jika overtime lebih dari 12 jam akan ada tambahan biaya Rp 20.000/jam</Text>
        <Text style={style.cardText}>• Tidak termasuk Akomodasi</Text>
      </View>

      </ScrollView>
      <View style={style.footer}>
        <Text style={style.price}>Rp.{data.price}</Text>
        <Button
          color='#3D7B3F'
          title="Lanjutkan Pembayaran"
          onPress={()=> router.navigate("../details/payment")} 
        />
      </View>
    </View>
  )
}
const style = StyleSheet.create({
  container: {
    paddingTop: 40,
    flex: 1,
    backgroundColor: '#ffffff'
  },
  scrollContainer: {
    alignItems: 'center', // Center content horizontally
  },
  name: {
    fontFamily: 'Poppins',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center', // Center text horizontally
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capacityText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    color: '#8A8A8A',
    marginLeft: 4,
  },
  image: {
    height: 150,
    width: 250,
    marginBottom: 10, // Optional: Add some margin below the image
  },
  price: {
    fontFamily: 'PoppinsBold',
    fontSize: 16,
    marginBottom: 10
  },
  footer: {
    backgroundColor: '#eeeeee',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
  },
  card: {
    shadowColor: "rgba(0,0,0,1)",
    elevation: 2,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,  // Menambah jarak vertikal dari elemen lain
    marginHorizontal: 30,  // Memberikan ruang lebih pada bagian kiri dan kanan
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontFamily: 'PoppinsBold',
    fontSize: 16,
    marginBottom: 15,
  },
  cardSubtitle: {
    fontFamily: 'PoppinsBold',
    fontSize: 14,
    marginBottom: 10,
  },
  cardText: {
    fontFamily: 'Poppins',
    fontSize: 14,
    marginBottom: 10,
  },
});