import React from 'react';
import { useDispatch} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';

const StreamCreate = () => {
  
  const dispatch = useDispatch();
  const onSubmit  =(formValues) => {
    dispatch(createStream(formValues));//action creator will be called 
  }

    return (
      <div>
        <h3>Create a stream</h3>
        <StreamForm onSubmit={onSubmit}/>
      </div>
    );
  
}


export default StreamCreate; // adding coonect because we want to dispatch action to store
