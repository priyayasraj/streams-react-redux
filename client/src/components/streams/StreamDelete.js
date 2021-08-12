import React from 'react';
import Modals from '../Modals';
import history from '../../history';
import {  useDispatch } from 'react-redux';
import { deleteStream } from '../../actions';

const StreamDelete = (props) => {
  const dispatch = useDispatch();
  const actions = () => {
    return (
      <div>
        <button onClick={() => dispatch(deleteStream(props.match.params.id))}
          className="ui button negative">
          Delete
        </button>
        <button onClick={() => history.push('/')}
          className="ui button">
          Cancel
        </button>
      </div>
    );
  }
  return (
    <div>
      StreamDelete
      <Modals title="Delete Stream"
        content="Are you sure you want to delete this stream ?"
        actions={actions}
      />
    </div>
  );
};

export default StreamDelete;
