import UserActionTypes from './user.types'
const INITIAL_STATE = {
    currentUser: null,
    error: null
}

const userReducer = (state = INITIAL_STATE , action) => {
    switch (action.type) {

        
        case UserActionTypes.SIGNIN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }

        case UserActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        
        case UserActionTypes.SIGNIN_FAILED:
        case UserActionTypes.SIGN_OUT_FAILED:
        case UserActionTypes.SIGN_UP_FAILED:
            return {
                ...state,
                error: action.payload
            };
            
        default:
            return state;
    }
}


export default userReducer;