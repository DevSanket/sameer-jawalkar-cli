import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import colors from '../../config/colors';

type Props = {
  children: JSX.Element;
  style?: any;
};

export default function Screen({children, style}: Props) {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    backgroundColor: colors.background,
    width: '100%',
  },
});
