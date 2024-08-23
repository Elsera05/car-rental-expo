import { View, Text,Image,ScrollView } from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import {useState,useEffect} from 'react'
import { ScrollView } from 'react-native-gesture-handler';

export default function details() {
    const {id} = useLocalSearchParams();
    const [cars, setCars] = useState({});
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      const controller = new AbortController(); // UseEffect cleanup untuk menghindari memory Leak
      const signal = controller.signal;  // UseEffect cleanup
  
      setLoading(true); //loading state
      const getData = async () => {
        try{
          const response = await fetch(
            "https://api-car-rental.binaracademy.org/customer/car/" + id,
            { signal: signal }  // UseEffect cleanup jangan lupa tambahin slash buat si car nya 
          );
          const body = await response.json();
          setCars(body);
        } catch(e) { // Error Handling
          if (err.name === 'AbortError') {
            console.log('successfully aborted');
          } else {
            console.log(err)
          }
        }
      };
      getData();
      return () => {
          // cancel request sebelum component di close
          controller.abort();
      };
    }, []);
  return (
    <View>
    <ScrollView>
    <Text>{cars.name}</Text>
        <Image
            soure = {{uri: cars.image}}
        />
    </ScrollView>
      <Text>{cars.price} </Text>
    </View>
  )
}