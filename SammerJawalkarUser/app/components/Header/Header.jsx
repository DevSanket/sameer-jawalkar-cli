import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import OptionContainer from '../OptionContainer/OptionContainer';
import colors from '../../config/colors';

export default function Header() {
    const [options,setOptions] = useState(false);
  return (
    <View style={styles.header}>
       <View style={styles.ImageContainer}>
               <View style={{elevation:4}}>
                <Image 
                style={{height:30,width:30}}
                source={require('../../img/bjp.png')}
                />
                </View>
                <View style={{padding:4,elevation:4,backgroundColor:colors.white,borderRadius:40}}>

                <TouchableOpacity onPress={
                   () => setOptions(!options)
                }>
                <Image 
                style={{height:30,width:30}}
                source={require('../../img/user.png')}
                />
                </TouchableOpacity>
                </View>
               </View>

               {
                options && <OptionContainer  />
               }
    </View>
  )
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 50,
        position: 'absolute',
        flexDirection: 'row',
        flex: 1,
        backgroundColor: colors.lightBlue,
        width:'100%'
      },
      ImageContainer:{
        display:'flex',
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'flex-start',
        padding:10
        
    },
})