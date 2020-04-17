import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUppage from './pages/sign-in-sign-up/sign-in-sign-up.component';
import { auth, createUserProfileDocument  } from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;


  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged( async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapshot => {
           this.setState({
              currentUser: {
                id: snapshot.id,
                ...snapshot.data()
              }
            }, () => {
                console.log(this.state);  //an example on how to console.log setstate
            });
          });
      } else {
        this.setState({currentUser: userAuth});
      }
    });
  }

   componentWillUnmount() {
     this.unsubscribeFromAuth();
   }


  render() {
    return (
      <div>
        <Header currentUser={ this.state.currentUser } />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signin' component={ SignInAndSignUppage } />
        </Switch>
      </div>
    );

  }

}

export default App;
