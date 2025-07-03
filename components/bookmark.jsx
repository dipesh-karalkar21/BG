import React from "react";
import {
  View , 
  Text , 
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "react-native-vector-icons/Ionicons"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {RFValue,RFPercentage} from "react-native-responsive-fontsize";
import { useFocusEffect ,useRoute} from "@react-navigation/native";
import Loader from "./loader";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
const {width,height} = Dimensions.get('window')

const ListItem = ({item,viewed,theme})=>{
  const {navigate} = useNavigation()
  const animStyle = useAnimatedStyle(()=>{
    const result = Boolean(viewed.value.find(view=>view.item.verno === item.item.verno && view.item.chp === item.item.chp))
    return {
      transform:[{scale:withTiming((result ? 1 : 0.6),{duration:300})}],
      opacity : withTiming((result ? 1 :0),{duration:300})
    }
  })
  return(
    <Animated.View style={[animStyle]} >
      <TouchableOpacity style={[styles.card,{marginBottom:0.025*height,borderBottomColor:theme=="Dark"?"#000000":"#2F2F2F",backgroundColor:theme=="Dark"?"#000000":"#2F2F2F",borderBottomWidth:5,borderRadius:RFValue(25)}]}
      onPress={()=>{navigate("Hverse",{cid:item.item.verno ,chpid : item.item.chp , chpname : item.item.chp,theme:theme})}}>
        <View style={{backgroundColor:theme=="Dark"?"#F4A300":"#FFA536",borderColor:theme=="Dark"?"#D4AF37":"#CC7400",borderWidth:5,borderRadius:RFValue(15)}} >
          <View style={styles.sub}>
            <Text style={[styles.subText,{color:theme=="Dark"?"#1A1A1A":"#000000",fontSize:RFPercentage(2.2)}]}>Chapter {item.item.chp} Verse {item.item.verno}</Text>
            <Text style={[styles.subText,{color:theme=="Dark"?"#1A1A1A":"#000000",fontSize:RFPercentage(2.2)}]}>{item.item.shlok}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const BookMark=()=>{
  const { navigate } = useNavigation();
  const {params} = useRoute()
  const[theme,setTheme]=useState(params.theme)
  const[data,setData] = useState(null);
  const[isFetching,setIsFetching] = useState(true)
  const viewed = useSharedValue([])

  useFocusEffect(
    React.useCallback(() => { 
      console.log('Screen is focused');
      getData(); 
      
      return () => {setIsFetching(true)};
  }, []));

  async function getData(){
    setData(JSON.parse(await AsyncStorage.getItem('BookMark')))
    setIsFetching(false)
  }
  useEffect(()=>{
    getData()
  },[])
  
  const renderItem =(item)=>{
    return(
      <ListItem item={item} viewed={viewed} theme={theme} />
    )    
  }

  if(isFetching){
    return(
      <Loader/>
    )
  }
  else if(data!=null && data.length != 0 && isFetching!=true){
    return(
      <View style={[{backgroundColor:theme=="Dark"?"#1E1E1E":"#ffffff",flex:1},styles.droidSafeArea]}>
        <View>
          <FlatList
              data={data}
              style={{width:"100%",height:"93%"}}
              renderItem={renderItem}
              ListHeaderComponent={()=>{
                return(
                  <View style={{marginTop:0.05*height}} >
                    <Text style={[styles.text,{fontWeight:"bold",marginBottom:0.01*height,color:theme==="Dark"?"white":"black"}]} >Bookmarks </Text>
                  </View>
                )
              }}
              ListFooterComponent={()=>{
                return(
                  <View style={{height:0.01*height}} ></View>
                )
              }}
              onViewableItemsChanged={({viewableItems})=>{
                viewed.value = viewableItems
              }}
              keyExtractor={item => `${item.chp}.${item.verno}`}
              bounces={false}
              initialNumToRender={20}
              />
          </View>
          <View style={{height:"7%"}} ></View>
          <View style={{position:"absolute",width:"100%",top:"90%",height:"10%",borderTopEndRadius:RFValue(25),borderTopStartRadius:RFValue(25)}} >
            <View style={{width:"100%",backgroundColor:theme=="Dark"?"#313131":"#dfdfdf",flex:1,justifyContent:"space-evenly",flexDirection:"row",borderTopEndRadius:RFValue(35),borderTopStartRadius:RFValue(35),borderColor:theme=="Dark"?"#000000":"#2F2F2F",borderWidth:2,borderBottomWidth:0}}>
              <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} 
                onPress={()=>{
                navigate("Bhakti",{theme:theme})
              }}
              >
                <MaterialCommunityIcons name="hands-pray" style={{fontSize:RFPercentage(4),color:theme=="Dark"?"#dfdfdf":"#313131"}} />
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} 
                onPress={()=>{
                  navigate("Home")
                }}
              >
                <Ionicons name={"book-outline"} style={{fontSize:RFPercentage(4),color:theme=="Dark"?"#dfdfdf":"#313131"}} />
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} 
                onPress={()=>{
                  navigate("Bookmark")
                }}
              >
                <Ionicons name={"bookmarks"} style={{fontSize:RFPercentage(4),color:theme=="Dark"?"#F4A300":"#CC7400"}} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
  else{
    return(
      <View style={{flex:1,backgroundColor:theme==="Dark"?"black":"white"}} >
        <View style={{marginTop:0.05*height,backgroundColor:theme==="Dark"?"black":"white",flex:1}} >
          <Text style={[styles.text,{fontWeight:"bold",marginBottom:0.01*height,color:theme==="Dark"?"white":"black"}]} >Bookmarks </Text>
          <Text style={[styles.text,{fontSize:RFValue(15),fontWeight:"bold",marginBottom:0.01*height,marginLeft:RFValue(0),color:theme==="Dark"?"white":"black",textAlign:"center",width:"100%"}]} >You don't have any bookmarks yet</Text>
        </View>
        <View style={{height:"7%"}} ></View>
          <View style={{position:"absolute",width:"100%",top:"90%",height:"10%",borderTopEndRadius:RFValue(25),borderTopStartRadius:RFValue(25)}} >
            <View style={{width:"100%",backgroundColor:theme=="Dark"?"#313131":"#dfdfdf",flex:1,justifyContent:"space-evenly",flexDirection:"row",borderTopEndRadius:RFValue(35),borderTopStartRadius:RFValue(35),borderColor:theme=="Dark"?"#000000":"#2F2F2F",borderWidth:2,borderBottomWidth:0}}>
              <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} >
                <MaterialCommunityIcons name="hands-pray" style={{fontSize:RFPercentage(4),color:theme=="Dark"?"#dfdfdf":"#313131"}} />
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} 
                onPress={()=>{
                  navigate("Home")
                }}
              >
                <Ionicons name={"book-outline"} style={{fontSize:RFPercentage(4),color:theme=="Dark"?"#dfdfdf":"#313131"}} />
              </TouchableOpacity>
              <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} >
                <Ionicons name={"bookmarks"} style={{fontSize:RFPercentage(4),color:theme=="Dark"?"#F4A300":"#CC7400"}} />
              </TouchableOpacity>
            </View>
          </View>
      </View>
    )
  }

}

export default BookMark


const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(25),
    fontFamily:"sans-serif-medium",
    marginLeft:RFValue(10)
  },
  subText:{
    color:"white",
    fontSize:RFValue(14),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(8),
    textAlign :"center"
  },
  subText1:{
    color:"#E2E2E2",
    fontSize:RFValue(14),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(8),
    textAlign :"center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    height:"auto",width:"100%"
  },
  card:{
    backgroundColor: "rgba(73, 73, 73 ,0.5)",
    width:"95%",
    justifyContent:"center",
    alignSelf:"center",
    marginBottom : RFValue(5),
    marginTop:RFValue(5),
    borderRadius:RFValue(15),
    height:"auto"
  },
  sub:{
    display:"flex",
    flexDirection:"column",
    width:"100%",
    marginTop:RFValue(10),
    marginBottom:RFValue(0)
  },
  main:{
    margin:RFValue(10),
    textAlign:"center",
    alignItems:"center",
    width:"95%",
  },
  mainHeader:{
    height:RFValue(65),
    backgroundColor:"#424242",
    alignItems:"center",
    flexDirection:"row",
    borderColor:"grey",
    borderTopColor:"grey",
    borderWidth:RFValue(1),
    width:width,
    justifyContent:"space-evenly"
  }
})