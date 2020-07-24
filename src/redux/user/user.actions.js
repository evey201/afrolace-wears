import UserActionTypes from './user.types'


export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});

export const googleSigninStart = () => ({
    type: UserActionTypes.GOOGLE_SIGNIN_START
});

export const googleSigninSuccess = user => ({
    type: UserActionTypes.GOOGLE_SIGNIN_SUCCESS,
    payload: user
});

export const googleSigninFailed = error => ({
    type: UserActionTypes.GOOGLE_SIGNIN_FAILED,
    payload: error
})
export const emailSigninStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGNIN_START,
    payload: emailAndPassword
});

export const emailSigninSuccess = user => ({
    type: UserActionTypes.EMAIL_SIGNIN_SUCCESS,
    payload: user
});

export const emailSigninFailed = error => ({
    type: UserActionTypes.EMAIL_SIGNIN_FAILED,
    payload: error
})