import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import colors from '../../config/colors';
export default function CircleButton({onPress}: {onPress: () => void}) {
  return (
    <View style={styles.button}>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons name="keyboard-arrow-right" size={40} />
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
    alignSelf: 'center',
  },
});
