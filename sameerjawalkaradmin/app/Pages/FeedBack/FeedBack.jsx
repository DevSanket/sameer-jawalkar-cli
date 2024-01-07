import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Toast from "react-native-root-toast";
import colors from "../../config/colors";
import Entypo from 'react-native-vector-icons/Entypo';
import firestore from '@react-native-firebase/firestore';
import ActivityIndicator from "../../Components/ActivityIndicator/ActivityIndicator";
import Screen from "../../Components/Screen/Screen";
import BackButton from "../../Components/BackButton";
import AppText from "../../Components/AppText/AppText";

export default function FeedBack({ navigation }) {
  const [getData, setData] = useState([]);
  const db = firestore();
  const [loading, setLoading] = useState(false);

  const RefreshData = async () => {
      let newData = [];
      await db.collection("FeedBackBox")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(documentSnapshot => {
           const id =   documentSnapshot.id
           const name = documentSnapshot.data().name
           const suggestion = documentSnapshot.data().suggestion
  
           newData.push({id,name,suggestion})
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
      db.collection("FeedBackBox").doc(item).delete();
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
                    <AppText style={{fontSize:20}}>FeedBack - {data.suggestion}</AppText>
                </View>
                </View>
              );
            })}
          {!getData.length && (
            <AppText style={{ alignSelf: "center" }}>
              No FeedBack
            </AppText>
          )}
        </ScrollView>
      </Screen>
    </>
  );
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
});
