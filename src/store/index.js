import {configureStore} from '@reduxjs/toolkit';
import book from './book';

let reducer = {
  book,
};

const store = configureStore({
  reducer,
});

export default store;
