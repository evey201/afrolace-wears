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
