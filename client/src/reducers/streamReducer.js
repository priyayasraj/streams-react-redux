import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM

} from '../actions/types';
import _ from 'lodash';

// NOTE: we are using state as object not array because in array we have to map over all the streams to get the perticular id we want to edit 
//while in object we can access it by its id
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return { ...state,..._.mapKeys(action.payload,'id')}; // returns an object with id as its key 1 : { id : 1,title: stream 1}
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload }; //Es15 syntax
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }; 
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state,action.payload); //no need to add id because we have passed id in payload// creates new object so do not need ... operator
        default:
            return state;
    }
}