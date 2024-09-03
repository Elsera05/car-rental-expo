import { View, Text, TextInput, StyleSheet } from "react-native";
import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectOrder } from "@/redux/reducers/order/orderSlice";
import { selectCarDetails } from "@/redux/reducers/car/carDetailsSlice";
import CarList from "@/components/CarList";
import Button from "@/components/Button";
import { Ionicons } from "@expo/vector-icons";


const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethod = ["BCA", "MANDIRI", "BNI", "Permata"];

export default function Step1({ setActiveStep }) {
  const { carId } = useSelector(selectOrder);
  const { data } = useSelector(selectCarDetails);
  const formatIDR = useCallback((price) => formatCurrency.format(price), []);
  const [selectedMethod, setSelectedMethod] = useState(null);

  return (
    <View style={styles.container}>
      <CarList
        image={{ uri: data.image }}
        carName={data.name}
        passengers={5}
        baggage={4}
        price={data.price}
      />
      <Text style={styles.textBold}>Pilih Bank Transfer</Text>
      <Text style={styles.textBold}>
        Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
        Mobile Banking
      </Text>
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
              <Ionicons style={styles.checkmark} size={20} name={"checkmark"} />
            )}
          </Button>
        ))}
      </View>
      <View style={styles.promoContainer}>
        <Text style={styles.promoText}>% Pakai Kode Promo</Text>
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.formInput}
            placeholder=" Tulis kode Promo disini"
          />
          <Button
            title={"Terapkan"}
            style={styles.promoButton}
            textStyle={styles.promoButtonText}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
        <Button
          disabled={!selectedMethod}
          color="#3D7B3F"
          onPress={() => {
            setActiveStep(1);
          }}
          title="Lanjutkan Pembayaran"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },
  paymentMethod: {
    flexDirection: "row",
    alignItems: "center", // Center vertically for better alignment
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
    marginLeft: "auto", // Move the checkmark to the right end
    color: "#4CAF50",
  },
  subText: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#7E7E7E",
    marginBottom: 15,
  },
  footer: {
    marginTop: 20,
    backgroundColor: "#eeeeee",
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    // padding: 20,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  promoText: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    marginBottom: 10,
  },
  promoButton: {
    backgroundColor: "#3D7B3F",
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: "40%",
  },
  promoButtonText: {
    fontFamily: "PoppinsBold",
    color: "#FFF",
  },
  promoContainer: {
    marginTop: 20,
    backgroundColor: "#F9F9F9",
    padding: 25,
    borderRadius: 8,
    
  },
  wrapperInput: {
    flexDirection: "row",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#3d7b3f",
  },
  formInput: {
    width: "60%",
  },
});
