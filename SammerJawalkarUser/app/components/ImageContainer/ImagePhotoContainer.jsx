import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AppText from '../AppText/AppText';
import colors from '../../config/colors';
import firestore from '@react-native-firebase/firestore';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';
import Language_Data from '../../config/language';
import useAuth from '../../config/auth/useAuth';

export default function ImagePhotosContainer({navigation}) {
  const db = firestore();
  const [Images,setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const {language} = auth.userData;

  const RefreshData = async () => {
    let newImageData = [];
    await firestore()
      .collection('Gallary')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const url = documentSnapshot.data().url;
          const id = documentSnapshot.id;

          newImageData.push({url, id});
          
        });
      });

    setImages(newImageData);
  
  }
  useEffect(() => { 
    setLoading(true);
    RefreshData();
    setLoading(false);
  },[]);

  return (
    <>
    <ActivityIndicator visible={loading} />
    <View style={styles.container}>
      <AppText style={{fontSize:24}}>{Language_Data[language]["Photos_Gallary"]}</AppText>
      <ScrollView horizontal
      showsHorizontalScrollIndicator={false}
      >
        {
           Images && Images.reverse().map(img => {
            return (
              <Image 
              key={img.id}
              style={{width:200,height:130,margin:10,borderRadius:10}}
              source={{uri:img.url}}
              />
          )
           })
        }
       {!Images && <AppText>No Images</AppText>}
      </ScrollView>
      <View style={styles.ViewAll}>
        <TouchableOpacity onPress={() => navigation.push("Gallary",{Images,navigation})}>
        <AppText>{Language_Data[language]["View_All"]}</AppText>
        </TouchableOpacity>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container:{
    alignItems:'center'
  },
  ViewAll:{
    alignItems:'center',
    justifyContent:'center',
    height:40,
    width:140,
    marginTop:30,
    borderRadius:20,
    backgroundColor:colors.lightBlue
  }
})