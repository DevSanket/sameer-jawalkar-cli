import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import defaultStyle from '../../config/styles';

export default function AppTextInput({icon,width="95%",onChangeText,value,multiline,style,...otherProps}) {
  return (
    <View style={[styles.container,{width,overflow:'scroll'},style]}>
        {icon && <MaterialIcons
        name={icon}
        size={20} color={defaultStyle.colors.medium}
        style={styles.icon}
        /> }

        <TextInput 
        placeholderTextColor={defaultStyle.colors.medium}
       onChangeText={onChangeText}
       value={value}
        style={[defaultStyle.text,{marginLeft:10,width:'80%',marginBottom:-6,
        alignContent:'flex-start'
      
      }]} {...otherProps}
        />

    </View>
  )
}

const styles = StyleSheet.create({
    container :{
        alignSelf:'center',
        backgroundColor : 'white',
        borderRadius:15,
        flexDirection : "row",
        padding:10,
        marginVertical:8,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 0.5 },
        shadowOpacity: 2,
        shadowRadius: 5,
        elevation: 2
    },
    icon:{
        marginRight:10,
        marginLeft:10,
        paddingTop:13,
        alignSelf:'flex-start'
    }
})