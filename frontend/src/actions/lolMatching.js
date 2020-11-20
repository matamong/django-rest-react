import axios from 'axios'
import {
    LOL_USER_GAME_SAVE_SUCCESS,
    LOL_USER_GAME_SAVE_FAIL,
    LOL_USER_GAME_UPDATE_SUCCESS,
    LOL_USER_GAME_DELETE_SUCCESS
} from './types'

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
    } catch (err) {
        dispatch({
            type: LOL_USER_GAME_SAVE_FAIL
        })
    }
}