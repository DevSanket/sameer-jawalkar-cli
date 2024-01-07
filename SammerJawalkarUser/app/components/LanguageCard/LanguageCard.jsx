import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../config/colors';
import AppText from '../AppText/AppText';
import useAuth from '../../config/auth/useAuth';
import Toast from 'react-native-root-toast';
import BackButton from '../BackButton/BackButton';

export default function LanguageCard({visible=false}) {
    const [checked, setChecked] = useState(null);
    var Language = ['English', 'Marathi','Hindi'];
    const auth = useAuth();
    const {userData} = auth;
    

    const setLanguage = () => {
        if(!checked){
            return Toast.show("Please Pick A Language",Toast.durations.SHORT);
        }

        auth.EditUserData({language:checked,...userData});
        // console.log(userData);
    }

    if(!visible) return null;
    return (
      <>
     
      <View style={styles.overlay}>
     
        <View style={styles.card}>
            <AppText style={styles.text}>Language</AppText>
            <View>
        {Language.map((language) => {
          return (
            <View key={language} style={styles.option}>
                <TouchableOpacity  onPress={() => setChecked(language)}>
                    <AppText> {"->"} {language} {`( Click Here )`}</AppText>
                </TouchableOpacity>
            </View>
          );
        })}
        {checked && <AppText style={styles.text} >Selected option - {checked}</AppText>}
      </View>
      <TouchableOpacity style={{alignSelf:'center'}}
      onPress={() => setLanguage()}
      ><AppText style={{color:colors.primary}}>Save</AppText></TouchableOpacity>
        </View>
      </View>
      </>
    )
}

const styles = StyleSheet.create({
    overlay:{
        position:'absolute',
        backgroundColor:colors.background,
        height:'100%',
        width:'100%',
        zIndex:1,
        justifyContent:'center',
        alignItems:'center'
      },
      card:{
        backgroundColor:"#fff",
        elevation:4,
        padding:5,
        alignItems:'flex-start',
        width:'70%',

      },
      text:{
        alignSelf:'center',
        margin:10
      },
      option:{
        margin:5,
        width:'100%'
      }
      
})