import {Image, StyleSheet, TextInput, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Toast from 'react-native-root-toast';
import ActivityIndicator from '../../Components/ActivityIndicator/ActivityIndicator';

import defaultStyle from '../../config/styles';

import firestore from '@react-native-firebase/firestore';
import BackButton from '../../Components/BackButton';
import AppTextInput from '../../Components/AppTextInput';
import CircleButton from '../../Components/CircleButton';

export default function AboutMe({navigation}: any) {
  const [loading, setLoading] = useState(false);
  const [YoutubeId, setYoutubeId] = useState<undefined | string>('');
  const [description, setDescreption] = useState<undefined | string>('');
  const [logo, setLogo] = useState('');

  const RefreshData = async () => {
    try {
      await firestore()
        .collection('AboutUs')
        .get()
        .then(snap => {
          snap.forEach(ele => {
            console.log(ele.data());
            setDescreption(ele.data().Information);
            setYoutubeId(ele.data().YoutubeId);
          });
        });

      await firestore()
        .collection('Home_Details')
        .get()
        .then(snap => {
          snap.forEach(ele => {
            console.log(ele.data());
          });
        });
    } catch (error) {
      console.log(error);
      return Toast.show('Error While Fetching Data');
    }
  };

  useEffect(() => {
    setLoading(true);
    RefreshData();
    setLoading(false);
  }, []);

  const updateData = async () => {
    setLoading(true);
    if (!description) {
      setLoading(false);
      return Toast.show('Fill Description');
    }

    try {
      await firestore()
        .collection('AboutUs')
        .doc('bDC0vkfEEe6SNMHWcXQi')
        .update({
          Information: description,
          YoutubeId,
        });
      Toast.show('Updated Successfully');
    } catch (error) {
      console.log(error);
      Toast.show('Updatation Failed');
    }
    setLoading(false);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />

      <View>
        <BackButton onPress={() => navigation.goBack()} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: 10,
            width: '100%',
            borderRadius: 50,
          }}>
          <View style={styles.card}>
            <Image
              source={{uri: logo}}
              style={{
                height: 150,
                width: 150,
                alignSelf: 'center',
                borderRadius: 100,
              }}
            />
            <AppTextInput
              icon="video-library"
              placeholder="YoutubeId"
              value={YoutubeId}
              onChangeText={(e: string) => setYoutubeId(e)}
            />

            <TextInput
              multiline
              numberOfLines={4}
              style={[defaultStyle.text, styles.input]}
              onChangeText={(e: string) => setDescreption(e)}
              value={description}
              placeholder="Put Details"
            />
          </View>
          <CircleButton onPress={() => updateData()} />
          <View style={{marginBottom: 10}}></View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    width: '90%',
    alignSelf: 'center',
    elevation: 7,
    margin: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  input: {
    marginLeft: 10,
    marginRight: 10,
    width: '95%',
    margin: 10,
    borderRadius: 15,
    backgroundColor: defaultStyle.colors.light,
    elevation: 6,
    padding: 10,
    textAlignVertical: 'top',
  },
});
