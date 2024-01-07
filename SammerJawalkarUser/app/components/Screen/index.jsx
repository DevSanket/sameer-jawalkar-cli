import { Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import colors from '../../config/colors'

export default function Screen({children,style}) {
  return (
    <SafeAreaView style={[styles.container,style]}>

      {children}
  
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.background,
        paddingTop:Platform.OS === "android" ? 20 : 0
    }
})