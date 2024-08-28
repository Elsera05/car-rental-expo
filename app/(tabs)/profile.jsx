import { View, Text, StyleSheet, FlatList,Image,Button } from "react-native";
import React from "react";

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
          {/* <Button></Button> */}
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
    alignSelf:'center'
,
  },
  
});
