import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import colors from '../../config/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function BackButton({onPress, style}: any) {
  return (
    <View style={[styles.button, style]}>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons name="chevron-left" size={40} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    width: 50,
    borderRadius: 50,
    elevation: 4,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    alignSelf: 'flex-start',
  },
});
