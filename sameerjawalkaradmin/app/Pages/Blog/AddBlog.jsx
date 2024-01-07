import { Image, StyleSheet, Text, View,TouchableWithoutFeedback, Alert, TextInput, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Screen from '../../Components/Screen/Screen'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';
import defaultStyle from '../../config/styles';
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator';
import Toast from 'react-native-root-toast';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import BackButton from '../../Components/BackButton';
import AppTextInput from '../../Components/AppTextInput';
import CircleButton from '../../Components/CircleButton';
import ImageInput from '../../Components/ImagePicker';


export default function AddBlog({navigation}) {
  const [img, setImage] = useState("");
  const [heading,setHeading] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);

  

  const CreateBlog = async () => {
    setLoading(true); 
    if(!heading || !img || !content){
    
      setLoading(false);  
      return Toast.show("Please Fill All Fileds");
    }

    try {
      let response = await fetch(img);
      let blob = await response.blob();
      let ref = storage().ref().child(`Blogs/${Date.now()}`);
      await ref.put(blob);
      let link = await ref.getDownloadURL();
      if(link){
        await firestore().collection("Blogs").add({
          heading,
          img:link,
          content
        });
        setContent('');
        setImage('');
        setHeading('');
      }else{
        setLoading(false);
        return Toast.show("Image Not Uploaded");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      return Toast.show("Something Goes Wrong Contact Developer");
    }

    setLoading(false);
  }
  return (
  <>
  <ActivityIndicator visible={loading} />
  <Screen>
  <BackButton onPress={() => navigation.goBack()} />
   <View style={styles.container}>
   <ImageInput img={img} setImage={setImage} />
   </View>
    <AppTextInput 
      placeholder="Heading"
      icon="supervised-user-circle"
      value={heading}
      onChangeText={e => setHeading(e)}
    />
     <TextInput
        multiline
        numberOfLines={10}
        style={[defaultStyle.text,styles.input]}
        onChangeText={e => setContent(e)}
        value={content}
        placeholder="Your Content"
      />
      <CircleButton onPress={() => CreateBlog()}/>
      
   
   </Screen>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor : defaultStyle.colors.light,
    borderRadius: 15,
    height: "30%",
    justifyContent: "center",
    width: "95%",
    overflow: "hidden",
    elevation: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  input: {
    marginLeft:10,
    marginRight:10,
    width:'95%',
    margin:10,
    borderRadius:15,
    backgroundColor : defaultStyle.colors.light,
    elevation:6,
    padding:10,
    textAlignVertical:'top'
  }
})