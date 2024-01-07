import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function IconButton({name,onPress,style}) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn,style]}>
        <MaterialCommunityIcons name={name} size={30} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    btn:{ 
        padding:10,
        borderRadius:10
      }
})