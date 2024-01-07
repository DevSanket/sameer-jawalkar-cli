import { Linking, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../config/colors';
import AppText from '../AppText/AppText';
import firestore from "@react-native-firebase/firestore";
import Toast from 'react-native-root-toast';
import Language_Data from '../../config/language';
import useAuth from '../../config/auth/useAuth';

export default function SocialMediaLinks() {
  const [Instagram,setInstagram] = useState('');
  const [Facebook,setFacebook] = useState('');
  const [Website,setWebsite] = useState('');
  const db= firestore();
  const auth = useAuth();
  const {language} = auth.userData;

  const CheckLink = (Link) =>{
      if(Link){
        Linking.openURL(Link);
      }else{
        Toast.show("Coming Soon",Toast.durations.SHORT);
      }



  }

  const RefreshLinks = async() => {
      await db.collection('SocialMedia').get().then(snap => {
       snap.forEach(data => {
        setInstagram(data.data()["Instagram"]);
        setFacebook(data.data()["Facebook"]);
        setWebsite(data.data()["Website"]);
       })
      })
  }

  useEffect(() => {
      RefreshLinks();
  },[])

  return (
    <> 
    <AppText style={{alignSelf:'center'}}> {Language_Data[language]["Social_Media"]} </AppText>
    <View style={styles.container}>
        
     <TouchableWithoutFeedback onPress={() => CheckLink(Instagram)}>
     <View style={styles.social_menu}>
        <AntDesign name="instagram"
        color="#D7417A"
        size={40} /> 
      </View>
     </TouchableWithoutFeedback>
     <TouchableWithoutFeedback onPress={() => CheckLink(Website)}>
     <View style={styles.social_menu}>
        <MaterialCommunityIcons name="web"
        color="#305CB7"
        size={40} /> 
      </View>
     </TouchableWithoutFeedback>
     <TouchableWithoutFeedback onPress={() => CheckLink(Facebook)}>
     <View style={styles.social_menu}>
        <Entypo name="facebook-with-circle"
        color="#0AA2F9"
        size={40} /> 
      </View>
     </TouchableWithoutFeedback>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        padding:10,
        marginBottom:20
    },
    social_menu:{padding:10,borderRadius:10, shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,backgroundColor:colors.white}
})