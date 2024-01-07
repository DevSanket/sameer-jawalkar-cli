import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import colors from "../../config/colors";
import Entypo from 'react-native-vector-icons/Entypo';
  import Toast from "react-native-root-toast";
import ActivityIndicator from "../../Components/ActivityIndicator/ActivityIndicator";
import ImageInput from "../../Components/ImagePicker";
import Screen from "../../Components/Screen/Screen";
import CircleButton from "../../Components/CircleButton";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AppText from "../../Components/AppText/AppText";

  
  export default function SlideImage() {
    const [img, setImage] = useState("");
    const [Images, setImages] = useState([]);
    const db = firestore();
    const [loading, setLoading] = useState(false);
  
  
    const RefreshData = async () => {
      let newData = [];
      await db.collection("Home_SlideImages")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data().url);
         const id =   documentSnapshot.id
        //  const name = documentSnapshot.data().name
        //  const suggestion = documentSnapshot.data().suggestion
        const url = documentSnapshot.data().url
         // id:doc._delegate._document["key"].path.segments[6]

         newData.push({id,url})
        });
      });
      console.log(newData);
      setImages(newData);
    
    }
  
    useEffect(() => {
      setLoading(true);
      RefreshData();
      setLoading(false);
    },[]);
  
    const AddImage = async () => {
      if(Images.length > 3){
        return Toast.show("Dont Add More Images",Toast.durations.SHORT);
      }
      setLoading(true);
      if (!img) {
        return Toast.show("Add Your Images", Toast.durations.SHORT);
      }
  
      let response = await fetch(img);
      let blob = await response.blob();
      let ref = storage().ref().child(`Home_SlideImages/${Date.now()}`);
      await ref.put(blob);
      let link = await ref.getDownloadURL();
      db.collection("Home_SlideImages").add({
        url: link,
      });
      Toast.show("Your Image Added", Toast.durations.SHORT);
      setImage('');
      RefreshData();
      setLoading(false);
  
    };
  
    const RemoveImage = async (id) => {
      setLoading(true);
      try {
          await db.collection('Home_SlideImages').doc(id).delete();
          Toast.show("Deleted Successfully",Toast.durations.SHORT);
      } catch (error) {
          console.log(error);
          Toast.show("Error While Deleting",Toast.durations.SHORT);
      }
      RefreshData();
      setLoading(false);
  
  
    }
  
    return (
      <>
      <ActivityIndicator visible={loading} />
      {!loading && <Screen>
       
          <View style={styles.container}>
           <ImageInput img={img} setImage={setImage} />
          </View>
      
        <CircleButton onPress={() => AddImage()} />
        <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10}}>
          {
              Images  &&  Images.map((img) => {
                  return (
                    <View key={img["url"]} style={{ flex: 1, alignItems: "center", marginTop: 20,marginBottom:20}}>
                      <TouchableOpacity
                      style={{
                          position: "absolute",
                          zIndex: 1,
                          alignSelf: "flex-end",
                          marginVertical: -10,
                      }}
                      onPress={() => RemoveImage(img["id"])}>
                      <Entypo
                        style={{
                          backgroundColor: colors.white,
                          borderRadius: 50,
                          
                        }}
                        name="cross"
                        size={30}
                      />
                      </TouchableOpacity>
                      <Image
                        style={{ height: 200, width: 350, borderRadius: 10 }}
                        source={{ uri: img.url }}
                        resizeMode={'cover'}
                      />
                    </View>
                  );
                })
          } 
          {
              !Images.length && <AppText>No Images</AppText>
          }
        </ScrollView>
      </Screen>}
      </>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      backgroundColor: colors.gray,
      borderRadius: 15,
      height: "30%",
      justifyContent: "center",
      width: "90%",
      overflow: "hidden",
      elevation: 10,
      marginBottom:10
    },
    image: {
      width: "100%",
      height: "100%",
    },
  });
  