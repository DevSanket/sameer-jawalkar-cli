import {  ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ContentCard from '../components/ContentCard/ContentCard'
import BackButton from '../components/BackButton/BackButton'
import Screen from '../components/Screen'
import firestore from '@react-native-firebase/firestore';
import ActivityIndicator from '../components/ActivityIndicator/ActivityIndicator'
import AppText from '../components/AppText/AppText'

export default function Content({navigation}) {
  const [data,setData] = useState([]);
  const [loading,setLoading] = useState(false);

  const RefreshData = async() => {
    let newBlogs = [];
    try {
      await firestore().collection('Blogs').get().then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const img = documentSnapshot.data().img;
          const id = documentSnapshot.id;
          const content = documentSnapshot.data().content;
          const heading = documentSnapshot.data().heading;
          newBlogs.push({id,img,content,heading});
        });
      })
    } catch (error) {
      console.log(error);
      return Toast.show("Something goes Wrong");
    }
    setData(newBlogs)
  }

  useEffect(() => {
    setLoading(true);
    RefreshData();
    setLoading(false);
   },[])
 

  return (
   <>
   <ActivityIndicator visible={loading} />
   <Screen style={{alignItems:'center'}}>
   
   <ScrollView showsVerticalScrollIndicator={false} style={{width:'90%'}}>
      <BackButton onPress={() => navigation.goBack()} />
      {
        data.map(content => (
            <ContentCard
            key={content.id}
            content={content}
            details={content.heading}
            img={content.img}
            navigation={navigation}
            />
        ))
      }
       {!data && <AppText>No Blogs Yet</AppText>}
    </ScrollView>

   </Screen>
   </>
  )
}

const styles = StyleSheet.create({})