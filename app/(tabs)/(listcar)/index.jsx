import {
  StyleSheet,
  FlatList,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect, useCallback } from "react";
import CarList from "@/components/CarList";
import Constants from "expo-constants";
import { router } from "expo-router";

import { useSelector, useDispatch } from "react-redux";
import { getCar, selectCar } from "@/redux/reducers/car/carSlice";

export default function listcar() {
  const { data, isLoading } = useSelector(selectCar);
  const dispatch = useDispatch();

  useEffect(() => {
    const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
    const signal = controller.signal; // UseEffect cleanup

    dispatch(getCar(signal));

    return () => {
      // cancel request sebelum component di close
      controller.abort();
    };
  }, []);

  const renderItem = useCallback(
    ({item}) => {
      return <CarList
        key={item.id}
        image={{ uri: item.image }}
        carName={item.name}
        passengers={5}
        baggage={4}
        price={item.price}
        onPress={() => router.push("details/" + item.id)}
      />
    },
    []
  );

  return (
    <View>
      <Text style={styles.title}>Daftar Mobil</Text>
      <FlatList
        style={styles.container}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator
              style={{ marginTop: 30 }}
              animating={true}
              size="large"
              color="#00ff00"
            />
          ) : (
            <View>
              <Text>0 results</Text>
            </View>
          )
        }
        renderItem={renderItem}
        viewabilityConfig={{
          waitForInteraction: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    paddingTop: Constants.statusBarHeight + 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    fontFamily: "PoppinsBold",
    fontSize: 16,
  },
});
