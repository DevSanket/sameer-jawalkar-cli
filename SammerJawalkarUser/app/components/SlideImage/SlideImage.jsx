import {
    Dimensions,
    Image,
    FlatList,
    View,
    StyleSheet,
  } from 'react-native';
import React, { useEffect, useState } from 'react'
import firestore from "@react-native-firebase/firestore";
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';


const { width, height } = Dimensions.get('screen');


export default function SlideImage({}) {

  const [Images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const newdata = Images.map((data, index) => ({
    key: data.id,
    photo: data.url
  }));

  const RefreshData = async () => {
    let newImageData = [];
    await firestore()
      .collection('Home_SlideImages')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          console.log(documentSnapshot.data());
          const url = documentSnapshot.data().url;
          const id = documentSnapshot.id;

          newImageData.push({url, id});
          //   setImages([...Images, {url, id}]);
        });
      });

    setImages(newImageData);
    console.log(Images);
  
  }


  useEffect(() => {
    setLoading(true);
    RefreshData();
    setLoading(false);
  },[])
  return (
   <>
   <ActivityIndicator visible={loading} />
   <View style={{flex:1,alignItems: 'center',
    justifyContent: 'center'}}>
         <FlatList 
        data={newdata}
        keyExtractor={item => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        renderItem={({item,index}) => {
          return (
          <View style={{width,alignItems:'center',justifyContent:'center',padding:10}}>   
            <Image 
              source={{uri:item.photo}} 
              style={{
                width: width * 0.9,
                height:height * 0.25,
                borderRadius:10
              }}
              resizeMode={'cover'}
            />
        </View> );
        }}
        />
        </View>
   </>
  )
}

const styles = StyleSheet.create({
 
})