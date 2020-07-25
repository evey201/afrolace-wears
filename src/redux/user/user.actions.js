import UserActionTypes from './user.types'


// export const setCurrentUser = user => ({
//     type: UserActionTypes.SET_CURRENT_USER,
//     payload: user
// });

export const googleSigninStart = () => ({
    type: UserActionTypes.GOOGLE_SIGNIN_START
});

export const SigninSuccess = user => ({
    type: UserActionTypes.SIGNIN_SUCCESS,
    payload: user
});

export const SigninFailed = error => ({
    type: UserActionTypes.SIGNIN_FAILED,
    payload: error
})
export const emailSigninStart = emailAndPassword => ({
    type: UserActionTypes.EMAIL_SIGNIN_START,
    payload: emailAndPassword
});

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailed = error => ({
    type: UserActionTypes.SIGN_OUT_FAILED,
    payload: error
});