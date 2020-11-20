import { combineReducers } from 'redux';
import auth from './auth';
import lolMatching from './lolMatching';

export default combineReducers({
    auth,
    lolMatching
});