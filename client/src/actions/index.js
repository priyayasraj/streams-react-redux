import { formValues } from 'redux-form';
import streams from '../apis/streams';
import history from '../history';
import {
  SIGN_IN, 
  SIGN_OUT, 
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch,getState) => { // in redux thunk we get dispatch and getState function as an arguments
  const {userId} = getState().auth;
  const response = await streams.post('/streams', {...formValues,userId}); // api call to streams // adding all the key value pair along with its useerId
  dispatch({ type: CREATE_STREAM, payload: response.data });
  history.push('/'); // after creating stream it should programmatic navigate to the home page
  //doing some programmatic navigation
  //to get back the user to root route
}; // recieve after onsubmit

  export const fetchStreams = () => async dispatch => {// thunk returns a function
    const response = await streams.get('/streams');
    dispatch({type: FETCH_STREAMS, payload:response.data})
  };

  export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`);
    dispatch({type: FETCH_STREAM,payload:response.data})
  };

  export const editStream = (id,formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`,formValues); // we do not use put request because we are only passing title and 
    dispatch({type: EDIT_STREAM,payload: response.data});             //description and put it will drop of the user id
    history.push('/'); // after creating stream it should programmatic navigate to the home page
  };

  export const deleteStream = (id) => async dispatch => {
      await streams.delete(`/streams/${id}`);
      dispatch({type: DELETE_STREAM,payload: id})
      history.push('/');
  }