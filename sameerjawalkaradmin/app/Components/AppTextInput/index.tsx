import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import defaultStyle from '../../config/styles';

export default function AppTextInput({
  icon,
  width = '95%',
  onChangeText,
  value,
  ...otherProps
}: any) {
  return (
    <View style={[styles.container, {width, overflow: 'scroll'}]}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color={defaultStyle.colors.medium}
          style={styles.icon}
        />
      )}

      <TextInput
        placeholderTextColor={defaultStyle.colors.medium}
        onChangeText={onChangeText}
        value={value}
        style={[
          defaultStyle.text,
          {marginLeft: 10, width: '80%', marginBottom: -6},
        ]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: defaultStyle.colors.light,
    borderRadius: 15,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
    elevation: 4,
  },
  icon: {
    marginRight: 10,
    paddingTop: 5,
    marginTop: 10,
  },
});
