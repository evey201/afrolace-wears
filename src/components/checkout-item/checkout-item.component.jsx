import React from 'react';
import { connect } from 'react-redux';

import { ClearItemFromCart, addItem, removeItem } from '../../redux/cart/cart.action';
import './checkout-item.styles.scss';


const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
    const { name, quantity, price, imageUrl } = cartItem;
    return (
        <div className='checkout-item'>
            <div className='image-container'>
                <img src={imageUrl} alt='item' />
            </div>
            <span className='name'> { name } </span>
            <span className='quantity'>
                <div clasname='arrow' onClick= {()=> removeItem(cartItem)} >&#10094;</div>
                <span className='value'> { quantity } </span>
                <div clasname='arrow' onClick= {() => addItem(cartItem)} > &#10095; </div>
            </span>
            <span className='price'> { price } </span>
            <div className='remove-button' onClick= {() => clearItem(cartItem)} >
                &#10005;
            </div>
        </div>
    )
}

let mapDispatchToProps = dispatch => ({
    clearItem: item => dispatch(ClearItemFromCart(item)),
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
})


export default connect(null, mapDispatchToProps)(CheckoutItem);