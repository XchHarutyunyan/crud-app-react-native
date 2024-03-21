import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
const DEFAULT_TEXT_STYLE = {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 18,
};
export default function Button({
  onPress = () => null,
  disabled = false,
  style,
  text,
  textStyle = DEFAULT_TEXT_STYLE,
}) {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{...style, opacity: disabled ? 0.4 : 1}}>
      <Text style={{...textStyle}}>{text}</Text>
    </TouchableOpacity>
  );
}
