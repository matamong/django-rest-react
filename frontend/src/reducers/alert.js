import { SET_ALERT, REMOVE_ALERT, SET_ERROR_ALERT, REMOVE_ERROR_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT:
            return [...state, payload]
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        case SET_ERROR_ALERT:
            return [...state, payload]
        case REMOVE_ERROR_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}