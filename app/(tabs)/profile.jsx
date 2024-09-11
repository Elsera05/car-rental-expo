import { View, Button } from "react-native";
import React,{useEffect} from "react";
import { router } from "expo-router";
import { useDispatch,useSelector } from "react-redux";
import { selectUser,logout } from "../../redux/reducers/auth/loginSlice";

export default function profile(){ 
  const {data,} = useSelector(selectUser)

  useEffect(()=>{
    console.log(data)
  },[data])

  const dispatch = useDispatch()
  return (
    <View style={{flex:1,justifyContent:'center'}} >
      {
        data.access_token ?   
        <Button title={"logout"}  onPress={()=>{
          dispatch(logout())
          router.replace('../(auth)')
        }} />
        :
        <Button title={"Register"} onPress={()=>
          router.replace('../(auth)/register')
        } />
      }  
    </View>
  );
}