import cartTypes from './cart.types'


export const addProduct = (nextCartItem) => ({
    type: cartTypes.ADD_TO_CART,
    payload: nextCartItem
});



export const removeCartItem = (cartItem) => ({
  type: cartTypes.REMOVE_CART_ITEM,
  payload: cartItem
});



export const reduceCartItem = (cartItem) => ({
  type: cartTypes.REDUCE_CART_ITEM,
  payload: cartItem
});



export const clearCart = () => ({
  type: cartTypes.CLEAR_CART
})


export const saveCartItems = (cartItem) => ({ // FOR SAVING ITEMS IN THE CART PER USER
  type: cartTypes.SAVE_USER_CART,
  payload: cartItem
});
