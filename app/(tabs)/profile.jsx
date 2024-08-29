import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function Profile() {
  return (
    <FlatList
      style={styles.container}
      ListHeaderComponent={<Text style={styles.title}>Akun</Text>}
      ListEmptyComponent={
        <View>
          <Image
            style={styles.imageProfile}
            source={require("@/assets/images/Allura.png")}
          />
          <Text style={styles.centerText}>Upss kamu belum memiliki akun. Mulai buat akun agar transaksi di TMMIN Car Rental lebih mudah</Text>
          <TouchableOpacity style={styles.button} onPress={()=> router.navigate("../(auth)/register")} >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      }
      viewabilityConfig={{
        waitForInteraction: true,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 15,
  },
  imageProfile: {
    justifyContent: 'center', 
    alignItems: 'center',
  },
  centerText: {
    fontFamily: "PoppinsBold",
    fontSize: 16,
    marginBottom: 15,
    alignSelf: 'center',
    textAlign :'center'
  },
  button: {
    backgroundColor: "#3D7B3F",
    paddingVertical: 8,  // Ukuran vertikal tombol diperkecil
    paddingHorizontal: 16, // Ukuran horizontal tombol diperkecil
    borderRadius: 5,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontFamily: "PoppinsBold",
    fontSize: 14,
    textAlign: 'center',
  },
});
