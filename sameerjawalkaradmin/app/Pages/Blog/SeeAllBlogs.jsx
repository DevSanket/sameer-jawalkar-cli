import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Toast from 'react-native-root-toast';
import colors from '../../config/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator';
import BackButton from '../../Components/BackButton';
import AppText from '../../Components/AppText/AppText';
import Screen from '../../Components/Screen/Screen';

export default function SeeAllBlogs({navigation}) {
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
  },[]);

  const deleteBlog = async(id) => {
    setLoading(true);
    if(!id){
      setLoading(false);
      return Toast.show("Please Enter ID",Toast.durations.SHORT);
    }else{
      await db.collection('Blogs').doc(id).delete();
      RefreshData();
      setLoading(false);
    }

  }

  return (
   <>
   <ActivityIndicator visible={loading} />
   <Screen>
      <BackButton onPress={() => navigation.goBack()} />
     
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10,width:'90%'}}>
        
        { data.map(mydata => (
          <View 
          key={mydata.id}
          style={styles.card}>
            
              
                <Image source={{uri:mydata.img}} style={{width:'100%',height:150}} />
               
                <AppText style={{margin:10}}>Heading - {mydata.heading}</AppText>

                <View style={styles.buttonContainer}>
                  {/* <View style={[styles.button,{backgroundColor:"#51E1ED"}]}>
                    <MaterialIcons
                    name="edit"
                    size={20}
                    />
                  </View> */}
                
                 <View style={[styles.button,{backgroundColor:"#51E1ED"}]}>
                 <TouchableOpacity onPress={() => {
                  navigation.push("updateBlog",{data:mydata})
                 }}>
                    <MaterialIcons
                    name="edit"
                    size={20}
                    />
                     </TouchableOpacity>
                  </View>
                

                 
                 <View style={[styles.button,{backgroundColor:"#E83A59"}]}>
                 <TouchableOpacity onPress={() => deleteBlog(mydata.id)}>
                    <MaterialCommunityIcons
                    name="trash-can-outline"
                    size={20}
                    color="white"
                    />
                 </TouchableOpacity>
                  </View>
                  <View style={[styles.button,{backgroundColor:"#E5D68A"}]}>
                    <MaterialIcons
                    name="info-outline"
                    size={20}
                    />
                  </View>
                </View>
     
          </View>
        ))}

        

  </ScrollView>

    </Screen>
   </>
  )
}

const styles = StyleSheet.create({
  card:{
    flex:1,
    width: "95%",
    backgroundColor: colors.white,
    justifyContent: "space-evenly",
    alignItems: "flex-start",
    alignSelf:'center',
    textAlign:'left',
    padding: 10,
    marginTop:40,
    borderRadius:10,
    elevation:4,
    marginBottom:10
  },
  cardImage:{
    width:'100%',
  },
  buttonContainer:{
    flexDirection:'row',
    padding:5,
    justifyContent:'space-between'
  },
  button:{
    flexDirection:'row',
    width:'30%',
    padding:5,
    justifyContent:'space-around',
    borderRadius:5,
    margin:5,
    elevation:4
  }
})