import { combineReducers } from 'redux';
import auth from './auth';
import matching from './matching';
import alert from './alert'

export default combineReducers({
    auth,
    alert,
    matching,
});