// Utility functions help to keep 
// files clean and 
// also organizes functions that we may need in multiple locations


export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(
        cartItem => cartItem.id === cartItemToAdd.id
    )

    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        )
    }
    // The quantity property gets attached the first time around ince the 'If' block wont run when its a new item
    return [...cartItems, {...cartItemToAdd, quantity: 1} ]
};