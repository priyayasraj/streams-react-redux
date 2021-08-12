import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { signIn, signOut } from '../actions';

const GoogleAuth = () => {
  const [auth,setAuth] = useState(null);
  const isSignedIn = useSelector(state => state.auth.isSignedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    window.gapi.load('client:auth2', () => { //loading up additional js from gapi library // adds more functionality 
      window.gapi.client
        .init({                             // initialize the client library with client id // returns an promise
          clientId:
            '233175742680-ockhfc6karr9o0c016llpjtuhf8j2qaa.apps.googleusercontent.com',
          scope: 'email'                                                              //what part of user we want to access
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance()); //getAuthInstance returns an object with various functions in it

          onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get()); // gets when user is signed in or not at start
          window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange); // event listener to whenever there is change in sign in or out
        });
    });

  }, [])
 
  const onAuthChange = (isSignedIn) => {
    if (isSignedIn) {
      dispatch(signIn(window.gapi.auth2.getAuthInstance().currentUser.get().getId())); // save the current userId of the user that is signed in
    } else {
      dispatch(signOut());
    }
  };

  const onSignInClick = () => {
    auth.signIn();
  };

  const onSignOutClick = () => {
    auth.signOut();
  };

  const renderAuthButton =()=> {
    if (isSignedIn === null) { // at start the initial value  will be null
      return null;
    } else if (isSignedIn) {
      return (
        <button onClick={onSignOutClick} className="ui red google button">
          <i className="google icon" />
          Sign Out
        </button>
      );
    } else {
      return (
        <button onClick={onSignInClick} className="ui red google button">
          <i className="google icon" />
          Sign In with Google
        </button>
      );
    }
  }

  
    return <div>{renderAuthButton()}</div>;
  
}

export default GoogleAuth;
