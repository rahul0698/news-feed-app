import * as actionTypes from './actionTypes';

export const authSuccess = (isLoggedIn: boolean) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        isLoggedIn: isLoggedIn,
    };
};

export const authFail = (error: string) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = (isLoggedIn: boolean) => {
    return {
        type: actionTypes.AUTH_LOGOUT,
        isLoggedIn: isLoggedIn
    };
};

export const auth = (error: string, isLoggedIn: boolean) => {
    return (dispatch: any) => {
        if(error) {
            dispatch(authFail(error));
        } else {
            dispatch(authSuccess(isLoggedIn));
        }
    };
};
