import React from "react";
import {
  View , 
  Text , 
  FlatList,
  StyleSheet,
  Platform,
  StatusBar,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect } from "react";
import {useCallback, useRef } from "react";
import { useFocusEffect, useRoute } from "@react-navigation/core";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import chplist from "../chplist.json";
import Chp from "../chp.json"
import {RFValue} from "react-native-responsive-fontsize";
import Loader from "./loader";
const {width,height} = Dimensions.get('window')
var value = []
const Hverse=()=>{ 
  const {params} = useRoute()
  var chpid = parseInt(params.chpid)
  var theme = params.theme
  const[chps,setChps] = useState(chplist[chpid])
  const[cid,setCid] = useState(params.cid)
  const[rerender, setRerender] = useState(true)
  const[refreshing,setRefreshing] = useState(false); 
  const[zIndex,setZindex]=useState(2);
  const flatListRef = useRef(null);   
  const getBookMark =async()=>{
    const val = await AsyncStorage.getItem('BookMark')
    if(val!=null){value = JSON.parse(val)}
  }

  const showLoader=()=>{
    const timer = setInterval(()=>{
      setZindex(0)
      clearInterval(timer)
    },3000)
  }

  useEffect(()=>{
    flatListRef.current?.scrollToIndex({index:cid})
    //flatListRef.scrollToIndex({index : cid})
    getBookMark()
    showLoader()
  },[cid])

  const renderItem =useCallback((item)=>{
    var bookmark = "bookmark-outline"
    for(var i in value){
      if(value[i].verno == item.item.verno && value[i].chp == item.item.chp){
        bookmark = "bookmark"
      }
    }
    
    if(item.item.verno > 0){return(
      <View style={[styles.card]}>
      <ScrollView contentContainerStyle={styles.main} showsVerticalScrollIndicator={false}>
      <Text> </Text>
      <TouchableOpacity 
        onPress={()=>{
          var status = "added"
          for(i in value){
            if(value[i].verno == item.item.verno && value[i].chp == item.item.chp){
              value.splice(i,1)
              status = "removed"
            }
          }   

          if(status == "added"){
            value.push(item.item)
          }
          
          for(var j = 0;j<(value.length - 1);j++){
            for(var k = 0;k<(value.length - j - 1);k++){
              if(parseInt(value[k].chp) > parseInt(value[k+1].chp)){
                var temp = value[k]
                value[k] = value[k+1]
                value[k+1] = temp
              }
              else if(parseInt(value[k].chp) == parseInt(value[k+1].chp)){
                if(parseInt(value[k].verno) > parseInt(value[k+1].verno)){
                  var temp = value[k]
                  value[k] = value[k+1]
                  value[k+1] = temp
                }
              }
            }
          }
          AsyncStorage.setItem('BookMark',JSON.stringify(value))
          setRerender(!rerender)  
        }}
        style={{alignSelf:"flex-end",marginTop:RFValue(40),position:"absolute",zIndex:1}} >
      <Ionicons name={bookmark} style={[styles.subText1,{color:theme=="Dark"?"#efefef":"#161616"}]} />
      </TouchableOpacity>
      <Text style={[styles.subText,{fontSize:RFValue(17.5),color:theme=="Dark"?"#efefef":"#161616",marginTop:RFValue(30)}]}>
        Chapter {item.item.chp} Verse {item.item.verno}
      </Text>
      <View style={{height:RFValue(4),width:RFValue(200),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100),backgroundColor:theme=="Dark"?"#F4A300":"#FFA536"}} ></View>
      <Text style={[styles.subText,{color:theme=="Dark"?"#efefef":"#161616"}]}>{item.item.shlok}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17),color:theme=="Dark"?"#efefef":"#161616"}]}>
        Transliteration
      </Text>
      <View style={{height:RFValue(4),width:RFValue(150),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100),backgroundColor:theme=="Dark"?"#F4A300":"#FFA536"}} ></View>
      <Text style={[styles.subText,{color:theme=="Dark"?"#efefef":"#161616"}]}>{item.item.translit}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17),color:theme=="Dark"?"#efefef":"#161616"}]}>
        Translation
      </Text>
      <View style={{height:RFValue(4),width:RFValue(150),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100),backgroundColor:theme=="Dark"?"#F4A300":"#FFA536"}} ></View>
      <Text style={[styles.subText,{color:theme=="Dark"?"#efefef":"#161616"}]}>{item.item.translate}</Text>
      <Text> </Text>
      <Text style={[styles.subText,{fontSize:RFValue(17),color:theme=="Dark"?"#efefef":"#161616"}]}>
        Purport
      </Text>
      <View style={{height:RFValue(4),width:RFValue(100),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100),backgroundColor:theme=="Dark"?"#F4A300":"#FFA536"}} ></View>
      <Text style={[styles.subText,{color:theme=="Dark"?"#efefef":"#161616"}]}>{item.item.sridhara}</Text>
      <Text> </Text>
      <Text> </Text>
      </ScrollView>
      </View>
    );}
    else{
      return(
        <View style={{height:height,width:width,justifyContent:"center",alignItems:"center"}}>
          <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"#efefef":"#161616"}]}>Chapter {item.item.chp}</Text>
          <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"#efefef":"#161616"}]}> {Chp[parseInt(item.item.chp)-1].name} </Text>
          <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"#efefef":"#161616"}]}> ({Chp[parseInt(item.item.chp)-1]["name-trans"]}) </Text>
          <TouchableOpacity onPress={loadMorePrevious} style={{display : item.item.chp == 1 ? "none" : "flex"}} >
            <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"#F4A300":"#CC7400"}]}>Previous Chapter </Text>
          </TouchableOpacity>
        </View>
      )  
    }
  },[rerender])

  const ListFooterComponent =useCallback(()=>{
    return(
      <View style={{height:height,width:width,justifyContent:"center",alignItems:"center"}}>
        <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"#efefef":"#161616"}]}>Thus Ends Bhagavad Gita</Text>
        <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"#efefef":"#161616"}]}>Chapter {chpid}</Text>
        <Text> </Text>
        <TouchableOpacity onPress={loadMore} style={{display : chpid == 18 ? "none" : "flex"}} >
          <Text style={[styles.subText,{fontSize:RFValue(20),color:theme=="Dark"?"#F4A300":"#CC7400"}]}>Next Chapter </Text>
        </TouchableOpacity>
      </View>
    )
  },[chpid])

  const loadMore =useCallback(()=>{
    setZindex(2)
    showLoader()
    setRefreshing(true)
    setTimeout(()=>{
      setChps(chplist[`${parseInt(chpid)+1}`])
      chpid += 1
      setCid(1)
      setRefreshing(false)
    },0)
  },[])
  
  const loadMorePrevious = useCallback(()=>{
    setZindex(2)
    showLoader()
    setRefreshing(true)
    setTimeout(()=>{
      setChps(chplist[`${parseInt(chpid)-1}`])
      chpid -= 1
      setCid((chplist[`${chpid}`]).length-1)
      setRefreshing(false)
    },0)
  },[])


  return(
    <View style={{backgroundColor:"black",flex:1}} >
    <Loader zindex={zIndex} />
    <FlatList
      ref={flatListRef}
      data={chps}
      renderItem={renderItem}
      style={{zIndex:1,backgroundColor:theme=="Dark"?"#161616":"#efefef",position:"absolute"}}
      horizontal={true}
      ListFooterComponent={ListFooterComponent}
      showsHorizontalScrollIndicator={false}
      keyExtractor={useCallback(item=>(item.verno))}
      pagingEnabled
      initialNumToRender={20}
      maxToRenderPerBatch={80}
      updateCellsBatchingPeriod={3}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          if(viewableItems[0].item.verno !=0){
            const currentVerse = viewableItems[0].item;
            AsyncStorage.setItem('Recent',JSON.stringify(currentVerse))
          }
        }
      }}
      viewabilityConfig={{itemVisiblePercentThreshold:95,}}
      bounces={false}
      refreshing={refreshing}
      getItemLayout={(data,index)=>({length : width , offset:width*index , index})}
        />
    </View>
  )
}

export default Hverse

const styles = StyleSheet.create({
  text:{
    color:"white",
    fontSize:RFValue(25),
    fontFamily:"sans-serif-medium"
  },
  subText1:{
    color:"black",
    fontSize:RFValue(30),
    fontWeight:"Bold",
    textAlign :"right",
    marginRight:RFValue(10),
    alignSelf:"flex-end"
  },
  subText:{
    color:"white",
    fontSize:RFValue(17),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(10),
    textAlign :"center",
    textShadowColor:"white",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
    height:"100%",width:width,backgroundColor: "white"
  },
  card:{
    width:width,
    justifyContent:"center",
    alignItems:"center",
    flex:1
  },
  main:{
    width:"100%",
  },
  main2:{
    width:"100%",
  },
  hr:{
    width : RFValue(120),
    height:RFValue(5),
    backgroundColor:"#ff7722",
    borderRadius:RFValue(50),
    alignSelf:"center"
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
  },
})