import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import Screen from '../components/Screen'
import useAuth from '../config/auth/useAuth'
import colors from '../config/colors';
import AppText from '../components/AppText/AppText';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Spacer from '../components/spacer/spacer';
import Language_Data from '../config/language';
import BackButton from '../components/BackButton/BackButton';
export default function Settings({navigation}) {
    const auth = useAuth();
    const logOut = () => {
        auth.logOut();
      }
    const {name,email,imgUrl,language} = auth.userData;
  return (
   <Screen>
        <View style={styles.profileContainer}>
            <View style={{backgroundColor:colors.white,padding:4}}>
                <Image
                style={{height:60,width:60,borderRadius:50,elevation:10}}
                source={{uri:imgUrl}}
                />
            </View>
            <View style={styles.textContainer}>
                <AppText style={{fontSize:14}}>Name - {name}</AppText>
                <AppText style={{fontSize:14}}>Email - {email}</AppText>
            </View>
        </View>

        <View style={{marginTop:30}}>
            <Spacer />
           <TouchableWithoutFeedback onPress={() => navigation.push('updatePassword')}>
           <View style={styles.menuContainer}>
                <MaterialIcons name="update" size={30} color={colors.primary} />
                <AppText style={{fontSize:15,marginLeft:20}}>{Language_Data[language]["update_password"]}</AppText>
            </View>
           </TouchableWithoutFeedback>
            <Spacer />
           <TouchableWithoutFeedback onPress={() => navigation.push('UpdateLangauge')}>
           <View style={styles.menuContainer}>
                <MaterialIcons name="language" size={30} color={colors.lightBlue} />
                <AppText style={{fontSize:15,marginLeft:20}}>{Language_Data[language]["Language"]}</AppText>
            </View>
           </TouchableWithoutFeedback>
            <Spacer />
           <TouchableWithoutFeedback onPress={() => navigation.push('TermsAndConditions')}>
           <View style={styles.menuContainer}>
                <MaterialIcons name="supervised-user-circle" size={30} color={colors.medium} />
                <AppText style={{fontSize:15,marginLeft:20}}>{Language_Data[language]["Terms_and_Conditions"]}</AppText>
            </View>
           </TouchableWithoutFeedback>
           <Spacer />
           <TouchableWithoutFeedback onPress={() => logOut()}>
           <View style={styles.menuContainer}>
           <MaterialIcons name="exit-to-app" size={30} color="red" />
                    <AppText style={{fontSize:15,marginLeft:20}}>{Language_Data[language]["Log_out"]}</AppText>
                </View>
           </TouchableWithoutFeedback>

        </View>
        <BackButton style={{alignSelf:'center'}} onPress={() => navigation.goBack()} />
   </Screen>
  )
}

const styles = StyleSheet.create({
    profileContainer:{
        width:'100%',
        padding:10,
        flexDirection:"row",
        backgroundColor:colors.white,
        justifyContent:'flex-start',
        alignItems:'center'
        
    },
    textContainer:{
        marginLeft:10,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    menuContainer:{
        width:'100%',
        padding:10,
        flexDirection:"row",
        backgroundColor:colors.white,
        justifyContent:'flex-start',
        alignItems:'center'

    },
    option:{
        height:40,
        display:'flex',
        flexDirection:'row',
        justifyContent:'flex-start',
        padding:2,
        alignContent:'center',
        alignItems:'center',
        textAlign:'center',
    }
})