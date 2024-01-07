import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../../Components/Screen/Screen'
import Firebase from '../../config/firebase'
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator';
import colors from '../../config/colors';
import BackButton from '../../Components/BackButton/BackButton';
import { Entypo } from '@expo/vector-icons';
import AppText from '../../Components/AppText/AppText';
import Toast from 'react-native-root-toast';

export default function History({navigation}) {
    const [getData, setData] = useState([]);
  const db = Firebase.firestore();
  const [loading, setLoading] = useState(false);

  const RefreshData =  async () => {
     await db.collection("ComplaintBoxHistory")
      .get()
      .then((snapshot) => {
        setData(
          snapshot.docs.map((doc) => {
              return {
                id: doc._delegate._document["key"].path.segments[6],
                name: doc.data().name,
                address: doc.data().address,
                contact: doc.data().contact,
                details: doc.data().details,
                location:doc.data().location,
                imgUrl:doc.data().imgUrl
              };
       
          })
        );
      });
  };

  useEffect(() => {
    setLoading(true);
    RefreshData();
    setLoading(false);
  },[]);
    
  const handleDelete = async(item) => {
    try {
     await db.collection("ComplaintBoxHistory").doc(item.id).delete();
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
    <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{width:'100%'}}>
          <BackButton style={{marginTop:10,marginBottom:10}} onPress={() => navigation.goBack()} />
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
                    onPress={() => handleDelete(data)}>
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
                    <AppText style={{fontSize:20}}>Contact - {data.contact}</AppText>
                    <AppText style={{fontSize:20}}>Complaint - {data.details}</AppText>
                </View>
                </View>
              );
            })}
          {!getData.length && (
            <AppText style={{ alignSelf: "center" }}>
              No History
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