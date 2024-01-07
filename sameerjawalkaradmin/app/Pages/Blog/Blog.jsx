import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Screen from '../../Components/Screen/Screen';
import colors from "../../config/colors";
// import {Octicons,EvilIcons, MaterialIcons, Ionicons, Entypo} from '@expo/vector-icons';
import AppText from "../../Components/AppText/AppText";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from 'react-native-vector-icons/Entypo';
import BackButton from '../../Components/BackButton';

export default function Blog({navigation}) {
  return (
   <Screen>
      <BackButton style={{alignSelf:'flex-start'}} onPress={() => navigation.goBack()} />
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
                 <TouchableOpacity onPress={() => navigation.push("AddBlog")}>
                 <Ionicons name="add" size={50} />
                 </TouchableOpacity>
                </View>
                  <AppText style={{fontSize:12}}>Add Blog</AppText>
              </View>
              <View style={styles.Menu}>
                <View style={styles.MenuImages}>
                <TouchableOpacity onPress={() => navigation.push("seeAllBlogs")}>
                <Entypo name="add-to-list" size={30} />
                </TouchableOpacity>
                </View>
                  <AppText style={{fontSize:12}}>See Blogs</AppText>
              </View>  
        </View>
        </View>
   </Screen>
  )
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
})