import {
    LOL_USER_GAME_SAVE_SUCCESS,
    LOL_USER_GAME_SAVE_FAIL,
    LOL_USER_GAME_LOAD_SUCCESS,
    LOL_USER_GAME_LOAD_FAIL,
    LOL_USER_GAME_UPDATE_SUCCESS,
    LOL_USER_GAME_DELETE_SUCCESS
} from '../actions/types';

const initialState = {
    isLolUsergameSaved: false,
    lolProfile: null
}


export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case LOL_USER_GAME_SAVE_SUCCESS:
            return {
                ...state,
                isLolUsergameSaved: true,
                lolProfile: payload
            }
        case LOL_USER_GAME_SAVE_FAIL:
            return {
                ...state,
                isLolUsergameSaved: false
            }
        case LOL_USER_GAME_DELETE_SUCCESS:
            return {
                ...state,
                lolProfile: null
            }
        case LOL_USER_GAME_LOAD_SUCCESS:
            return {
                ...state,
                lolProfile: payload
            }
            case LOL_USER_GAME_LOAD_FAIL:
                return {
                    ...state,
                    lolProfile: null
                }
        default:
            return state
    }
}