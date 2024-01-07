import { Image, StyleSheet, Text, View,Linking } from 'react-native'
import React from 'react'
import Screen from '../../Components/Screen/Screen'
import BackButton from '../../Components/BackButton/BackButton';
import AppText from '../../Components/AppText/AppText';
import Spacer from '../../Components/spacer/spacer';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {EvilIcons,Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
import colors from '../../config/colors';

export default function DetailedComplaint({route,navigation}) {
    const {id,name,address,contact,details,location,imgUrl} = route.params.data;
    console.log(location);
  return (
    <Screen>
        <BackButton onPress={() => navigation.goBack()}/>
       <ScrollView>
       <View style={styles.imageContainer}>
            <Image source={{uri:imgUrl}} style={{height:100,width:100,borderRadius:50,elevation:4}} />
        </View>
        <View style={styles.detailsContainer}>
            <AppText style={styles.text}>Name - {name}</AppText>
            <AppText style={styles.text}>Address - </AppText>
            <AppText style={styles.text}>{address}</AppText>
            <AppText style={styles.text}>Contact - +91 {contact}</AppText>
            <AppText style={styles.text}>Complaint -</AppText>
            <AppText style={styles.text}>{details}</AppText>
        </View>
        <View style={styles.buttonContainer}>
         
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => navigation.push('Map',{location})}>
              <EvilIcons color={colors.danger} name="location" size={40} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>Location</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => {
                Linking.openURL(`tel:+91${contact}`);
              }}>
              <Ionicons color={colors.lightBlue} name="md-call-outline" size={30} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>Call</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => {
                 Linking.openURL(
                  "http://api.whatsapp.com/send?phone=91" + {contact}
                );
              }}>
              <MaterialCommunityIcons name="whatsapp" 
              color={colors.green}
              size={40} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>Whatsapp</AppText>
            </View>
        </View>
       </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    imageContainer:{
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    },
    detailsContainer:{
        padding:5,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:18,
        padding:10
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        alignItems:'flex-start'
    },
    Menu:{
        alignItems:'center',
        justifyContent:'center',
        width:100,
        paddingTop:5,
        paddingBottom:5,
        
        
    },
    MenuImages:{
      alignItems:'center',
      justifyContent:'center',
      height:60,
      width:60,
        elevation:4,
        borderRadius:50,
        margin:15,
        backgroundColor:colors.white
       
    }
})