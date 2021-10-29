import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUppage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.actions';
// import { selectCollectionsForPreview } from './redux/shop/shop.selector'

class App extends React.Component {

  unsubscribeFromAuth = null;
  
  
  componentDidMount() {

    const { checkUserSession } = this.props;
    checkUserSession();
    // const { setCurrentUser } = this.props;

    // this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //       userRef.onSnapshot(snapshot => {
    //           setCurrentUser({
    //             id: snapshot.id,
    //             ...snapshot.data()
    //           }); 
    //         // () => {
    //         //     console.log(this.state);  //an example on how to console.log setstate
    //         // }
    //       });
    //   } 
    //     setCurrentUser(userAuth);
    //     //  Used the code below to add collections to the database: collectionsArray was destructured off the props
    //     // addCollectionAndDocuments was gotten from the firebase.utils.js file

    //     // addCollectionAndDocuments('collections',collectionsArray.map(
    //     //   ({title, items}) => ({ title, items }))
    //     // );
    // });
  }

   componentWillUnmount() {
     this.unsubscribeFromAuth();
   }


  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route exact path='/checkout' component={() => this.props.currentUser ? (CheckoutPage) : (<SignInAndSignUppage />)} />
          <Route exact path='/signin' render ={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInAndSignUppage />)} />
        </Switch>
      </div>
    );

  }

}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  // Used the code below to add files to the database
  // collectionsArray: selectCollectionsForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession()) 
})



export default connect(
  mapStateToProps, 
  mapDispatchToProps
  )(App);


