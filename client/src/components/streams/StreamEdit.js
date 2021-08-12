import _ from 'lodash';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  editStream } from '../../actions';
import StreamForm from './StreamForm';

const StreamEdit = (props) => {  // react router dom is passing the prop, we have id here

  const dispatch = useDispatch();

  const streams = useSelector(state => {
    return (state.streams[props.match.params.id])
  });
  console.log(streams);

  const onSubmit = (formValues) => {
    dispatch(editStream(props.match.params.id, formValues));
  }
  console.log(props);
  if (!streams) {
    return <div>Loading...</div>
  }
  // initial values are being passed to redux form,its a property in reduxform
  //we will only want to pass property that we want to change
  else {
    return (
      <div>
        <h3>Edit a stream</h3>
        <StreamForm initialValues={_.pick(streams, 'title', 'description')} 
          onSubmit={onSubmit} />
      </div>
    );

  }


};
// this function gets 2 argument state and reference of components props in ownProps

export default StreamEdit;
// when we refresh the screen the stream is undefined but when we click from streamList it shows the stream. Why ?
//because when we navigate directly it has not been loaded up yet, the state is being updated in streamList. EVERY COMPONENT SHOULD FETCH ITS OWN DATA