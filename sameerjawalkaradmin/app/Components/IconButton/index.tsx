import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function IconButton({name, onPress, style}: any) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.btn, style]}>
      <MaterialCommunityIcons name={name} size={30} color="white" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    padding: 10,
    borderRadius: 10,
  },
});
