import axios from 'axios'
import {
    LOL_USER_GAME_SAVE_SUCCESS,
    LOL_USER_GAME_SAVE_FAIL,
    LOL_USER_GAME_LOAD_SUCCESS,
    LOL_USER_GAME_LOAD_FAIL,
    SET_ERROR_ALERT,
    REMOVE_ALERT,
    LOL_USER_GAME_UPDATE_SUCCESS,
    LOL_USER_GAME_DELETE_SUCCESS
} from './types'
import { setAlert, setErrorAlert } from './alert';
import { load_user } from '../actions/auth';



export const save_lol_usergame = ( lol_name, region, prefer_style, prefer_time, intro, lol_position, lol_prefer_mode ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    console.log(prefer_style)

    const body = JSON.stringify( { lol_name, region, prefer_style, prefer_time, intro, 'lol_position' : lol_position, 'lol_prefer_mode': lol_prefer_mode })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/matching/lol/usergame`, body, config)

        dispatch({
            type: LOL_USER_GAME_SAVE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        
        console.log(error.response)
        dispatch({
            type: LOL_USER_GAME_SAVE_FAIL,
            error: error
        })
        if(error.response.status == 401)
            dispatch(setErrorAlert('인증되지 않은 회원입니다!', 401))
        else if(error.response.status == 400)
            dispatch(setErrorAlert('작성하지 않은 곳이 있습니다!', 400))
        else
            dispatch(setErrorAlert('오류가 발생했습니다!', error.response.status));
    }
}

export const load_lol_usergame = (user_id) => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/matching/lol/usergame/`+ user_id, config)
            dispatch({
                type: LOL_USER_GAME_LOAD_SUCCESS,
                payload: res.data
            })
            
        } catch (err) {
            dispatch({
                type: LOL_USER_GAME_LOAD_FAIL
            })
        }
    } else {
        dispatch({
            type: LOL_USER_GAME_LOAD_FAIL
        });
    }
}