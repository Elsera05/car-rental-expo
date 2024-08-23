import { Image, StyleSheet, View, Text, Button, } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import Constants from "expo-constants";
import { Col, Row } from "../../components/Grid";
import ButtonIcon from "../../components/ButtonIcon";
import CarList from "../../components/CarList";
import {useState, useEffect} from 'react';
import{router} from 'expo-router';
import listcar from "./(listcar)";
import details from "./(listcar)/details/[id]";

export default function HomeScreen() {
  const [cars,setCars] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(
        "https://api-car-rental.binaracademy.org/customer/car"
      );
      const body = await response.json();
      setCars(body)
    }
    getData()
  }, [] )

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A43333", dark: "#A43333" }}
      headerImage={
        <View style={styles.container}>
          <View>
            <Text style={styles.titleText}>Hi, Achmad</Text>
            <Text style={styles.titleText}>Jakarta utara</Text>
          </View>
          <View>
            <Image
              style={styles.imageProfile}
              source={require("@/assets/images/img_photo.png")}
            />
          </View>
        </View>
      }
    >
      {/* ini dinamakan props children */}
      <View style={styles.banner}>
        <View style={styles.bannerContainer}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerText}>
              Sewa Mobil Berkualitas di kawasanmu
            </Text>
            <Button color="#3D7B3F" title="Sewa Mobil" />
          </View>
          <View>
            <Image source={require("@/assets/images/img_car.png")} />
          </View>
        </View>
      </View>
      <View>
        <Row justifyContent={"space-between"}>
          <Col>
            <ButtonIcon name={"car-outline"} color={"#ffffff"} text={'Sewa Mobil'}/>
          </Col>
          <Col>
            <ButtonIcon name={"cube-outline"} color={"#ffffff"} text={'Oleh-Oleh'}/>
          </Col>
          <Col>
            <ButtonIcon name={"key-outline"} color={"#ffffff"} text={'Penginapan'}/>
          </Col>
          <Col>
            <ButtonIcon name={"camera-outline"} color={"#ffffff"} text={'Wisata'}/>
          </Col>
        </Row>
      </View>
      <View>
      {
        cars.length >0&& cars.map((el) => (
          <CarList
          key = {el.id}
          image={{uri: el.image}}
          carName={el.name}
          passengers={5}
          baggage={4}
          price={el.price}
          onPress={() =>
            router.navigate('(listcar)/details/' + el.id)
          }
        />
        ))
      }

      {/* kenapa tidak pakai && maka harus dijadikan >0&& karena jika menggunakan && ada redudansi data  */}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
  },
  titleText: {
    color: "#ffffff",
    fontFamily: "PoppinsBold",
  },
  imageProfile: {
    height: 35,
    width: 35,
  },
  banner: {
    backgroundColor: "#AF392F",
    marginTop: -140,
    overflow: "hidden",
    paddingTop: 20,
    borderRadius: 10,
  },
  bannerContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  bannerTextContainer: {
    width: "45%",
    padding: 10,
    paddingBottom: 25,
  },
  bannerText: {
    color: "#ffffff",
    fontFamily: "Poppins",
    fontSize: 16,
  },
});

// titleContainer: {
//   flexDirection: "row",
//   alignItems: "center",
//   gap: 8,
// },
// stepContainer: {
//   gap: 8,
//   marginBottom: 8,
// },
// reactLogo: {
//   height: 178,
//   width: 290,
//   bottom: 0,
//   left: 0,
//   position: "absolute",
// },
