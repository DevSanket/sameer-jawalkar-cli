import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'
import EvilIcons from 'react-native-vector-icons/EvilIcons';

export default function BackButton({onPress,style}) {
  return (
    <View style={[styles.button,style]} >
        <TouchableOpacity onPress={onPress}>
        <EvilIcons name="chevron-left" size={50} style={{marginTop : -8}} />
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    button:{
        height:50,
        width:50,
        borderRadius:50,
        shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
  elevation: 2,
        backgroundColor:colors.white,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginLeft:10,
        alignSelf:'flex-start'
    }
})