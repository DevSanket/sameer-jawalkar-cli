import {  StyleSheet,  View,TouchableWithoutFeedback, Alert, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Screen from '../../Components/Screen/Screen'
import defaultStyle from '../../config/styles';
import Toast from 'react-native-root-toast';
import ImageInput from '../../Components/ImagePicker';
import BackButton from '../../Components/BackButton';
import AppText from '../../Components/AppText/AppText';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator';
import AppTextInput from '../../Components/AppTextInput';
import CircleButton from '../../Components/CircleButton';


export default function UpdateBlog({route,navigation}) {
  const [img, setImage] = useState("");
  const [heading,setHeading] = useState("");
  const [content,setContent] = useState("");
  const [loading,setLoading] = useState(false);
  const [id,setId] = useState('');
  const db = firestore();

  const RefreshData =  () => {
     if(route.params.data){
        const {content,img,heading,id} = route.params.data;
        setContent(content);
        setHeading(heading);
        setId(id);
        setImage(img);
     }
  }

  useEffect(() => {
    setLoading(true);
    RefreshData();
    setLoading(false);
  },[])


  const UpdateBlog = async() => {
    setLoading(true);
    if(!img || !content || !heading){
      setLoading(false);
      return Toast.show("Fill All Fields",Toast.durations.SHORT);
    }

    try {
      if(img !== route.params.data["img"]){
        let response = await fetch(img);
        let blob = await response.blob();
        let ref = storage().ref().child(`Blogs/${Date.now()}`);
        await ref.put(blob);
        let link = await ref.getDownloadURL();
        setImage(link);
      }
      db.collection('Blogs').doc(id).update({
          heading,
          content,
          img
      });
      Toast.show("Data Updated Successfully",Toast.durations.SHORT);
    } catch (error) {
      setLoading(false);
      return Toast.show('Something goes Wrong',Toast.durations.SHORT);
    }
    setLoading(false);

  }

  return (
    <>
    <ActivityIndicator visible={loading} />
    <Screen> 
      <BackButton onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10,width:'90%'}}>
     
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
        <CircleButton onPress={() => UpdateBlog()} />
     </ScrollView>
        
     
     </Screen>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor : defaultStyle.colors.light,
    borderRadius: 15,
    height: 200,
    justifyContent: "center",
    width: "95%",
    overflow: "hidden",
    elevation: 10,
    alignSelf:'center',
    marginTop:10
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