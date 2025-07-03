import React from "react";
import Loader from "./loader";
import {
  View , 
  Text , 
  Image,
  FlatList,
  StyleSheet,
  Platform,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  useAnimatedValue,
  } from "react-native";
import Chp from "../chplist.json"
import CHPDATA from "../chp.json";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "react-native-vector-icons/Ionicons"
import {RFValue,RFPercentage} from "react-native-responsive-fontsize";
import {useState} from "react";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Animated ,{ useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
const {width,height} = Dimensions.get('window')

const ListItem = ({item,viewed,theme})=>{
  const {navigate} = useNavigation()
  const image={
    "1":require("./Chapter_1.jpg"),
    "2":require("./Chapter_2.jpg"),
    "3":require("./Chapter_3.jpg"),
    "4":require("./Chapter_4.jpg"),
    "5":require("./Chapter_5.jpg"),
    "6":require("./Chapter_6.jpg"),
    "7":require("./Chapter_7.jpg"),
    "8":require("./Chapter_8.jpg"),
    "9":require("./Chapter_9.jpg"),
    "10":require("./Chapter_10.jpg"),
    "11":require("./Chapter_11.jpeg"),
    "12":require("./Chapter_12.jpeg"),
    "13":require("./Chapter_13.jpeg"),
    "14":require("./Chapter_14.jpg"),
    "15":require("./Chapter_15.jpg"),
    "16":require("./Chapter_16.jpg"),
    "17":require("./Chapter_17.jpg"),
    "18":require("./Chapter_18.jpg"),
  }
  var id = item.item.id < 10 ? "0"+item.item.id : item.item.id
  const animStyle = useAnimatedStyle(()=>{
    const result = Boolean(viewed.value.find(view=> view.item.id == item.item.id))
    return {
      opacity :withTiming((result ? 1 :0),{duration:300}),
      transform:[{scale:withTiming((result ? 1 :0.6),{duration:300})}],      
    }
  },[])
  return(
    <Animated.View style={[animStyle]} >
      <TouchableOpacity style={[styles.listCard,{borderBottomColor:theme=="Dark"?"#000000":"#2F2F2F",borderBottomWidth:5,borderRadius:RFValue(30),backgroundColor:theme=="Dark"?"#000000":"#2F2F2F"}]} 
      onPress={()=>{navigate("Verse",
        {
          chid : item.item.id,
          chname:item.item.name,
          chogname:item.item.ogname,
          theme:theme
        })}}>
        <View>
            <View style={[styles.listSub,{backgroundColor:theme=="Dark"?"#F4A300":"#FFA536",borderColor:theme=="Dark"?"#D4AF37":"#CC7400",borderWidth:5}]} >
              <Image source={image[item.item.id]} style={{borderColor:theme=="Dark"?"#F4A300":"#FF7700",borderWidth:0,height:"100%",width:"47.5%",borderRadius:RFValue(15)}} resizeMode="stretch" />
              <View style={[styles.innerView,{marginTop:RFValue(10)}]}>
                <Text style={[styles.subText,{color:theme=="Dark"?"#1A1A1A":"#000000",}]}>{id}. {item.item["name-trans"]}</Text>
                <Text style={[styles.subText,{color:theme=="Dark"?"#1A1A1A":"#000000",}]}>{item.item.ogname}</Text>
                <Text style={[styles.subText,{color:theme=="Dark"?"#1A1A1A":"#000000",}]}>({item.item.name})</Text>
                <Text style={[styles.subText,{color:theme=="Dark"?"#1A1A1A":"#000000",marginTop:RFValue(10),}]}>{item.item.desc}</Text>
              </View>
            </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const Chplist=()=>{
  const { navigate } = useNavigation();

  const[info,setInfo]=useState(null)
  const[theme,setTheme]=useState(null)
  const[loader,setLoader] = useState(true)
  const viewed = useSharedValue([])
  fetch=async()=>{
    const bg = await AsyncStorage.getItem('Theme')
    setTheme(bg)
    const value = await AsyncStorage.getItem('Recent')
    const data = JSON.parse(value)
    if(data == null){
      AsyncStorage.setItem('Recent',JSON.stringify(Chp['1'][0]))
      setInfo(Chp['1'][0])
    }
    else{
      setInfo(data)
    }
  }


  const showLoader=()=>{
    setLoader(true)
    const timer = setInterval(()=>{
      setLoader(false)
    },3000)
  }

  useFocusEffect( 
    React.useCallback(() => { 
      console.log('Screen is focused.');
      fetch()
      showLoader()
      return(()=>{setLoader(true)})
    }, []));


  const renderItem =(item)=>{
    return(
      <ListItem item={item} viewed={viewed} theme={theme} />
    )  
  }

  if(loader){
    return(
      <Loader/>
    )
  }
  else if(info!=null){
    return(
      <View style={[styles.droidSafeArea,{flex:1,backgroundColor:theme=="Dark"?"#1E1E1E":"#ffffff"}]}>
        <ScrollView style={{marginTop:RFValue(10)}} showsVerticalScrollIndicator={false} >
          <View style={{flex:1}} >
            <View>
              <View>
                <TouchableOpacity style={{marginRight:15,marginTop:15,alignSelf:"flex-end"}} 
                onPress={()=>{
                  
                  AsyncStorage.setItem('Theme',theme=="Dark"?"Light":"Dark")
                  setTheme(theme=="Dark"?"Light":"Dark")
                }}
                >
                  <Ionicons name={theme == "Dark" ? "moon":"sunny"} style={{fontSize:30,color:theme=="Dark"?"#E0E0E0":"#202020"}} />
                </TouchableOpacity>
              </View>
              <View style={{marginTop:5}} >
                <Text style={[styles.text,{color:theme=="Dark"?"#E0E0E0":"#202020",fontWeight:"bold",marginBottom:0.025*height}]} >Last Read Verse : </Text>  
                <TouchableOpacity style={[styles.card,{marginBottom:0.025*height,borderBottomColor:theme=="Dark"?"#000000":"#2F2F2F",backgroundColor:theme=="Dark"?"#000000":"#2F2F2F",borderBottomWidth:5,borderRadius:RFValue(25)}]}
                onPress={()=>{
                  navigate("Hverse",{cid:info.verno ,chpid : info.chp , chpname : info.name,theme:theme})
                }}>
                  <View style={{backgroundColor:theme=="Dark"?"#F4A300":"#FFA536",borderColor:theme=="Dark"?"#D4AF37":"#CC7400",borderWidth:5,borderRadius:RFValue(15)}}>
                      <View style={[styles.sub,{color:theme=="Dark"?"#1A1A1A":"#000000",justifyContent:"center",alignItems:"center"}]}>
                        <Text style={[styles.subText1,{color:theme=="Dark"?"#1A1A1A":"#000000",textAlign:"center",fontSize:RFPercentage(2.35)}]} >Chapter {info.chp} Verse {info.verno}</Text>
                        <Text style={[styles.subText1,{color:theme=="Dark"?"#1A1A1A":"#000000",textAlign:"center",fontSize:RFPercentage(2.15)}]} >{info.shlok}</Text>
                      </View>
                  </View>
                </TouchableOpacity>
                <Text style={[styles.text,{color:theme=="Dark"?"#E0E0E0":"#202020",fontWeight:"bold",fontFamily:"Roboto"}]} >Chapters </Text>
              </View>
              <FlatList
                  data={CHPDATA}
                  style={{alignSelf:"center",marginTop:0.025*height,marginBottom:0.05*height}}
                  renderItem={renderItem}
                  horizontal={true}
                  pagingEnabled={true}
                  keyExtractor={item => item.id}
                  onViewableItemsChanged={({viewableItems})=>{
                    console.log(viewableItems)
                    viewed.value = viewableItems
                  }}
                  viewabilityConfig={{itemVisiblePercentThreshold:40}}
                  bounces={false}
                  showsHorizontalScrollIndicator = {false} />
            </View>
          </View>
        </ScrollView>
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
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} >
              <Ionicons name={"book"} style={{fontSize:RFPercentage(4),color:theme=="Dark"?"#F4A300":"#CC7400"}} />
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} 
              onPress={()=>{
                navigate("Bookmark",{theme:theme})
              }}
            >
              <Ionicons name={"bookmarks-outline"} style={{fontSize:RFPercentage(4),color:theme=="Dark"?"#dfdfdf":"#313131"}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  else if(!theme){
    return(
      <Loader/>
    )
  }
}

export default Chplist

const styles = StyleSheet.create({
  text:{
    color:"#efefef",
    fontSize:RFValue(25),
    marginLeft:RFValue(10),
  },
  subText:{
    color:"#efefef",
    fontSize:RFPercentage(2.1),
    fontWeight:"bold",
    marginTop:RFValue(0),
    marginLeft:RFValue(10),
    marginRight:RFValue(5),
    textAlign :"left",
  },
  subText1:{
    color:"#efefef",
    fontWeight:"bold",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    height:"auto",width:"100%"
  },
  card:{
    width:"95%",
    height:"auto",
    justifyContent:"center",
    alignSelf:"center",
    borderRadius:RFValue(15),
    marginRight:RFValue(10),
    marginLeft:RFValue(10),
  },
  listCard:{
    width:0.95*width,
    height:0.5*height,
    justifyContent:"center",
    alignSelf:"center",
    marginRight:0.025*width,
    marginLeft:0.025*width,
  },
  sub:{
    display:"flex",
    flexDirection:"column",
    width:"100%",
    marginTop:RFValue(10),
    marginBottom:RFValue(0)
  },
  listSub:{
    display:"flex",
    flexDirection:"row",
    width:"100%",
    height:"100%",
    borderRadius:RFValue(20)
  },
  main:{
    verticalAlign:"top",
    textAlignVertical:"top",
    height:"100%",
    width:"95%"
  },
  innerView:{
    marginRight:RFValue(5),
    width:"52.5%",
    height:"100%"
  },
  mainHeader:{
    height:RFValue(75),
    backgroundColor:"#424242",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    borderColor:"grey",
    borderTopColor:"grey",
    borderWidth:RFValue(1),
  },

})