import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

//NOTE: createPortal takes 2 input 1st is jsx and 2nd is HTML element reference
// We use only when we want to render something that is not inside our React app 
const Modals = (props) => {
    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active">
            <div className="ui standard modal visible active">
                <div className="header">
                    {props.title}
                </div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                  {props.actions()}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')

    );
}

export default Modals;
