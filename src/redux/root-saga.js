import { all, call } from 'redux-saga/effects'

import {fetchCollectionsStart} from './shop/shop.sagas'
import {userSagas} from './user/user.saga'
import {cartSaga} from './cart/cart.sagas'

// the function* invokes a function generator
export default function* rootSaga() {
    yield all([
        call(fetchCollectionsStart),
        call(userSagas),
        call(cartSaga)
    ])
}