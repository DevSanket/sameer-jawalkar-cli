import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React,{useState,useEffect} from 'react'
import Screen from '../components/Screen'
import AppText from '../components/AppText/AppText'
import Spacer from '../components/spacer/spacer'
import firestore from '@react-native-firebase/firestore';
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator'

import BackButton from '../components/BackButton/BackButton'
import colors from '../config/colors';
import  FontAwesome  from "react-native-vector-icons/FontAwesome";
import Toast from 'react-native-root-toast'

export default function AboutMe({navigation}) {
    const [loading,setLoading] = useState(false);
    const db= firestore();
    const [YoutubeId,setYoutubeId]= useState('');
    const [description,setDescreption] = useState('');
    const [logo,setLogo] = useState(null);

    const RefreshData = async() => {
        try {
         await db.collection('AboutUs').get().then(snap => {
            snap.forEach(data => {
                setDescreption(data.data().Information);
                setYoutubeId(data.data().YoutubeId);
            })
         })
         await db.collection('Home_Details').get().then(snap => {
             snap.forEach(data => {
                setLogo(data.data().img);
             })
         })
        } catch (error) {
         console.log(error);
         return Toast.show("Error While Fetching Data",Toast.durations.SHORT);
        }
     } 

     useEffect(() => {
        setLoading(true);
        RefreshData();
        setLoading(false);
    },[]);

  return (
   <>
   <ActivityIndicator visible={loading} />
   <Screen>
    <BackButton onPress={() => navigation.goBack()} />
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10,width:'100%',borderRadius:50}}>
            <View style={styles.card}>
                {logo && <Image source={{uri:logo}} style={{height:150,width:150,alignSelf:'center',borderRadius:100}} />}
               <AppText>
                    {description}
               </AppText>
               <Spacer style={{marginTop:10,marginBottom:10}}/>
               <TouchableOpacity
            onPress={() => {
                if(!YoutubeId){
                    return Toast.show("Coming Soon",Toast.durations.SHORT);
                }
              Linking.openURL(YoutubeId);
            }}
          >
            <View style={styles.WhatsAppButtonContainer}>
              <View style={styles.whatsappLogo}>
                <FontAwesome
                  name="youtube-play"
                  size={30}
                  color={colors.danger}
                />
              </View>
              <AppText style={{ marginLeft: 10 }}>Youtube</AppText>
            </View>
          </TouchableOpacity>
            </View>
        </ScrollView>
   </Screen>
   </>
  )
}

const styles = StyleSheet.create({
    card:{
        backgroundColor:"#fff",
        padding:10,
        width:'90%',
        alignSelf:'center',
        elevation:7,
        margin:10,
        justifyContent:'center',
        borderRadius:10
       },
       WhatsAppButtonContainer: {
        backgroundColor: colors.white,
        width: 200,
        alignSelf: "center",
        height: 40,
        borderRadius: 30,
        margin: 20,
        elevation: 10,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      },
      whatsappLogo: {
        height: 60,
        width: 60,
        backgroundColor: colors.white,
        borderRadius: 50,
        marginTop: -10,
        elevation: 10,
        alignSelf: "flex-start",
        justifyContent: "center",
        alignItems: "center",
      },
})