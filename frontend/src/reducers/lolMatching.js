import {
    LOL_USER_GAME_SAVE_SUCCESS,
    LOL_USER_GAME_SAVE_FAIL,
    LOL_USER_GAME_UPDATE_SUCCESS,
    LOL_USER_GAME_DELETE_SUCCESS
} from '../actions/types';

const initialState = {
    isLolUsergameSaved: null,
}

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type){
        case LOL_USER_GAME_SAVE_SUCCESS:
            return {
                ...state,
                isLolUsergameSaved: true
            }
        case LOL_USER_GAME_SAVE_FAIL:
            return {
                ...state,
                isLolUsergameSaved: false
            }
        default:
            return state
    }
}