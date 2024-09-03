import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import * as SecureStore from 'expo-secure-store';
import { useColorScheme } from '@/hooks/useColorScheme';
import {store} from '../redux/store';
import { Provider } from 'react-redux';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
 
function getUser(){
  return SecureStore.getItem("user")
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Poppins : require('../assets/fonts/Poppins-Regular.ttf'),
    PoppinsBold : require('../assets/fonts/Poppins-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      setTimeout(() => {
        if (getUser()) router.navigate('/(tabs)')
      },200)

      setTimeout(()=>{
        SplashScreen.hideAsync();
      })
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Provider store={store}>
      <Stack initialRouteName=''>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(order)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </Provider>
    </ThemeProvider>
  );
}














































// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { router, Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import * as SecureStore from 'expo-secure-store';
// import { useColorScheme } from '@/hooks/useColorScheme';
// import {store,persistor} from '../redux/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();
 
// async function getUser(){
//   // await SecureStore.deleteItemAsync("user")
//   return await SecureStore.getItemAsync("user")
// }

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//     Poppins : require('../assets/fonts/Poppins-Regular.ttf'),
//     PoppinsBold : require('../assets/fonts/Poppins-Bold.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       (async ()=>{
//         getUser()
//       })
//       setTimeout(()=>{
//         if(getUser()) router.replace('/(tabs)')
//           SplashScreen.hideAsync();
//       },200)
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
    
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Provider store={store}>
//       <PersistGate persistor={persistor}>
//       <Stack>
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       </PersistGate>
//       </Provider>
//     </ThemeProvider>
//   );
// }

// {/* <Stack initialRouteName=''></Stack> */}