import UserActionTypes from './user.types'
const INITIAL_STATE = {
    currentUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {

        case UserActionTypes.GOOGLE_SIGNIN_SUCCESS:
        case UserActionTypes.EMAIL_SIGNIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }

        case UserActionTypes.GOOGLE_SIGNIN_FAILED:
        case UserActionTypes.EMAIL_SIGNIN_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}


export default userReducer;