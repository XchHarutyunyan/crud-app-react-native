import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteBook} from '../util/Helpers';

const screenWidth = Dimensions.get('window').width;

export default function List({item, update}) {
  let dispatch = useDispatch();
  let onPressRemove = () => {
    deleteBook(dispatch, item?.id);
  };
  let onPressUpdate = () => {
    update();
  };
  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <View style={styles.flex}>
          <TouchableOpacity onPress={onPressUpdate}>
            <Image
              style={styles.actionIcon}
              source={require('../assets/images/edit.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressRemove}>
            <Image
              style={{...styles.actionIcon, marginLeft: 14}}
              source={require('../assets/images/trash.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.flex}>
        <Text style={styles.authorName} numberOfLines={1}>
          {item.author}
        </Text>
        <Text style={styles.date}>year - {item.year_of_publication}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    marginVertical: 5,
    borderRadius: 5,
    padding: 8,
    elevation: 5,
    width: '100%',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {color: '#000', fontSize: 20, maxWidth: screenWidth - 90},
  date: {color: '#868686'},
  authorName: {color: '#000', fontWeight: 'bold', maxWidth: screenWidth - 90},
  actionIcon: {width: 26, height: 26},
});
