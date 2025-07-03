import { StyleSheet, Text, View ,Image, Dimensions, ActivityIndicator,} from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated,{useSharedValue,withTiming,withSpring,getAnimatedStyle, useAnimatedStyle, withRepeat} from 'react-native-reanimated'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
const {height,width} = Dimensions.get("window")

const Loader = ({zindex}) => {

    const fadeAnim = useSharedValue(1)

    const animStyle = useAnimatedStyle(()=>{
        return { opacity : fadeAnim.value}
    },[])

    useEffect(()=>{
        fadeAnim.value = withRepeat(withTiming(0.2,{duration:750}),-1,true)
    },[])


    return (
    <View style={{backgroundColor:"#00021F",height:height,justifyContent:"center",alignItems:"center",position:"absolute",zIndex:zindex,width:width}} >
        <View>
            <Animated.Image source={require("./LOGO.png")} style={[{zIndex:2,position : "absolute",width:RFValue(250),height:RFValue(250)},animStyle]} />
            <Image source={require("./BackLOGO.png")} style={{width:RFValue(250),height:RFValue(250),opacity:1}} />
            <Text style={{fontSize:RFPercentage(3),textAlign:"center",color:"white",position:"relative",bottom:RFPercentage(5)}} >।। मामनुस्मर युध्य च ।।</Text>
        </View>
    </View>
    )
}

export default Loader

const styles = StyleSheet.create({})