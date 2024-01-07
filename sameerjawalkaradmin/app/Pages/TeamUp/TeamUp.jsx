import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Entypo  from 'react-native-vector-icons/Entypo';
import colors from '../../config/colors';
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator';
import BackButton from '../../Components/BackButton';
import Screen from '../../Components/Screen/Screen';
import AppText from '../../Components/AppText/AppText';
import firestore from '@react-native-firebase/firestore';


export default function TeamUp({navigation}) {
  const [getData, setData] = useState([]);
  const db = firestore();
  const [loading, setLoading] = useState(false);

  const RefreshData = async() => {
    let newData = [];
    await db.collection("TeamUp")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
         const id =   documentSnapshot.id
         const name = documentSnapshot.data().name
         const address = documentSnapshot.data().Address
        const  contact = documentSnapshot.data().contact
         const refrence = documentSnapshot.data().Refrence
         const  imgUrl = documentSnapshot.data().imgUrl

         newData.push({name,id,address,contact,refrence,imgUrl})
        });
      });

      setData(newData);
  };

  useEffect(() => {
    setLoading(true);
    RefreshData();
    setLoading(false);
  });

  const handleDelete = (item) => {
    try {
      db.collection("TeamUp").doc(item).delete();
      RefreshData();
      Toast.show("Deleted Successfully", Toast.durations.SHORT);
    } catch (error) {
      console.log(error);
      Toast.show("Cannot Change Right Now!");
    }
  };

  return (
  <>
  <ActivityIndicator visible={loading} />
  <Screen>
      <BackButton onPress={() => navigation.goBack()}/>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10,width:'90%'}}>
      {getData &&
            getData.map((data) => {
              return (
                <View key={data.id}>
                 
                <View style={styles.card}>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        zIndex: 1,
                        alignSelf: "flex-end",
                        marginVertical: -10,
                    }}
                    onPress={() => handleDelete(data.id)}>
                    <Entypo
                      style={{
                        backgroundColor: colors.white,
                        borderRadius: 50,
                        
                      }}
                      name="cross"
                      size={30}
                    />
                    </TouchableOpacity>
                    <AppText style={{fontSize:20}}>Name - {data.name}</AppText>
                    <AppText style={{fontSize:20}}>Refrence - {data.refrence}</AppText>
                    <AppText style={{fontSize:20}}>contact - {data.contact}</AppText>
                </View>
                </View>
              );
            })}
          {!getData.length && (
            <AppText style={{ alignSelf: "center" }}>
              No TeamUp Data
            </AppText>
          )}
      </ScrollView>
   </Screen>
  </>
  )
}

const styles = StyleSheet.create({
  card:{
    backgroundColor:colors.white,
    padding:10,
    justifyContent:'flex-start',
    alignContent:'center',
    elevation:10,
    borderRadius:10,
   margin:10
}
})