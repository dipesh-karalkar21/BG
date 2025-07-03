import React from "react";
import { useEffect,useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from "react-native-vector-icons/Ionicons"
import { 
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar, 
    Dimensions,
    FlatList,
    Image,
    TouchableOpacity,
    ScrollView
} from "react-native";
import bhaktiList from "../bhakti.json"
import { useFocusEffect,useRoute } from "@react-navigation/native";
const {width,height} = Dimensions.get('window')
import { RFValue ,RFPercentage} from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Bhakti=()=>{
    const {params} = useRoute()
    const {navigate} = useNavigation()
    const[theme,setTheme]=useState(params.theme)
    const data = [
        {
            "id":"1",
            "name":"Ganesha",
            "title":"Shri Ganesh",
        },
        {
            "id":"2",
            "name":"Shakti",
            "title":"Devi Adi Shakti",
        },
        {
            "id":"3",
            "name":"Shiva",
            "title":"Mahadev",
        },
        {
            "id":"4",
            "name":"Vishnu",
            "title":"Shri Hari Vishnu",
        },
        {
            "id":"5",
            "name":"Datta",
            "title":"Shri Dattatrey"
        },
        {
            "id":"6",
            "name":"Hanuman",
            "title":"Shri Hanuman"
        },
        {
            "id":"7",
            "name":"Navagraha",
            "title":"Navagraha"
        }
    ]


    const renderItem =(item)=>{
        if(item.item.id > 0){return(
        <TouchableOpacity style={[styles.card,{marginBottom:RFValue(5),borderBottomColor:theme=="Dark"?"#000000":"#2F2F2F",backgroundColor:theme=="Dark"?"#000000":"#2F2F2F",borderBottomWidth:5,borderRadius:RFValue(25)}]} 
        onPress={()=>{navigate("Bhakti2",{id:item.item.id,theme:theme,title:item.item.title,name:item.item.name})}}>
            <View style={{backgroundColor:theme=="Dark"?"#F4A300":"#FFA536",borderColor:theme=="Dark"?"#D4AF37":"#CC7400",borderWidth:5,borderRadius:RFValue(15)}}>
                <View style={[styles.sub,{color:theme=="Dark"?"#1A1A1A":"#000000",justifyContent:"center",alignItems:"center"}]}>
                    <Text style={[styles.subText,{textAlignVertical:"center",color:theme=="Dark"?"#1A1A1A":"black",height:"100%",fontSize:RFPercentage(2.35)}]}>{item.item.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
        )}
    }
    if(1){
        return(
        <View style={{flex:1,backgroundColor:theme=="Dark"?"#1E1E1E":"#ffffff"}}>
            <View style={{flex:1}} >
            <FlatList
                data={data}
                style={{height:0.925*height}}
                renderItem={renderItem}
                ListFooterComponent={()=>{
                    return(
                    <View style={{height:height*0.02}} ></View>
                    )
                }}
                ListHeaderComponent={()=>{
                    return(
                    <View style={{width:"100%",justifyContent:"center",alignItems:"center",marginTop:0.055*height}} >
                        <Text style={[styles.text,{fontWeight:"bold",fontFamily:"serif",marginBottom:0.025*height,alignSelf:"center",textAlign:"center",color:theme=="Dark"?"white":"black",fontSize:RFValue(27)}]} >Bhakti Yoga</Text>
                        <Image source={require("./om.png")} style={{height:RFValue(255),width:RFValue(255),}} ></Image>
                    </View>
                    )
                }}
                keyExtractor={item => item.id}
                bounces={false}
                initialNumToRender={20}
                ItemSeparatorComponent={()=>{
                    return(
                    <View style={{marginTop:RFValue(5)}} ></View>
                    )
                }}
                />
            </View>
            <View style={{height:"7%"}} ></View>
                <View style={{position:"absolute",width:"100%",top:"90%",height:"10%",borderTopEndRadius:RFValue(25),borderTopStartRadius:RFValue(25)}} >
                <View style={{width:"100%",backgroundColor:theme=="Dark"?"#313131":"#dfdfdf",flex:1,justifyContent:"space-evenly",flexDirection:"row",borderTopEndRadius:RFValue(35),borderTopStartRadius:RFValue(35),borderColor:theme=="Dark"?"#000000":"#2F2F2F",borderWidth:2,borderBottomWidth:0}}>
                    <TouchableOpacity style={{justifyContent:"center",alignItems:"center"}} >
                        <MaterialCommunityIcons name="hands-pray" style={{fontSize:RFPercentage(4),color:theme=="Dark"?"#F4A300":"#CC7400"}} />
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
}

export const Bhakti2=()=>{
    const {navigate} = useNavigation()
    const {params} = useRoute()
    const[theme,setTheme]=useState(null)
    const data = [
        {
            "id":"1",
            "content":[
                {
                    "id":"1",
                    "title":"Mantra"
                },
                {
                    "id":"2",
                    "title":"Ganpati Stotram"
                },
                {
                    "id":"3",
                    "title":"Ganesh Panchratna Stotram"
                },
                {
                    "id":"4",
                    "title":"Atharv Shirsha"
                }
            ]
        },
        {
            "id":"2",
            "content":[
                {
                    "id":"1",
                    "title":"Mantra"
                },
                {
                    "id":"2",
                    "title":"Kujika Stotram"
                },
                {
                    "id":"3",
                    "title":"Shabri Kavach"
                },
                {
                    "id":"4",
                    "title":"Durga Stotram"
                },
                {
                    "id":"5",
                    "title":"Mahishasur Mardini Stotram"
                },
                {
                    "id":"6",
                    "title":"Tulja Bhavani Stotram"
                },
                {
                    "id":"7",
                    "title":"Maha Lakshmi Stotram"
                },
            ]
        },
        {
            "id":"3",
            "content":[
                {
                    "id":"1",
                    "title":"Mantra"
                },
                {
                    "id":"2",
                    "title":"Shiv Panchakshara Stotram"
                },
                {
                    "id":"3",
                    "title":"Shiv Tandav Stotram"
                },
                {
                    "id":"4",
                    "title":"Kalabhairava Asktakam"
                },
                {
                    "id":"5",
                    "title":"Shiv Chalisa"
                },
            ]
        },
        {
            "id":"4",
            "content":[
                {
                    "id":"1",
                    "title":"Mantra"
                },
                {
                    "id":"2",
                    "title":"Shri Hari Stotram"
                },
                {
                    "id":"3",
                    "title":"Shri Ram Raksha Stotram"
                },
            ]
        },
        {
            "id":"5",
            "content":[
                {
                    "id":"1",
                    "title":"Mantra"
                },
                {
                    "id":"2",
                    "title":"Tarak Mantra"
                },
                {
                    "id":"3",
                    "title":"Swami Samarth Stotram"
                },
                {
                    "id":"4",
                    "title":"Siddha Mangal Stotram"
                },
            ]
        },
        {
            "id":"6",
            "content":[
                {
                    "id":"1",
                    "title":"Mantra"
                },
                {
                    "id":"2",
                    "title":"Hanuman Chalisa"
                },
                {
                    "id":"3",
                    "title":"Maruti Stotram"
                },
            ]
        },
        {
            "id":"7",
            "content":[
                {
                    "id":"1",
                    "title":"Mantra"
                },
                {
                    "id":"2",
                    "title":"Navagraha Stotram"
                },
            ]
        }
    ]
    const getTheme=async()=>{
        const value =await AsyncStorage.getItem('Theme')
        setTheme(value)
    }

    useFocusEffect(()=>{
        getTheme()
        return()=>{}
    })

    const renderItem =(item)=>{
        if(item.item.id > 0){return(
        <TouchableOpacity style={[styles.card,{marginBottom:RFValue(5),borderBottomColor:theme=="Dark"?"#000000":"#2F2F2F",backgroundColor:theme=="Dark"?"#000000":"#2F2F2F",borderBottomWidth:5,borderRadius:RFValue(25)}]} 
        onPress={()=>{navigate("Bhakti3",{theme:theme,name:params.name,id:item.item.id})}}>
            <View style={{backgroundColor:theme=="Dark"?"#F4A300":"#FFA536",borderColor:theme=="Dark"?"#D4AF37":"#CC7400",borderWidth:5,borderRadius:RFValue(15)}}>
                <View style={styles.sub}>
                    <Text style={[styles.subText,{textAlignVertical:"center",color:theme=="Dark"?"#1A1A1A":"black",height:"100%",fontSize:RFValue(20)}]}>{item.item.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
        )}
    }
    if(theme!=null){
        return(
        <View style={{flex:1,backgroundColor:theme=="Dark"?"#1E1E1E":"#ffffff"}}>
            <View style={{flex:1}} >
            <FlatList
                data={data[parseInt(params.id)-1].content}
                style={{height:0.925*height}}
                renderItem={renderItem}
                ListFooterComponent={()=>{
                    return(
                    <View style={{height:height*0.02}} ></View>
                    )
                }}
                ListHeaderComponent={()=>{
                    return(
                    <View style={{width:"100%",justifyContent:"center",alignItems:"center",marginTop:0.055*height}} >
                        <Text style={[styles.text,{fontWeight:"bold",fontFamily:"serif",marginBottom:0.025*height,alignSelf:"center",textAlign:"center",color:theme=="Dark"?"white":"black",width:"80%"}]} >{params.title} Mantras , Stotrams and more</Text>
                        <Image source={require("./om.png")} style={{height:RFValue(255),width:RFValue(255),}} ></Image>
                    </View>
                    )
                }}
                keyExtractor={item => item.id}
                bounces={false}
                initialNumToRender={20}
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
}

export const Bhakti3=()=>{
    const {navigate} = useNavigation()
    const {params} = useRoute()
    const[theme,setTheme]=useState(null)
    const name = params.name
    const id = params.id
    const data = bhaktiList[0][name][id]
    const getTheme=async()=>{
        const value =await AsyncStorage.getItem('Theme')
        setTheme(value)
    }

    useFocusEffect(()=>{
        getTheme()
        return()=>{}
    })

    const renderItem =(item)=>{
        return(    
            <ScrollView>
                <View style={{height:RFValue(4),width:RFValue(200),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100),backgroundColor:theme=="Dark"?"#F4A300":"#FFA536"}} ></View>
                <Text style={[styles.subText1,{color:theme=="Dark"?"#efefef":"#161616"}]} >{item.item.title}</Text>
                <View style={{height:RFValue(4),width:RFValue(200),alignSelf:"center",margin:RFValue(10),borderRadius:RFValue(100),backgroundColor:theme=="Dark"?"#F4A300":"#FFA536"}} ></View>
                <Text style={[styles.subText1,{color:theme=="Dark"?"#efefef":"#161616"}]} >{item.item.content+"\n".repeat(item.item.content.length>600?(((item.item.content.length)/100)-3):2)}</Text>
            </ScrollView>
        )
    }

    if(theme!=null){
        return(        
        <View style={{flex:1,backgroundColor:theme=="Dark"?"#1E1E1E":"#ffffff"}}>        
            <View style={{height:"100%"}} >
                <FlatList
                    data={data}
                    style={{marginTop:RFValue(40)}}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    bounces={false}
                    initialNumToRender={1}
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
}

export default Bhakti

const styles = StyleSheet.create({
    text:{
      color:"white",
      fontSize:RFValue(20),
      fontFamily:"sans-serif-medium"
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
        color:"white",
        fontSize:RFValue(16),
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
      backgroundColor: "rgba(73, 73, 73 ,0.5)",
      width:"95%",
      height:0.1*height,
      justifyContent:"center",
      alignSelf:"center",
      marginBottom : RFValue(5),
      marginTop:RFValue(5),
      borderRadius:RFValue(15),
    },
    card1:{
      backgroundColor: "rgba(73, 73, 73,0.4)",
      width:"100%",
      height:"100%",
      alignSelf:"center",
      borderRadius:RFValue(15),
      textAlign : "center",
      justifyContent:"center",
      alignItems:"center"
    },
    card2:{
      backgroundColor: "rgba(73, 73, 73,0.4)",
      width:"97%",
      height:"90%",
      alignSelf:"center",
      borderRadius:RFValue(15),
      textAlign : "center",
    },
    sub:{
      display:"flex",
      flexDirection:"column",
      width:"100%",
      alignContent:'center',
      justifyContent:"center"
    },
    main:{
      margin:RFValue(10),
      textAlign:"center",
      alignItems:"center",
      width:"95%"
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