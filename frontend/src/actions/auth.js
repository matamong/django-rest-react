import axios from 'axios';
import {
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    LOGOUT
} from'./types';
import { setErrorAlert } from './alert'

export const checkAuthenticated = () => async dispatch => {
    if (typeof window === 'undefined') {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
    
        const body = JSON.stringify({ token: localStorage.getItem('access') });
    
        try {
            const res = await axios.post("/auth/jwt/verify/", body, config);
    
            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};
export const load_user = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        try {
            const res = await axios.get("/auth/users/me/", config);

            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
            console.log(res.data.id)
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post("/auth/jwt/create/", body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });
        if(error.response.status === 401)
            dispatch(setErrorAlert('이메일/비밀번호를 다시 확인해주세요.', 401))
        else
            dispatch(setErrorAlert('잠시 후에 다시 시도해주세요.', error.response.status));
    }
};

export const social_login = (access_token, oauth_name) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ access_token });

    try {
        const res = await axios.post("/api/users/social/"+oauth_name+'/' , body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(load_user());
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });
        if(error.response.status === 401)
            dispatch(setErrorAlert('이메일/비밀번호를 다시 확인해주세요.', 401))
        else
            dispatch(setErrorAlert('잠시 후에 다시 시도해주세요.', error.response.status));
    }
};


export const signup = ({ name, email, password, re_password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ name, email, password, re_password }); 

    try {
        await axios.post("/auth/users/", body, config);

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: {email}
        });
        return true
    } catch (error) {
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: {email}
        });
        if(error.response.status === 400){
            dispatch(setErrorAlert('보안을 위해 조금 더 어려운 비밀번호를 써볼까요?', 400))
        }
        else
            dispatch(setErrorAlert('잠시 후에 다시 시도해주세요.', error.response.status));
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token }); 

    try {
        const res = await axios.post("/auth/users/activation/", body, config);

        dispatch({
            type: ACTIVATION_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: ACTIVATION_FAIL
        });
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email }); 

    try {
        const res = await axios.post("/auth/users/reset_password/", body, config);

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
    }
};
export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password }); 

    try {
        const res = await axios.post("/auth/users/reset_password_confirm/", body, config);

        dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
    }
};

export const resend_activation_email = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post("/auth/users/resend_activation/", email, config);

        dispatch({
            type: RESET_PASSWORD_CONFIRM_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        });
    }
}


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

export const delete_user = (password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        },
        data: {
            current_password: password
        }
    }

    try {
        await axios.delete("/auth/users/me/", config);

        dispatch({
            type: DELETE_USER_SUCCESS,
        })
        dispatch(logout())
    } catch (err) {
        dispatch({
            type: DELETE_USER_FAIL
        });
        dispatch(setErrorAlert('회원 삭제에 실패했어요. 관리자에게 문의해주세요.'))
        console.log(err)
    }
}
