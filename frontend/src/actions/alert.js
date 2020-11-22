import { SET_ALERT, REMOVE_ALERT, SET_ERROR_ALERT, REMOVE_ERROR_ALERT } from './types';
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';

export const setAlert = (msg, alertType, timeout = 2500) => dispatch => {
    const id = uuid();
    toast.success(msg, {
        toastId: id
    })
    dispatch({
        type: SET_ALERT,
        payload: { msg, alertType, id}
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
}

export const setErrorAlert = (msg, status, timeout = 2500) => dispatch => {
    const id = uuid();
    toast.error( msg, {
        toastId: id
    })
    dispatch({
        type: SET_ERROR_ALERT,
        payload: { msg, status, id}
    })
    setTimeout(() => dispatch({ type: REMOVE_ERROR_ALERT, payload: id }), timeout);
}