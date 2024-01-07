import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors';
import AppText from '../AppText/AppText';
// import { AntDesign,Ionicons,EvilIcons } from 'react-native-vector-icons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Spacer from '../spacer/spacer';
import Language_Data from '../../config/language';
import useAuth from '../../config/auth/useAuth';



export default function OptionContainer({navigation}) {
    const auth = useAuth();
    const {language} = auth.userData;
    

  return (
    <View style={styles.optionContainer}>
               <TouchableOpacity onPress={() => navigation.push("Profile")}>
               <View style={styles.option}>
                    <AntDesign name="user" size={18} />
                    <AppText style={styles.myText}>{Language_Data[language]["Profile"]}</AppText>
                </View>
               </TouchableOpacity>
               <Spacer style={{height:1}} />
                <TouchableOpacity onPress={() => navigation.push("Notification")}>
                <View style={styles.option}>
                    <EvilIcons name="bell" size={18} />
                    <AppText style={styles.myText}>{Language_Data[language]["Notification"]}</AppText>
                </View>
                </TouchableOpacity>
                <Spacer style={{height:1}} />
                <TouchableOpacity onPress={() => navigation.push("Settings")}>
                <View style={styles.option}>
                    <AntDesign name="setting" size={18} />
                    <AppText style={styles.myText}>{Language_Data[language]["Settings"]}</AppText>
                </View>
                </TouchableOpacity>
                {/* <Spacer style={{height:1}} /> */}
               {/* <TouchableOpacity onPress={() => {
                Toast.show('Touched')
               }}>
               <View style={styles.option}>
                    <Ionicons name="exit-outline" size={18} />
                    <AppText style={styles.myText}>{Language_Data[language]["Log_out"]}</AppText>
                </View>
               </TouchableOpacity> */}
               </View>
  )
}

const styles = StyleSheet.create({
    optionContainer:{
        width:150,
        backgroundColor:colors.background,
        alignSelf:'flex-end',
        justifyContent:'flex-start',
        borderRadius:10,
        padding:5,
        shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2,
        zIndex:1
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
    },
    myText:{
        marginLeft:15,
        paddingRight:4,
        fontSize:13
    }
})