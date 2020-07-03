import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutbutton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51H0ouBFjxbh29PM20jsH03OeJPnV9H5CMgHk6PnMUM1IepWnaw6waUdlPsWrq3pRI6va4He3TfsJQVKMmPxmh9oU000KuSaGIv';

    const onToken = token => {
        console.log(token);
        alert('Payment Successful');
    }
    return (
        <StripeCheckout 
            label = 'Pay Now'
            name = 'Afrolace Wears'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = {`Your total is $${price}`}
            amount = {priceForStripe}
            panelLabel = 'Pay Now'
            token = {onToken}
            stripeKey = {publishableKey}
        />
    );
}

export default StripeCheckoutbutton;