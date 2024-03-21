import {
  CREATE_NEW,
  LOADING,
  MODAL,
  REMOVE_ONE,
  UPDATE_ONE,
  GET_LIST,
} from '../store/book';
import axiosApi from '../services/axiosApi';
import {books} from '../constants/urls';

const getBooks = dispatch => {
  dispatch(LOADING(true));
  axiosApi
    .get(books)
    .then(response => {
      dispatch(GET_LIST(response.data));
    })
    .finally(() => {
      dispatch(LOADING(false));
    });
};
const createBook = (dispatch, data) => {
  dispatch(LOADING(true));
  axiosApi
    .post(books, data)
    .then(response => {
      dispatch(CREATE_NEW(response.data));
      dispatch(MODAL(false));
    })
    .finally(() => {
      dispatch(LOADING(false));
    });
};
const updateBook = (dispatch, {data, id}) => {
  dispatch(LOADING(true));
  axiosApi
    .patch(`${books}/${id}`, data)
    .then(response => {
      dispatch(UPDATE_ONE(response.data));
      dispatch(MODAL(false));
    })
    .finally(() => {
      dispatch(LOADING(false));
    });
};
const deleteBook = (dispatch, id) => {
  dispatch(LOADING(true));
  axiosApi
    .delete(`${books}/${id}`)
    .then(() => {
      dispatch(REMOVE_ONE(id));
    })
    .finally(() => {
      dispatch(LOADING(false));
    });
};

export {createBook, updateBook, deleteBook, getBooks};
