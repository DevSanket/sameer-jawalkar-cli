import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import BackButton from '../components/BackButton/BackButton';
import AppText from '../components/AppText/AppText';

export default function Gallary({route}) {
    const {Images,navigation} = route.params;
  return (
    <Screen>
        <BackButton onPress={() => navigation.goBack()} />
         <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10}}>
        {
            Images  &&  Images.map((img) => {
                return (
                  <View key={img["url"]} style={{ flex: 1, alignItems: "center", marginTop: 20,marginBottom:20}}>

                    <Image
                      style={{ height: 200, width: 350, borderRadius: 10 }}
                      source={{ uri: img["url"] }}
                    />
                  </View>
                );
              })
        } 
        {
            !Images && <AppText>No Images</AppText>
        }
      </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({})