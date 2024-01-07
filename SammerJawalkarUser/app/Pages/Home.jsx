import { StyleSheet, Text, View,Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../config/colors'
import OptionContainer from '../components/OptionContainer/OptionContainer';
import AppText from '../components/AppText/AppText';
import SlideImage from '../components/SlideImage/SlideImage';
import Spacer from '../components/spacer/spacer';
import Menu from '../components/Menu/Menu';
import useAuth from '../config/auth/useAuth';
import Toast from 'react-native-root-toast';
import ImagePhotosContainer from '../components/ImageContainer/ImagePhotoContainer';
import firestore from '@react-native-firebase/firestore';
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator';
import SocialMediaLinks from '../components/SocialMediaLinks/SocialMediaLinks';
import LanguageCard from '../components/LanguageCard/LanguageCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Home({navigation}) {
  const [imgActive,setimgActive] = useState(0);
  const [options,setOptions] = useState(false);
 const auth = useAuth();
 const [profile,setProfile] = useState('');
 const [profileName,setProfileName] = useState('');
 const [profileDetails,setProfileDetails] = useState('');
 const db = firestore();
 const [loading,setLoading] = useState(false);
 const [imgUrl,setImgUrl] = useState(null);
 const {userData,EditUserData} = useAuth();

//  if(!userData.language){
//    EditUserData({language : 'English',...userData})
//  }





  let onmychange = (nativeEvent) => {
    if(nativeEvent){
        const slide = Math.ceil(nativeEvent.contentOffset.x/ nativeEvent.layoutMeasurement.width);
        if(slide != imgActive){
            setimgActive(slide);
        }
    }
  }

  const GetAllData = async () => {
    try {
        await db.collection("Home_Details")
           .get()
           .then((snapshot) => {
             // console.log(snapshot.docs[0].data());
            //  if (snapshot.docs[0].data()) {
            //    setProfileName(snapshot.docs[0].data().name);
            //    setProfileDetails(snapshot.docs[0].data().details);
            //    setProfile(snapshot.docs[0].data().img);
            //  }
            snapshot.forEach(snap => {
              setProfileName(snap.data().name);
              setProfileDetails(snap.data().details);
              setProfile(snap.data().img);
            })
           });
     
           
     
       } catch (error) {
         console.log(error);
       }
  }

 
  useEffect(() => {
    setLoading(true);
    let {name,imgUrl}  = auth.userData;
    setImgUrl(imgUrl);
    Toast.show(`Welcome, ${name}`,Toast.durations.SHORT);
    GetAllData();
    setLoading(false);
  },[])

  return (
    <>
    <ActivityIndicator visible={loading} />
    <LanguageCard visible={!auth.userData.language} />
    <View style={{backgroundColor:colors.background}}>
   {!loading && 
        <ScrollView>
        <View style={styles.baseContainer}>
           
               <View style={styles.ImageContainer}>
               <View style={{elevation:4}}>
                <Image 
                style={{height:40,width:40}}
                source={require('../img/bjp.png')}
                />
                </View>
                <View>

                <TouchableOpacity onPress={
                   () => navigation.push('settings')
                }>
                  <Ionicons name="settings-outline" size={30}  color="#fff" />
                </TouchableOpacity>
                </View>
               
               </View>

               {
                options && <OptionContainer navigation={navigation} />
               }

             
        </View>
        
        <View style={{padding:10}}>
        <View style={{height:70}}>
        <View style={styles.ImageContent}>
                    {profile && <Image 
                        style={styles.image}
                        source={{uri:profile}}
                    />}
               </View>
        </View>
        
        <View style={styles.detailsContainer}>
            <AppText style={styles.NameText}>{profileName}</AppText>
            <AppText style={styles.details}>{profileDetails}</AppText>
        </View>
        </View>
        <View style={{padding:10}}>
        <Spacer style={{marginTop:20,marginBottom:20}} />
        </View>
            
        <SlideImage onmychange={onmychange} imgActive={imgActive}/>
               
            
            <View style={{padding:10}}>
            <Spacer style={{marginTop:20,marginBottom:20}} />
           {auth.userData.language && <Menu navigation={navigation} />}
            <Spacer style={{marginTop:20,marginBottom:20}} />
            </View> 
            {auth.userData.language && <ImagePhotosContainer navigation={navigation}/>}
            <View style={{padding:10}}>
                <Spacer style={{marginTop:20,marginBottom:20}} />
            </View>
            {/* <VideosContainer />                              */}
            {auth.userData.language && <SocialMediaLinks />}
        </ScrollView>
          
    }
    </View>
    </>
  )
}

const styles = StyleSheet.create({
    baseContainer:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        backgroundColor:colors.lightBlue,
        padding:10,
        paddingTop:40,
        height:200,
        zIndex:-1
    },
    ImageContainer:{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        padding:10,
        marginTop:-20
        
    },
    ImageContent:{
        padding:5,
        width:130,
        height:130,
        backgroundColor:colors.background,
        marginTop:-70,
        borderRadius:80,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        zIndex:1
    },
    image:{
        height:120,
        width:120,
        borderRadius:80,

        
    },
    detailsContainer:{
        paddingLeft:10
    },
    NameText:{
        fontSize:20,
        fontWeight:'bold'
    },
    details:{
        fontSize:15
    }
})