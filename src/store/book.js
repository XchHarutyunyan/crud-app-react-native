import {createAction, createReducer} from '@reduxjs/toolkit';
const CREATE_NEW = createAction('add-new');
const MODAL = createAction('modal');
const LOADING = createAction('load');
const REMOVE_ONE = createAction('remove-one');
const UPDATE_ONE = createAction('update-one');
const GET_LIST = createAction('get-list');
const EDIT_BOOK = createAction('edit-book');

const initialState = {
  modalVisible: false,
  loading: false,
  editBook: null,
  books: [],
};

const Book = createReducer(initialState, builder => {
  builder.addCase(GET_LIST, (state, action) => {
    return {
      ...state,
      books: action.payload,
    };
  });
  builder.addCase(CREATE_NEW, (state, action) => {
    return {
      ...state,
      books: [action.payload, ...state.books],
    };
  });
  builder.addCase(UPDATE_ONE, (state, action) => {
    let prev = [...state.books];
    console.log(action.payload);
    const updatedItemIndex = prev.findIndex(
      item => item.id === action.payload.id,
    );
    console.log(updatedItemIndex);
    if (updatedItemIndex !== -1) {
      prev[updatedItemIndex] = action.payload;
    }
    return {
      ...state,
      books: prev,
    };
  });
  builder.addCase(EDIT_BOOK, (state, action) => {
    return {
      ...state,
      editBook: action.payload,
    };
  });
  builder.addCase(REMOVE_ONE, (state, action) => {
    let prev = state.books.filter(item => item.id !== action.payload);
    return {
      ...state,
      books: prev,
    };
  });
  builder.addCase(MODAL, (state, action) => {
    return {
      ...state,
      modalVisible: action.payload,
    };
  });
  builder.addCase(LOADING, (state, action) => {
    return {
      ...state,
      loading: action.payload,
    };
  });
});

export default Book;

export {
  CREATE_NEW,
  MODAL,
  LOADING,
  REMOVE_ONE,
  UPDATE_ONE,
  GET_LIST,
  EDIT_BOOK,
};
