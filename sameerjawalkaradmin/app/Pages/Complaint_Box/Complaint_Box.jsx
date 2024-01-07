import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Screen from "../../Components/Screen/Screen";
import colors from "../../config/colors";
import {Octicons,EvilIcons, MaterialIcons, Ionicons} from '@expo/vector-icons';
import AppText from "../../Components/AppText/AppText";

export default function Complaint_Box({navigation}) {
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
               <TouchableOpacity onPress={() => navigation.push("PendingAppointments")}>
               <EvilIcons name="envelope" size={50} />
               </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>All Complaint</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => navigation.push("RunningAppointments")}>
              <EvilIcons name="check" size={50} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>Running</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => navigation.push("History")}>
              <EvilIcons name="redo" size={50} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>History</AppText>
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
