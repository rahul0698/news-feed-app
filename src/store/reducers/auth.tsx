import * as actions from '../actions/actionTypes';

import {updateObject} from "../../utility/utility";

interface InititalAuthState {
    isLoggedIn: boolean;
    error: any;
}

const initialState: InititalAuthState = {
    isLoggedIn: false,
    error: null
};

const authSuccess = (state: InititalAuthState, action: any) => {
    return updateObject(state, {
        isLoggedIn: action.isLoggedIn,
        error: null
    });
};

const authFail = (state: InititalAuthState, action: any) => {
    return updateObject(state, {
        isLoggedIn: false,
        error: action.error
    });
};


const authLogout = (state: InititalAuthState, action: any) => {
    return updateObject(state,{
        isLoggedIn: false,
        error: null
    });
};

const reducer = (state = initialState, action: any) => {
    switch(action.type) {
        case actions.AUTH_SUCCESS:
            return authSuccess(state, action);
        case actions.AUTH_FAIL:
            return authFail(state, action);
        case actions.AUTH_LOGOUT:
            return authLogout(state, action);
        default: return state;
    };
};

export default reducer;