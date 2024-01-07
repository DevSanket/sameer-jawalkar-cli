import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AppText from '../AppText/AppText'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import colors from '../../config/colors';
import Language_Data from '../../config/language';
import useAuth from '../../config/auth/useAuth';

export default function Menu({navigation}) {
  const auth = useAuth();
  const {language} = auth.userData;


  
  return (
    <View>
      <View style={styles.label}>
            <AppText style={{fontSize:18}} >{Language_Data[language]["Menu"]}</AppText>   
      </View>
 
   
      <View style={styles.MenuContainer}>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
               <TouchableOpacity onPress={() => navigation.push("Complaint")}>
               <MaterialIcons name="support-agent" size={40} />
               </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>{Language_Data[language]["Complaint"]}</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => navigation.push("AboutMe")}>
              {/* <EvilIcons name="user" size={50} /> */}
              <MaterialIcons name="supervised-user-circle" size={40} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>{Language_Data[language]["About_Me"]}</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => {
                navigation.push("AllVoterPage")
              }}>
              <MaterialIcons name="search" size={40} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>{Language_Data[language]["Voter_Id"]}</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => navigation.push('Blog')}>
              <MaterialIcons name="event-note" size={40} />
              </TouchableOpacity>
              </View>
                <AppText style={{fontSize:12}}>{Language_Data[language]["Blog"]}</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
             <TouchableOpacity onPress={() => navigation.push('TeamUp')}>
             <MaterialIcons name="chat-bubble-outline" size={40} />
             </TouchableOpacity>
              </View>
              <AppText style={{fontSize:12}}>{Language_Data[language]["Team_UP"]}</AppText>
            </View>
            <View style={styles.Menu}>
              <View style={styles.MenuImages}>
              <TouchableOpacity onPress={() => navigation.push("FeedBack")}>

              <MaterialIcons name="feedback" size={40} />
              </TouchableOpacity>
              
              </View>
              <AppText style={{fontSize:12}}>{Language_Data[language]["FeedBack"]}</AppText>
            </View>
            
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        paddingTop:10,
        paddingBottom:10,
        display:'flex',
        flexDirection:'column'
    },

    label:{
        width:'100%',
        fontSize:25,
        alignSelf:'center',
        alignItems:'center'
    },
    MenuContainer:{
        flexDirection:"row",
        justifyContent:'space-evenly',
        flexWrap:'wrap',
        alignItems:'flex-start'
    },
    Menu:{
        alignItems:'center',
        justifyContent:'center',
        width:100,
        paddingTop:10,
        paddingBottom:10,
        
        
    },
    MenuImages:{
      alignItems:'center',
      justifyContent:'center',
      height:80,
      width:80,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
        borderRadius:50,
        margin:15,
        backgroundColor:colors.white
       
    }
})