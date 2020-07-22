import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { compose } from 'redux';

import { selectIsCollectionsFetching } from '../../redux/shop/shop.selector';
import WithSpinner from "../with-spinner/with-spinner.component";
import CollectionsOverview from './collections-overview.component';

const mapsStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionsFetching,
}); 

const CollectionsOverviewContainer = compose(
    connect(mapsStateToProps),
    WithSpinner
)(CollectionsOverview);

export default CollectionsOverviewContainer;