import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import BackButton from '../components/BackButton/BackButton'
import AppText from '../components/AppText/AppText'
import Spacer from '../components/spacer/spacer'

export default function BlogDetails({navigation,route}) {
    const {img,heading,content} = route.params.data;
    
  return (
    <Screen>
       
       <BackButton onPress={() => navigation.goBack()} />
       <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:10,width:'100%',marginBottom:10}}>
         <View style={styles.container}>
            <Image source={{uri:img}} style={{height:200,width:'100%'}} />
            <View style={styles.headingContainer}>
            <AppText style={{fontSize:18}}>{heading}</AppText>
            </View>
            <Spacer style={{marginBottom:10}} /> 
           <View style={styles.Content}>
           <AppText>{content}</AppText>
           </View>
        </View>   
       </ScrollView>
    </Screen>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#fff",
        padding:5,
        width:'90%',
        alignSelf:'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        elevation: 7,
        margin:10
    },
    headingContainer:{
        alignSelf:'flex-start',
        marginTop:10,
        marginBottom:10
    }
})