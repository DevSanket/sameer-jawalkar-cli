import {launchImageLibrary} from 'react-native-image-picker';
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../config/colors';

export default function ImageInput({img, setImage}: any) {
  const handlePress = () => {
    if (!img) {
      selectImage();
    } else {
      Alert.alert('Delete', 'Are you shure you want to delete this Image?', [
        {
          text: 'Yes',
          onPress: () => setImage(''),
        },
        {text: 'no'},
      ]);
    }
  };

  const selectImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      if (!result.didCancel) {
        if (result.assets) {
          console.log(result.assets);
          if (result.assets[0].uri) {
            setImage(result.assets[0].uri);
          }
        }
      }
    } catch (error) {
      console.log('Error While Loading Liabrary', error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!img && (
          <MaterialCommunityIcons
            name="camera"
            size={20}
            color={colors.medium}
          />
        )}
        {img && <Image source={{uri: img}} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 15,
    height: '100%',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
