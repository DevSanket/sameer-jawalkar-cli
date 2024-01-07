import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../../Components/Screen/Screen'
import BackButton from '../../Components/BackButton/BackButton'
import colors from '../../config/colors'
import MapView, { Marker } from 'react-native-maps';

export default function Map({navigation,route}) {
    const {location} = route.params;


  return (
    <Screen>
        <BackButton onPress={() => navigation.goBack()} />
        <View style={styles.container}>
        <MapView
        style={{ alignSelf: 'stretch', height: '100%' }}
        region={location}
      >
        <Marker coordinate={location} title='Marker' />
      </MapView>
        </View>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        width:'90%',
        height:'90%',
        backgroundColor:colors.color,
        borderRadius:5,
        elevation:5
    }
})