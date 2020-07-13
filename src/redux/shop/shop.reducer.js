
// import SHOP_DATA from './shop.data'; Not importing this file since the backend is now handled with firebase...
import ShopActionTypes from './shop.types';

const INTIAL_STATE = {
    collections: null
};

const shopReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.UPDATE_COLLECTIONS:
            return {
                ...state,
                collections: action.payload
            }
        default:
            return state;
    }
};

export default shopReducer;

