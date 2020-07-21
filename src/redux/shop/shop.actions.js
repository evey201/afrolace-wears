import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'

export const fetchCollectionsStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const fetchCollectionsFailed = errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        // Using Promises(the .get method) to fetch data, the drawback to this method is that
        // it does not automatically reload live data unless the subscription is renewed
        collectionRef
            .get()
            .then(
                snapshot => {
                    const collectionsMap= convertCollectionsSnapshotToMap(snapshot);
                    dispatch(fetchCollectionsSuccess(collectionsMap))
                }
            ).catch(error => dispatch(fetchCollectionsFailed(error.message)));
    };
}