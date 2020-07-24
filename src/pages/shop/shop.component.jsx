import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux'


import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/collection.container';
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';



class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
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

        const { match } = this.props;
        // const {loading} = this.state
        return (
            <div className='shop-page'>
                <Route 
                    exact path={ `${match.path}` } 
                    component = { CollectionsOverviewContainer } 
                />
                <Route 
                    path={ `${match.path}/:collectionId`}  
                    component = { CollectionPageContainer }
                />
            </div>
        )
    }
};



const mapsDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});
 


export default connect(
    null,
    mapsDispatchToProps)
    (ShopPage);