import React from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';

import { createStructuredSelector } from 'reselect';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector'

import { ReactComponent as Logo } from '../../assets/crown.svg'
import { 
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink 
} from './header.styles';
const Header = ({ currentUser, hidden }) => (
    <HeaderContainer>
        <LogoContainer to="/">
            <Logo className='logo' />
        </LogoContainer>

        <OptionsContainer>
            <OptionLink to='/shop' >
                SHOP
            </OptionLink>
            <OptionLink to='/contact' >
                CONTACT
            </OptionLink>
            {
                currentUser ? (
                <OptionLink as='div' onClick={() => auth.signOut()} >
                    SIGN OUT
                </OptionLink>
                ):(
                <OptionLink to='/signin'>
                    SIGN IN
                </OptionLink>
                
            )}
            <CartIcon />
        </OptionsContainer>
        {
            hidden ? null : <CartDropdown />
        }
    </HeaderContainer>

    
)

let mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);