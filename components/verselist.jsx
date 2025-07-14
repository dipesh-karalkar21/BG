import React, { useCallback, useEffect, useState } from "react";
import {
  View , 
  Text , 
  ImageBackground,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  } from "react-native";
import { useNavigation,useRoute } from "@react-navigation/native";
import Animated,{useSharedValue,withTiming,useAnimatedStyle} from "react-native-reanimated";
import { useFocusEffect } from "@react-navigation/native";
import chplist from "../chplist.json"
import {RFValue,RFPercentage} from "react-native-responsive-fontsize";
import Loader from "./loader";
const {width,height} = Dimensions.get('window')

const ListItem=({item,viewed,theme})=>{
  const {navigate} = useNavigation()
  
  const animStyle = useAnimatedStyle(()=>{
    const result = Boolean(viewed.value.find(view=>view.item.verno === item.item.verno))
    return {
      opacity:withTiming((result ? 1 :0),{duration:300}),
      transform:[{scale:withTiming((result ? 1 :0.6),{duration:300})}]}
  })

  if(item.item.verno > 0){
      return(
        <Animated.View style={[animStyle]} >
          <TouchableOpacity style={[styles.card,{borderBottomColor:theme=="Dark"?"#000000":"#2F2F2F",backgroundColor:theme=="Dark"?"#000000":"#2F2F2F",borderBottomWidth:5,borderRadius:RFValue(25)},]} 
            onPress={()=>{navigate("Hverse",{cid:item.item.verno ,chpid : item.item.chp ,theme:theme})}}>
            <View style={{backgroundColor:theme=="Dark"?"#F4A300":"#FFA536",borderColor:theme=="Dark"?"#D4AF37":"#CC7400",borderWidth:5,borderRadius:RFValue(15)}} >
              <View style={[styles.sub,{}]}>
                <Text style={[styles.subText,{color:theme=="Dark"?"#1A1A1A":"#000000",fontSize:RFPercentage(2.2)}]}>{item.item.verno}</Text>
                <Text style={[styles.subText,{color:theme=="Dark"?"#1A1A1A":"#000000",fontSize:RFPercentage(2.2)}]}>{item.item.shlok}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </Animated.View>
      )
    }

  
}

const Verselist=()=>{
  const {params} = useRoute()
  const navigation = useNavigation()
  const[loader,setLoader] = useState(true)
  const theme = params.theme
  const chpid = params.chid
  const chpid1 = chpid < 10 ? "0"+chpid : chpid
  const main = chplist[chpid]
  const chpogname = params.chogname
  const viewed = useSharedValue([])
  
  const showLoader=()=>{
    const timer = setInterval(()=>{
      setLoader(false)
      clearInterval(timer)
    },2000)
  }

  useEffect(()=>{
    showLoader()
  })

  const renderItem =(item)=>{
    return(
      <ListItem item={item} viewed={viewed} theme={theme} />
    )
  }

  if(theme!=null && !loader){
    return(
      <View style={{backgroundColor:theme=="Dark"?"#161616":"#efefef",flex:1}}>
        <View style={{flex:1,marginTop:0.055*height}} >
          <FlatList
              data={main}
              style={{height:0.925*height}}
              renderItem={renderItem}
              ListFooterComponent={()=>{
                return(
                  <View style={{height:height*0.02}} ></View>
                )
              }}
              ListHeaderComponent={()=>{
                return(
                  <View style={{width:"100%",justifyContent:"center",alignItems:"center"}} >
                    <Text style={[styles.text,{fontWeight:"bold",fontFamily:"serif",marginBottom:0.025*height,alignSelf:"center",textAlign:"center",color:theme=="Dark"?"white":"black",fontSize:RFPercentage(3.5)}]} >Chapter {chpid1} : {chpogname}</Text>
                    <Image source={require("./Krishna.png")} style={{height:RFValue(255),width:RFValue(350),}} ></Image>
                  </View>
                )
              }}
              keyExtractor={item => item.verno}
              bounces={false}
              initialNumToRender={20}
              onViewableItemsChanged={({viewableItems})=>{
                viewed.value = viewableItems
              }}
              ItemSeparatorComponent={()=>{
                return(
                  <View style={{marginTop:RFValue(5)}} ></View>
                )
              }}
              />
        </View>
      </View>
    )
  }
  else{
    return(
      <Loader/>
    )
  }
}

export default Verselist


const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(20),
    fontFamily:"sans-serif-medium"
  },
  subText:{
    color:"white",
    fontSize:RFValue(13),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(8),
    textAlign :"center"
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    height:"auto",width:"100%",backgroundColor:"white"
  },
  card:{
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
    height:"auto",
    flexDirection:"column",
    width:"100%",
    marginTop:RFValue(5),
    marginBottom:RFValue(0)
  },
})