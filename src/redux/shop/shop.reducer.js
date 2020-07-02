import SHOP_DATA from './shop.data';

const INTIAL_STATE = {
    collections: SHOP_DATA
};

const shopReducer = (state = INTIAL_STATE, action) => {
    switch (action.type) {
        // case value:
            
        //     break;
    
        default:
            return state;
    }
};

export default shopReducer;

