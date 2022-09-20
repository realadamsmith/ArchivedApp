import { createSelector } from 'reselect';


export const selectCartData = state => state.cartData;

export const selectCartItems = createSelector(
  [selectCartData],
  cartData => cartData.cartItems
);



export const selectCartItemsCount = createSelector(
  [selectCartItems],                        // PASS THIS INTO selectCartItems
  cartItems =>
    cartItems.reduce(
      (quantity, cartItem) =>
        quantity + cartItem.quantity
      , 0)
);



export const selectCartTotal = createSelector( // Apparently is equal to just a number
  [selectCartItems],
  cartItems =>
    cartItems.reduce((quantity, cartItem) => Number((quantity + cartItem.quantity * cartItem.productPrice).toFixed(2)), 0)
);



export const selectSellersTotal = createSelector(
    [selectCartItems],
    cartItems =>
    // console.log(cartItems) ||
    cartItems.reduce((acc, value) => {
        if(acc[value.productHeroSellerID]) {
          acc[value.productHeroSellerID] += Number(value.productPrice*value.quantity);
        } else {
          acc[value.productHeroSellerID] = Number(value.productPrice*value.quantity); // quantity takes care of the multiple of same item
        }
        return acc;
    }, {}),
)
