import { combineReducers } from 'redux';
import auth from './auth';
import lolMatching from './lolMatching';
import alert from './alert'

export default combineReducers({
    auth,
    alert,
    lolMatching,
});