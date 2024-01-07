import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../../config/colors';
import Screen from '../../Components/Screen/Screen';
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator';
import Toast from 'react-native-root-toast';
import AppText from '../../Components/AppText/AppText';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import CircleButton from '../../Components/CircleButton';
import ImageInput from '../../Components/ImagePicker';
import Entypo from 'react-native-vector-icons/Entypo';

type ImageData = {
  url: string;
  id: string;
};

export default function AddPhotos() {
  const [img, setImage] = useState('');
  const [Images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const RefreshData = async () => {
    let newImageData = [];
    await firestore()
      .collection('Gallary')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          const url = documentSnapshot.data().url;
          const id = documentSnapshot.id;

          newImageData.push({url, id});
          //   setImages([...Images, {url, id}]);
        });
      });

    setImages(newImageData);
    console.log(Images);
  };

  useEffect(() => {
    setLoading(true);
    RefreshData();
    setLoading(false);
  }, []);

  const AddImage = async () => {
    setLoading(true);
    if (!img) {
      return Toast.show('Add Your Images');
    }

    let response = await fetch(img);
    let blob = await response.blob();
    let ref = storage().ref().child(`Gallary/${Date.now()}`);
    await ref.put(blob);
    let link = await ref.getDownloadURL();
    console.log(link);

    await firestore().collection('Gallary').add({
      url: link,
    });
    Toast.show('Your Image Added');
    setImage('');
    RefreshData();
    setLoading(false);
  };

  const RemoveImage = async (id: string) => {
    setLoading(true);
    try {
      await firestore().collection('Gallary').doc(id).delete();
      Toast.show('Deleted Successfully');
    } catch (error) {
      console.log(error);
      Toast.show('Error While Deleting');
    }
    RefreshData();
    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      {!loading && (
        <Screen>
          <View style={styles.container}>
            <ImageInput img={img} setImage={setImage} />
          </View>

          <CircleButton onPress={() => AddImage()} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{marginTop: 10}}>
            {Images &&
              Images.map(img => {
                return (
                  <View
                    key={img.url}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      marginTop: 20,
                      marginBottom: 20,
                    }}>
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        zIndex: 1,
                        alignSelf: 'flex-end',
                        marginVertical: -10,
                      }}
                      onPress={() => RemoveImage(img.id)}>
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
                      style={{height: 200, width: 350, borderRadius: 10}}
                      source={{
                        uri: img.url,
                      }}
                    />
                  </View>
                );
              })}
            {!Images.length && <AppText>No Images</AppText>}
          </ScrollView>
        </Screen>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray,
    borderRadius: 15,
    height: '30%',
    width: '90%',
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
