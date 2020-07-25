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


        case UserActionTypes.SIGNIN_FAILED:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}


export default userReducer;