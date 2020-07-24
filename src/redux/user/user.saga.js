import { takeLatest, all, call, put } from 'redux-saga/effects'
import UserActionTypes from './user.types'
import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils'
import {
    googleSigninSuccess,
    googleSigninFailed
} from './user.actions'

export function* signInwithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        const userRef = yield call(createUserProfileDocument, user);
        const userSnapshot = yield userRef.get();
        yield put(googleSigninSuccess({ id: userSnapshot.id, ...userSnapshot.data}))

    } catch (error) {
        yield put(googleSigninFailed(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInwithGoogle)
}

export function* userSagas() {
    yield all([call(onGoogleSignInStart)]);
}