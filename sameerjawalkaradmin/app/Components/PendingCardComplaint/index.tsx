import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import AppText from '../AppText/AppText';
import IconButton from '../IconButton';
import colors from '../../config/colors';

import {TouchableOpacity} from 'react-native-gesture-handler';

export default function PendingComplaintCard({
  data,
  handleCheck,
  handleDelete,
  navigation,
}: any) {
  return (
    <View style={styles.container}>
      <View style={styles.ImageContainer}>
        <Image
          source={{uri: data.imgUrl}}
          style={{height: 100, width: 100, borderRadius: 100}}
        />
      </View>
      <AppText style={{alignSelf: 'center', margin: 10, fontSize: 18}}>
        {data.details}
      </AppText>
      <View style={styles.ButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.push('DetailedComplaint', {data})}>
          <AppText style={{fontSize: 18}}>See More {`>>`}</AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete}>
          <IconButton
            name="trash-can-outline"
            style={{backgroundColor: '#eb345f', padding: 6}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCheck}>
          <IconButton
            name="check"
            style={{backgroundColor: colors.green, padding: 6}}
          />
        </TouchableOpacity>
      </View>
      {/* <AppText style={{fontSize:20}}>Name : {name} </AppText>
      <AppText style={{fontSize:20}}>Details : {details}</AppText>
      <AppText style={{fontSize:20}}>Contact : {contact}</AppText>
      <Spacer />
      <View style={styles.ButtonContainer}>
                <IconButton
                onPress={handleCheck}
                name="check" style={{backgroundColor:'#34eb49'}}/>
                <IconButton
                onPress={() => Linking.openURL(`tel:${contact}`)}
                name="phone" style={{backgroundColor:'#34a8eb'}}/>
                <IconButton
                onPress={handleDelete}
                name="cancel" style={{backgroundColor:'#eb345f'}}/>
        </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: colors.white,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    alignSelf: 'center',
    textAlign: 'left',
    padding: 10,
    marginTop: 40,
    borderRadius: 10,
    elevation: 4,
    marginBottom: 10,
  },
  ImageContainer: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    marginTop: -40,
    padding: 5,
    borderRadius: 100,
  },
  ButtonContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
