import React, { useCallback, useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";

// Import komponen
import CarList from "@/components/CarList";
import Button from "@/components/Button";

// Import Redux  buat actions dan  selectors
import { selectOrder,setStateByName } from "@/redux/reducers/order/orderSlice";
import { postOrder, } from "@/redux/reducers/order/orderApi";
import { selectCarDetails } from "@/redux/reducers/car/carDetailsSlice";
import { selectUser } from "@/redux/reducers/auth/loginSlice";

const formatCurrency = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

const paymentMethod = ["BCA", "MANDIRI", "BNI", "Permata"];

export default function Step1({ setActiveStep }) {
  const { data } = useSelector(selectCarDetails);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector(selectOrder);
  const [selectedBank, setSelectedBank] = useState('');
  const [promoCode, setPromoCode] = useState("");

  const formatIDR = useCallback((price) => formatCurrency.format(price), []);

  const handleOrder = () => {
    const formData = {
      startRentAt: moment().format('YYYY-MM-DD'),
      finishRentAt: moment().add(4, "days").format('YYYY-MM-DD'),
      carId: data.id,
    };

    dispatch(postOrder({
      token: user.data.access_token, formData: formData }));
  };

  useEffect(() => {
    if (status === "success") {
    } else {
      console.log(errorMessage)
    }
  }, [status])

  // const handlePromoApply = () => {
  //   // buat nnti promosi 
  //   console.log("Applying promo code:", promoCode);
  // };

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
      <Text style={styles.subText}>
        Kamu bisa membayar dengan transfer melalui ATM, Internet Banking atau
        Mobile Banking
      </Text>

      <View>
        {paymentMethod.map((method, index) => (
          <Button
            key={index} // tambahkan prop key yang unik
            style={styles.paymentMethod}
            onPress={() => {
              setSelectedBank(method)
              dispatch(setStateByName('selectedBank'))
              console.log(`selected bank ${selectedBank} - ${method}`)
            }}
          >
            <Text style={styles.paymentBox}>{method}</Text>
            <Text style={styles.paymentText}>{method} Transfer</Text>
            {selectedBank === method && (
              <Ionicons style={styles.checkmark} size={20} name="checkmark" />
            )}
          </Button>
        ))}
      </View>

      <View style={styles.promoContainer}>
        <Text style={styles.promoText}>% Pakai Kode Promo</Text>
        <View style={styles.wrapperInput}>
          <TextInput
            style={styles.formInput}
            placeholder="Tulis kode Promo disini"
            value={promoCode}
            onChangeText={setPromoCode}
          />
          <Button
            title="Terapkan"
            style={styles.promoButton}
            textStyle={styles.promoButtonText}
            // onPress={handlePromoApply}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>{formatIDR(data.price || 0)}</Text>
        <Button
          disabled={!selectedBank}
          color="#3D7B3F"
          onPress={() => {
            setActiveStep(1);
            handleOrder();
          }}
          title="Bayar"
        />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  textBold: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 10,
  },
  subText: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#7E7E7E",
    marginBottom: 15,
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
  promoContainer: {
    marginTop: 20,
    backgroundColor: "#F9F9F9",
    padding: 25,
    borderRadius: 8,
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
  },
  formInput: {
    flex: 1,
    paddingHorizontal: 10,
  },
  promoButton: {
    backgroundColor: "#3D7B3F",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  promoButtonText: {
    fontFamily: "PoppinsBold",
    color: "#FFF",
  },
  footer: {
    marginTop: 10,
    backgroundColor: "#eeeeee",
    padding: 20,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});