import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import colors from '../../config/colors'
export default function CircleButton({onPress,style,size=40}) {
  return (
    <View style={[styles.button,style]}>
        <TouchableOpacity onPress={onPress}>
        <MaterialCommunityIcon name="arrow-right" size={size} />
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
        marginTop:10
    }
})