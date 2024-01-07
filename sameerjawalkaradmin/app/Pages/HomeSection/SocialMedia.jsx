import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../../Components/Screen/Screen'
import AppTextInput from '../../Components/AppTextInput';
import CircleButton from '../../Components/CircleButton';
import BackButton from '../../Components/BackButton';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-root-toast';

export default function SocialMedia({navigation}) {
    const [Instagram,setInstagram] = useState('');
    const [FaceBook,setFacebook] = useState('');
    const [Website,setWebsite] = useState('');
    const [id,setId] = useState(null);
    const db = firestore();
    const [loading,setLoading] = useState(false);


    const RefreshData = async() => {
        await db.collection('SocialMedia').get().then(snapshot => {
            snapshot.forEach(snap => {
                setInstagram(snap.data().Instagram);
                setFacebook(snap.data().FaceBook);
                setWebsite(snap.data().Website);
                setId(snap.id);
            })
        });
    }

    useEffect(() => {
        setLoading(true);
        RefreshData();
        setLoading(false);
    },[]);

    const UpdateSocialMedia = async() => {
        setLoading(true);
       if(id){
        await db.collection('SocialMedia').doc(id).update({
            FaceBook,
            Instagram,
            Website
    })
       }else{
         await db.collection('SocialMedia').add({
            FaceBook,
            Instagram,
            Website
         })
       }
        Toast.show("Updated Successfully",Toast.durations.SHORT);
        setLoading(false);
    }



  return (
    <Screen >
        <BackButton onPress={() => navigation.goBack()} />
           <View style={{justifyContent:'center',height:'80%'}}>
           <AppTextInput 
            icon="facebook"
            placeholder="Facebook"
            value={FaceBook}
            onChangeText={e => setFacebook(e)}
            />
            <AppTextInput 
            icon="camera-alt"
            placeholder="Instagram"
            value={Instagram}
            onChangeText={e => setInstagram(e)}
            />
            <AppTextInput 
            icon="web"
            placeholder="Website"
            value={Website}
            onChangeText={e => setWebsite(e)}
            />
            <CircleButton onPress={() => UpdateSocialMedia()} />
           </View>
    </Screen>
  )
}

const styles = StyleSheet.create({})