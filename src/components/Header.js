import {View, StyleSheet} from 'react-native';
import React from 'react';
import Button from './Button';

export default function Header({onPress}) {
  return (
    <View style={styles.header}>
      <Button text={'Add Book'} onPress={onPress} style={styles.btn} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  btn: {
    alignSelf: 'flex-end',
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 5,
    backgroundColor: '#1f65ff',
  },
});
