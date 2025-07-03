import React from "react";
import {Platform, StatusBar ,StyleSheet} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { createStackNavigator } from '@react-navigation/stack';
import Hverse from "../components/hverselist";
import BookMark from "../components/bookmark";
import Verselist  from "../components/verselist";
import Bhakti from "../components/bhakti";
import { Bhakti2 } from "../components/bhakti";
import { Bhakti3 } from "../components/bhakti";
//import TabNav from "./tabNav";
import Chplist from "../components/chplist";
const Stack  = createStackNavigator();

export default class StackNav extends React.Component{
  render(){
    return(
      <Stack.Navigator initialRouteName="Home" screenOptions={{animation:"fade"}} >
        <Stack.Screen name = "Home" component={Chplist} options={{headerShown: false,}}/>
        <Stack.Screen name = "Bhakti" component={Bhakti} options={{headerShown: false,}}/>
        <Stack.Screen name="Bhakti2" component={Bhakti2} options={{headerShown:false}}/>
        <Stack.Screen name="Bhakti3" component={Bhakti3} options={{headerShown:false}}/>
        <Stack.Screen name="Bookmark" component={BookMark} options={{headerShown:false}} />
        <Stack.Screen name="Verse" component={Verselist} options={{headerShown:false}}/>
        <Stack.Screen name = "Hverse" component = {Hverse} options={{headerShown: false}}/>
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
})