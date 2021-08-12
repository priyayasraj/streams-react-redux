import React from 'react';
import { Router, Route } from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import Header from './Header';
import history from '../history'; 
// Note:we are using plain router because browserrouter by default uses its own history object and throws error
//:id in edit is variable its an wildcard variable
//history object has urls of the components that user visited
const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>    
        <div>
          <Header />
          <Route path="/" exact component={StreamList} />
          <Route path="/streams/new" exact component={StreamCreate} />
          <Route path="/streams/edit/:id" exact component={StreamEdit} /> 
          <Route path="/streams/delete/:id" exact component={StreamDelete} />
         
        </div>
      </Router>
    </div>
  );
};

export default App;
