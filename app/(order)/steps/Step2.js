import React, { useCallback, useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder } from "@/redux/reducers/order/orderSlice";
import { selectCarDetails } from "@/redux/reducers/car/carDetailsSlice";
import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";


function getDate24() {
  const date24 = new Date();
  date24.setHours(date24.getHours() + 24);
  return date24.toString();
}

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethod = ["BCA"];

export default function Step2({ setActiveStep }) {
  const { carId } = useSelector(selectOrder);
  const { data } = useSelector(selectCarDetails);
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);
  const [selectedMethod, setSelectedMethod] = useState(null);
  // const dispatch = useDispatch();

  const copyToClipboard = async (text) =>{
    await Clipboard.setStringAsync(text.toString())
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.countDownWrapper}>
          <Text style={styles.textBold}>Selesaikan pembayaran sebelum</Text>
          <CountDown
            until={86400}
            digitStyle={{ backgroundColor: '#FA2C5A' }}
            digitTxtStyle={{color:"#fff"}}
            timeLabelStyle={{display:"none"}}
            onFinish={() => Alert.alert('Finished')}
            timeToShow={['H','M','S']}
            size={12}
          />
        </View>
        <CarList
          image={{ uri: data.image }}
          carName={data.name}
          passengers={5}
          baggage={4}
          price={data.price}
        />
        <Text style={styles.transacTrans}>Lakukan Transfer Ke</Text>
        <View>
          {paymentMethod.map((e) => (
            <Button
              key={e}
              style={styles.paymentMethod}
              onPress={() => setSelectedMethod(e)}
            >
              <Text style={styles.paymentBox}>{e}</Text>
              <Text style={styles.paymentText}>{e} Transfer</Text>
              {selectedMethod === e && (
                <Ionicons style={styles.checkmark} size={20} name="checkmark" />
              )}
            </Button>
          ))}
        </View>
        <View style={styles.accountDetailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nomor Rekening</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>12345678</Text>
              <Pressable
              onPress={() => copyToClipboard(12345678) }
              >
              <Ionicons name="copy-outline" size={24} color="#3D7B3F" />
              </Pressable>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Bayar</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>{formatIDR(230000)}</Text>
              <Pressable
              onPress={() => copyToClipboard(230000) }
              >
              <Ionicons name="copy-outline" size={24} color="#3D7B3F" />
              </Pressable>
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>
            Klik konfirmasi pembayaran untuk mempercepat proses pengecekan
          </Text>
          <Button
            disabled={!selectedMethod}
            color="#3D7B3F"
            onPress={() => setActiveStep(2)}
            title="Lanjutkan Pembayaran"
          />
          <Button
            style={styles.orderListButton}
            textStyle={styles.orderListButtonText}
            onPress={() => {
              // arahkan ke halaman yang diinginkan
            }}
            title="Lihat Daftar Pesanan"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
    
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#D0D0D0",
  },
  paymentBox: {
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#D0D0D0",
    marginRight: 10,
    textAlign: "center",
    width: "38%",
    borderRadius: 5,
  },
  paymentText: {
    fontFamily: "Poppins",
    fontSize: 14,
    marginLeft: 10,
    flex: 1,
    textAlign: "left",
    paddingTop: 11,
  },
  checkmark: {
    marginLeft: "auto",
    color: "#4CAF50",
  },
  accountDetailsContainer: {
    marginTop: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailRow: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  detailValueContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4,
    padding: 12,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    backgroundColor: "#eeeeee",
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  promoText: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginBottom: 10,
  },
  wrapperInput: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#3d7b3f",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  formInput: {
    flex: 1,
  },
  transacTrans: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginBottom: 10,
  },
  orderListButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 1,
    paddingVertical: 1,
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginTop: 10,
  },
  orderListButtonText: {
    fontFamily: "PoppinsBold",
    color: "#4CAF50",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },

  countDownWrapper:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    marginBottom:10

  }



});

