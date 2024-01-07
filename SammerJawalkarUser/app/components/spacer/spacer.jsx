import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

export default function Spacer({style}) {
  return (
    <View style={[styles.spacer,style]}>
    </View>
  )
}

const styles = StyleSheet.create({
    spacer:{
        height:2,
        backgroundColor:colors.gray,
        width:'100%'
    }
})