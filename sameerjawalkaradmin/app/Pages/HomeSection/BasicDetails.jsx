import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from "../../config/colors";
import Toast from "react-native-root-toast";
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import ActivityIndicator from "../../Components/ActivityIndicator/ActivityIndicator";
import Screen from "../../Components/Screen/Screen";
import AppTextInput from "../../Components/AppTextInput";
import CircleButton from "../../Components/CircleButton";
import ImageInput from "../../Components/ImagePicker";

export default function BasicDetails() {
  const [img, setImage] = useState("");
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const db = firestore();


  const RefreshData = async () => {
    setLoading(true);
    try {
      await db.collection("Home_Details")
         .get()
         .then((snapshot) => {
           // console.log(snapshot.docs[0].data());
           // if (snapshot.docs[0].data()) {
           //   setName(snapshot.docs[0].data().name);
           //   setDetails(snapshot.docs[0].data().details);
           //   setImage(snapshot.docs[0].data().img);
           //   setId(snapshot.docs[0]._delegate._document["key"].path.segments[6]);
           // }
           snapshot.forEach(snap => {
             console.log(snap.data());
             setName(snap.data().name);
             setDetails(snap.data().details);
             setImage(snap.data().img);
             setId(snap.id);
           })
         });
     } catch (error) {
       console.log(error);
     }
     setLoading(false);
  }


  useEffect(() => {
    RefreshData();
  }, []);




  const HandleSave = async () => {
    setLoading(true);
    if (!name || !img || !details) {
      setLoading(false);
      return Toast.show("Please Fill All Values", Toast.durations.SHORT);
    }
    try {
      let response = await fetch(img);
      let blob = await response.blob();
      let ref = storage().ref().child(`Basic/${Date.now()}`);
      await ref.put(blob);
      let link = await ref.getDownloadURL();
    
     if(id){
      await db.collection("Home_Details")
      .doc(id)
      .update({
        name,
        details,
        img:link,
      })
      .then((data) => {
        setName(name);
        setImage(link);
        setDetails(details);
        Toast.show("Details are Saved Successfull", Toast.durations.SHORT);
      });
     }else{
       await db.collection("Home_Details").add({name,details,img:link});
       setName(name);
       setImage(link);
       setDetails(details);
       Toast.show("Details are Saved Successfull", Toast.durations.SHORT);
     }
    } catch (error) {
      console.log(error);
      Toast.show("Something Going Wrong", Toast.durations.SHORT);
    }
    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <Screen style={{ justifyContent: "center", alignItems: "center" }}>
          
            <View style={styles.container}>
             <ImageInput 
               img={img}
               setImage={setImage}
             />
            </View>
          

          <AppTextInput
            value={name}
            icon="supervised-user-circle"
            onChangeText={(e) => setName(e)}
            placeholder="Name"
          />

          <AppTextInput
            value={details}
            icon="notes"
            onChangeText={(e) => setDetails(e)}
            placeholder="Details"
          />
          <CircleButton onPress={() => HandleSave()} />
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    backgroundColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    elevation: 10,
  },
  image: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
