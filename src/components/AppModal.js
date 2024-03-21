import {
  Modal,
  StyleSheet,
  View,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from './Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {createBook, updateBook} from '../util/Helpers';
import {useDispatch, useSelector} from 'react-redux';
const DEFAULT_FORM_DATA = {
  title: '',
  author: '',
  year_of_publication: '',
};
const AppModal = ({handleCloseModal}) => {
  const dispatch = useDispatch();
  const showModal = useSelector(state => state.book.modalVisible);
  const editBook = useSelector(state => state.book.editBook);
  const loading = useSelector(state => state.book.loading);
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  useEffect(() => {
    if (showModal && editBook) {
      setFormData({
        title: editBook.title,
        author: editBook.author,
        year_of_publication: editBook.year_of_publication,
      });
    } else {
      setFormData(DEFAULT_FORM_DATA);
    }
  }, [showModal, editBook]);
  const handleAddBook = () => {
    if (editBook) {
      updateBook(dispatch, {data: formData, id: editBook.id});
    } else {
      createBook(dispatch, formData);
    }
  };

  const changeYear = value => {
    let cleanNumber = +value.replace(/[^0-9]/g, '');
    if (
      (cleanNumber > 0 && cleanNumber <= new Date().getFullYear()) ||
      !cleanNumber
    ) {
      cleanNumber = cleanNumber || '';
      setFormData(prevFormData => ({
        ...prevFormData,
        year_of_publication: cleanNumber,
      }));
    }
  };
  return (
    <Modal transparent visible={showModal} animationType="slide">
      <View style={styles.modalCard}>
        <KeyboardAwareScrollView>
          <View style={styles.buttonsBlock}>
            <Button
              onPress={handleCloseModal}
              text={'Cancel'}
              textStyle={{...styles.btnText, ...styles.closeBtnText}}
            />
            {loading ? (
              <ActivityIndicator size={22} color={'#008230'} />
            ) : (
              <Button
                onPress={handleAddBook}
                text={editBook ? 'Save' : 'Send'}
                textStyle={styles.btnText}
                disabled={
                  !formData.title ||
                  !formData.author ||
                  !formData.year_of_publication
                }
              />
            )}
          </View>
          <Text style={styles.title}>{editBook ? 'Update' : 'Add'} Book</Text>
          <TextInput
            onChangeText={value =>
              setFormData(prevFormData => ({...prevFormData, title: value}))
            }
            value={formData.title}
            style={styles.input}
            placeholder={'Title'}
            placeholderTextColor="#989898"
          />
          <TextInput
            onChangeText={value =>
              setFormData(prevFormData => ({...prevFormData, author: value}))
            }
            value={formData.author}
            style={styles.input}
            placeholder={'Author'}
            placeholderTextColor="#989898"
          />
          <TextInput
            keyboardType="number-pad"
            maxLength={4}
            onChangeText={changeYear}
            value={formData.year_of_publication.toString()}
            style={styles.input}
            placeholder={'Year of publication'}
            placeholderTextColor="#989898"
          />
        </KeyboardAwareScrollView>
      </View>
    </Modal>
  );
};

export default AppModal;

const styles = StyleSheet.create({
  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  input: {
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#989898',
  },
  buttonsBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnText: {
    color: '#008230',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeBtnText: {
    color: '#888888',
  },
  modalCard: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
});
