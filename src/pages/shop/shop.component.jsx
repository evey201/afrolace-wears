import React from 'react';
import { Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';
import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';
import { selectIsCollectionsFetching, selectCollectionIsLoaded } from '../../redux/shop/shop.selector';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }

    // state = {
    //     loading : true
    // };

    // unSubscribeFromSnapshot = null;

    // componentDidMount() {
        // const { updateCollections } = this.props;
        
        
        //  This uses observable pattern that firebase provides
        // this.unSubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
        //    const collectionsMap= convertCollectionsSnapshotToMap(snapshot);
        //    updateCollections(collectionsMap)
        //    this.setState({ loading:false });
        // });
        
        // Using the fetch pattern, which is typically used when different serversother than firebase are used.
        // fetch('https://firestore.googleapis.com/v1/projects/afrolace-db/databases/(default)/documents/collections')
        // .then(response => response.json())
        // .then(collections => console.log(collections));   
    // }

    render() {

        const { match, isCollectionFetching, selectCollectionIsLoaded } = this.props;
        // const {loading} = this.state
        return (
            <div className='shop-page'>
                <Route 
                    exact path={ `${match.path}` } 
                    render= {(props => <CollectionsOverviewWithSpinner isLoading={ isCollectionFetching } {...props} /> )} 
                />
                <Route 
                    path={ `${match.path}/:collectionId`}  
                    render= {(props => <CollectionPageWithSpinner isLoading={!selectCollectionIsLoaded} {...props} /> )}
                />
            </div>
        )
    }
};

const mapsStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionsFetching,
    isCollectionLoaded: selectCollectionIsLoaded
})

const mapsDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})
 


export default connect(
    mapsStateToProps, 
    mapsDispatchToProps)
    (ShopPage);