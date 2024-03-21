import {
  FlatList,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import List from '../components/List';
import Header from '../components/Header';
import {MODAL, EDIT_BOOK} from '../store/book';
import AppModal from '../components/AppModal';
import {getBooks} from '../util/Helpers';

const Home = () => {
  const booksList = useSelector(state => state.book.books);
  const loading = useSelector(state => state.book.loading);
  const dispatch = useDispatch();
  const _renderList = ({item, _}) => (
    <List item={item} update={() => update(item)} />
  );

  useEffect(() => {
    getBooks(dispatch);
  }, []);

  const handleShowModal = () => {
    dispatch(EDIT_BOOK(null));
    dispatch(MODAL(true));
  };

  const update = item => {
    dispatch(EDIT_BOOK(item));
    dispatch(MODAL(true));
  };

  const handleCloseModal = () => {
    dispatch(MODAL(false));
  };

  const renderEmptyContainer = () => {
    return <Text style={styles.emptyText}>The list is empty</Text>;
  };
  return (
    <View style={styles.container}>
      <Header onPress={handleShowModal} />
      <FlatList
        style={styles.flatListContainer}
        data={booksList}
        renderItem={_renderList}
        keyExtractor={(_, i) => i.toString()}
        ListEmptyComponent={renderEmptyContainer()}
      />
      <AppModal handleCloseModal={handleCloseModal} />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={60} color={'#6b6b6b'} />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  flatListContainer: {paddingHorizontal: 10},
  loadingContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(102,102,102,0.65)',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {textAlign: 'center', marginTop: 8},
});
