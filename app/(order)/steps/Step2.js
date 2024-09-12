import React, { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable, TouchableOpacity, Modal, Image } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectOrder, setStateByName, putOrderSlip } from "@/redux/reducers/order/orderSlice";
import { selectCarDetails } from "@/redux/reducers/car/carDetailsSlice";
import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";
import CountDown from "react-native-countdown-component-maintained";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from 'expo-image-picker';
import { selectUser } from "@/redux/reducers/auth/loginSlice";
import moment from "moment";

function getDate24() {
  const date24 = new Date();
  date24.setHours(date24.getHours() + 24);
  return date24.toString();
}

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export default function Step2({ setActiveStep, selectedBank }) {
  const dispatch = useDispatch();
  const { data, status, errorMessage } = useSelector(selectOrder);
  const user = useSelector(selectUser);
  const carDetails = useSelector(selectCarDetails);
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);

  const paymentMethod = [selectedBank];

  const copyToClipboard = async (text) => {
    const str = text.toString();
    await Clipboard.setStringAsync(str);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage({
        uri: result.assets[0].uri,
        name: result.assets[0].fileName,
        type: result.assets[0].mimeType,
      });
    }
  };

  const handleUpload = () => {
    console.log(image)
    if (image) {
      const formData = new FormData();
      formData.append("slip", image); 
      dispatch(putOrderSlip({
        token: user.data.access_token,
        id: data.id,
        formData
      }));
    }
  }

  useEffect(() => {
    console.log(status)
    if (status === "upload-success") {
      console.log(data)
      setActiveStep(2)
    } else {
      console.log(errorMessage)
    }
  }, [status])

  const currentDateTime = moment().format('dddd, MMMM Do YYYY, h:mm A');

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.countDownWrapper}>
          <Text style={styles.textBold}>Se lesaikan pembayaran sebelum</Text>
          <CountDown
            until={86400}
            digitStyle={{ backgroundColor: '#FA2C5A' }}
            digitTxtStyle={{color:"#fff"}}
            timeLabelStyle={{display:"none"}}
            onFinish={() => Alert.alert('Finished')}
            timeToShow={['H','M','S']}
            size={10}
          />
        </View>
        <Text style={styles.dateTimeText}>{currentDateTime}</Text>
        <CarList
          image={{ uri: carDetails.data.image }}
          carName={carDetails.data.name}
          passengers={5}
          baggage={4}
          price={carDetails.data.price}
        />
        <Text style={styles.transacTrans}>Lakukan Transfer Ke</Text>
        <View>
          {paymentMethod.map((e) => (
            <Button
              key={e}
              style={styles.paymentMethod}
            >
              <Text style={styles.paymentBox}>{e}</Text>
              <Text style={styles.paymentText}>{e} Transfer</Text>
              <Ionicons style={styles.checkmark} size={20} name="checkmark" />
            </Button>
          ))}
        </View>
        <View style={styles.accountDetailsContainer}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nomor Rekening</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>12345678</Text>
              <Pressable onPress={() => copyToClipboard(12345678)}>
                <Ionicons name="copy-outline" size={24} color="#3D7B3F" />
              </Pressable>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Bayar</Text>
            <View style={styles.detailValueContainer}>
              <Text style={styles.detailValue}>{formatIDR(230000)}</Text>
              <Pressable onPress={() => copyToClipboard(230000)}>
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
            color="#3D7B3F"
            onPress={() => setModalVisible(true)}
            title="Lanjutkan Pembayaran"
          />
          <TouchableOpacity
            style={styles.orderListButton}
            onPress={() => {
              // Handle order list
            }}
          >
            <Text style={styles.orderListButtonText}>Lihat Daftar Pesanan</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Konfirmasi Pembayaran</Text>
            <Text style={styles.modalText}>
              Terima kasih telah melakukan konfirmasi pembayaran. Pembayaranmu akan segera kami cek tunggu kurang lebih 10 menit untuk mendapatkan konfirmasi.
            </Text>
            <CountDown
              until={600} 
              size={20}
              digitStyle={{backgroundColor: '#FFF'}}
              digitTxtStyle={{color: '#FA2C5A'}}
              timeToShow={['M', 'S']}
              timeLabels={{m: '', s: ''}}
              showSeparator
            />
            <Text style={styles.uploadText}>Upload Bukti Pembayaran</Text>
            <Text style={styles.uploadDescription}>
              Untuk membantu kami lebih cepat melakukan pengecekan. Kamu bisa upload bukti bayarmu
            </Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              {image ? 
                <Image source={{uri:image.uri}} style={styles.image} />
               : 
                <>
                  <Ionicons name="image-outline" size={24} color="#000" />
                  <Text style={styles.uploadButtonText}>Upload gambar disini</Text>
                </>
              }
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderListButtonUpload}
              onPress={handleUpload}
            >
              <Text style={styles.orderListButtonTextUpload}>Upload gambar disini bro</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.orderListButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.orderListButtonText}>Lihat Daftar Pesanan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontFamily:"Poppins"
    
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
    position: "fixed",
    paddingTop: 10,
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
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#4CAF50",
    marginTop: 10,
  },
  orderListButtonText: {
    fontFamily: "PoppinsBold",
    color: "#3D7B3F",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  orderListButtonUpload:{
    backgroundColor: "#3D7B3F",
    borderRadius: 1,
    paddingVertical: 10,
    borderWidth: 1,
    marginTop: 10,
    borderColor: "#4CAF50"

  },
  orderListButtonTextUpload:{
    fontFamily: "PoppinsBold",
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  countDownWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily:"PoppinsBold"
  },
  uploadText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  uploadDescription: {
    textAlign: 'center',
    marginBottom: 10,
    fontFamily:"PoppinsBold"
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    padding: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  uploadButtonText: {
    marginLeft: 10,
  },
  image :{
    height:200,
    width:250,
  },
  dateTimeText: { // Style buat tanggalan
    fontSize: 14,
    marginBottom: 10,
    color: '#666',
  },
});