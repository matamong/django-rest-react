import axios from 'axios'
import {
    LOL_USER_GAME_SAVE_SUCCESS,
    LOL_USER_GAME_SAVE_FAIL,
    LOL_USER_GAME_LOAD_SUCCESS,
    LOL_USER_GAME_LOAD_FAIL,
    LOL_USER_GAME_DELETE_SUCCESS,
    LOL_USER_GAME_DELETE_FAIL
} from './types'
import { setAlert, setErrorAlert } from './alert';

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
var csrftoken = getCookie('csrftoken');

export const save_lol_usergame = ( lol_name, region, prefer_style, prefer_time, intro, lol_position, lol_prefer_mode, mic ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    console.log(prefer_style)

    const body = JSON.stringify( { lol_name, region, prefer_style, prefer_time, intro, 'lol_position' : lol_position, 'lol_prefer_mode': lol_prefer_mode, mic })

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/matching/lol/usergames`, body, config)

        dispatch({
            type: LOL_USER_GAME_SAVE_SUCCESS,
            payload: res.data
        })
        dispatch(setAlert('성공적으로 등록되었습니다!'))
        return res.data
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

export const update_lol_usergame = ( lol_name, region, prefer_style, prefer_time, intro, lol_position, lol_prefer_mode, mic ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    console.log(prefer_style)

    const body = JSON.stringify( { lol_name, region, prefer_style, prefer_time, intro, 'lol_position' : lol_position, 'lol_prefer_mode': lol_prefer_mode, mic })

    try {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/matching/lol/my/usergame`, body, config)

        dispatch({
            type: LOL_USER_GAME_SAVE_SUCCESS,
            payload: res.data
        })
        return true
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

export const delete_lol_usergame = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/matching/lol/my/usergame`, config)

        dispatch({ type: LOL_USER_GAME_DELETE_SUCCESS })
        dispatch(setAlert('성공적으로 삭제되었습니다!'))

    } catch (error) {
        
        console.log(error.response)
        dispatch({
            type: LOL_USER_GAME_DELETE_FAIL,
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
// deprecated
export const load_lol_usergame = () => async dispatch => {
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/matching/lol/my/usergame`, config)
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



// Message Matching

export const create_matching_message_room = ( receiver, game_name ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    const body = JSON.stringify( { receiver, game_name })
    console.log(body)

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/rooms`, body, config)

        dispatch(setAlert('매칭이 요청되었어요!'))

        return res.data
    } catch (error) {
        if(error.response.status == 401)
            dispatch(setErrorAlert('인증되지 않은 회원입니다!', 401))
        else if(error.response.status == 400)
            dispatch(setErrorAlert('이미 존재하는 매칭방이에요!', 400))
        else
            dispatch(setErrorAlert('오류가 발생했어요!', error.response.status));
    }
}

export const send_matching_message = ( message_room_id, content ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
            'Accept': 'application/json',
            'X-CSRFToken': csrftoken
        }
    }

    console.log(csrftoken)

    const body = JSON.stringify( { content })

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/messages/`+message_room_id , body, config)
        dispatch(setAlert('메시지가 보내졌어요.'))
        return true
    } catch (error) {
        if(error.response.status == 401)
            dispatch(setErrorAlert('인증되지 않은 회원입니다!', 401))
        else if(error.response.status == 400)
            dispatch(setErrorAlert('한마디를 작성해주세요!', 400))
        else
            dispatch(setErrorAlert('오류가 발생했어요!', error.response.status));
            return false
    }
}

export const update_matching_message_room = ( message_room_id ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    console.log(config)

    const temp = 'temp'
    const body = JSON.stringify( { temp })

    try {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/messages/rooms/` + message_room_id, body, config)
        
        dispatch(setAlert('매칭이 수락되었어요!'))

    } catch (error) {
        if(error.response.status == 401)
            dispatch(setErrorAlert('로그인 해주세요', 401))
        else if(error.response.status == 403)
            dispatch(setErrorAlert('매칭 수락은 요청받은 분만 할 수 있어요.', 403))        
        else
            dispatch(setErrorAlert('오류가 발생했어요!', error.response.status));
    }
}

export const delete_matching_message_room = ( message_room_id ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + `${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }

    console.log(config)

    try {
        await axios.delete(`${process.env.REACT_APP_API_URL}/api/messages/rooms/` + message_room_id, config)
        
        dispatch(setAlert('매칭방이 삭제되었어요!'))

    } catch (error) {
        if(error.response.status == 401)
            dispatch(setErrorAlert('로그인 해주세요', 401))
        else if(error.response.status == 403)
            dispatch(setErrorAlert('매칭방 삭제는 당사자들만 할 수 있어요.', 403))        
        else
            dispatch(setErrorAlert('오류가 발생했어요!', error.response.status));
    }
}