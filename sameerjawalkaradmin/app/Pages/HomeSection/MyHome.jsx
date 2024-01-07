import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import colors from "../../config/colors";
// import {Octicons,EvilIcons, MaterialIcons, Ionicons, MaterialCommunityIcons, Foundation} from '@expo/vector-icons';
import Screen from "../../Components/Screen/Screen";
import AppText from "../../Components/AppText/AppText";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

export default function MyHome({navigation}) {
  return (
    <Screen>
      <View style={{flex:1,justifyContent:'space-evenly',alignItems:'center'}}>
         
       <View style={{ height: 70, alignItems: "center"}}>
          <View style={styles.ImageContent}>
            <Image
              style={styles.image}
              source={require("../../img/profile1.jpg")}
            />
          </View>
        </View>
        <View style={styles.MenuContainer}>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
               <TouchableOpacity onPress={() => navigation.push("SlideImage")}>
               <Ionicons name="images-outline" size={40} />
               </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>Slide Images</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => navigation.push("BasicDetails")}>
              <MaterialCommunityIcons name="account-details-outline" size={40} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>Basic Details</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => navigation.push("SocialMedia")}>
              <Foundation name="social-instagram" size={40} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>Social Media</AppText>
            </View>   
      </View>
      </View>

    </Screen>
  );
}

const styles = StyleSheet.create({
  ImageContent: {
    padding: 5,
    width: 130,
    height: 130,
    backgroundColor: colors.background,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 80,
  },
  label:{
    fontSize:25,
    alignSelf:'center'
},
MenuContainer:{
    flexDirection:"row",
    justifyContent:'space-evenly',
    flexWrap:'wrap',
    alignItems:'flex-start'
},
Menu:{
    alignItems:'center',
    justifyContent:'center',
    width:100,
    paddingTop:10,
    paddingBottom:10,
    
    
},
MenuImages:{
  alignItems:'center',
  justifyContent:'center',
  height:80,
  width:80,
    elevation:4,
    borderRadius:50,
    margin:15,
    backgroundColor:colors.white
   
}
});
