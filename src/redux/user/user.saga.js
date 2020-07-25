import { takeLatest, all, call, put } from 'redux-saga/effects'
import UserActionTypes from './user.types'
import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils'
import {
    SigninSuccess,
    SigninFailed,
    signOutSuccess,
    signOutFailed
} from './user.actions'

export function* getSnapshotFromUserAuth(userAuth) {
    try {

        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();
        yield put(SigninSuccess({ id: userSnapshot.id, ...userSnapshot.data}))

    } catch (error) {
        yield put(SigninFailed(error))
    }
}

export function* signInwithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        yield put(SigninFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch (error) {
        yield put(SigninFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser();
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(SigninFailed(error))
    }
}

export function* signOut() {
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error))
    }
}

export function* onGoogleSignInStart() {
    yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, signInwithGoogle)
}

export function* onEmailSignInStart() {
    yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, signInWithEmail)
}

export function* onCheckUserSession() {
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOutStart() {
    yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}

export function* userSagas() {
    yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthenticated),
        call(onSignOutStart)
    ]);
}