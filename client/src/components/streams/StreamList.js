import React, { useEffect } from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchStreams } from '../../actions';
import { Link } from 'react-router-dom';

const StreamList = () => {
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(fetchStreams());  
  }, [dispatch]);

  const streamsAllDetails = useSelector((state) => {
    return {streams: Object.values(state.streams),// coverting it to array of values so that we can use map
    currentUserId: state.auth.userId,// id of person currently signed in
    isSignedIn: state.auth.isSignedIn}// for checking if user is signed in or not
  });

  //NOTE: we use Link component to fetch URL within our app and anchor to fetch external page that is not in our app
  //Link also passes props which is useful
  const renderAdmin = (stream) => {
    if (stream.userId === streamsAllDetails.currentUserId) {
      return (
        <div className="right floated content">
          <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
        </div>
      );
    }
  }
  const renderList = () => {
    return streamsAllDetails.streams.map(stream => {
      return (
        <div className="item" key={stream.id}>
          {renderAdmin(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
            {stream.title}
            <div className="description">
              {stream.description}
            </div>

          </div>
        </div>
      )
    })
  }

  const renderCreate = () => {
    if (streamsAllDetails.isSignedIn) {
      return (
        <div style={{ textAlign: 'right' }}>
          <Link to="/streams/new" className="ui button primary">
            Create Stream
          </Link>
        </div>
      )
    }
  }

  return (
    <div>
      <h2>Streams</h2>
      <div className="ui celled list">{renderList()}</div>
      {renderCreate()}
    </div>
  );

}
/*const mapStateToProps = (state) => { // adding my state values to props of this component
  return {
    streams: Object.values(state.streams),// coverting it to array of values
    currentUserId: state.auth.userId,// id of person currently signed in
    isSignedIn: state.auth.isSignedIn // for checking if user is signed in
  };
};*/

export default StreamList;
