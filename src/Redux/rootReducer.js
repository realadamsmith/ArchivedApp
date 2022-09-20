import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';  //WE ARE USING LOCAL STORAGE NOT "SESSION STORAGE"

import userReducer from './User/user.reducer';
import productsReducer from './Items/items.reducer';
import cartReducer from './Cart/cart.reducer';
import ordersReducer from './Orders/orders.reducer';
// import feedReducer from '../pages/ReviewTok/index.js'


export const rootReducer = combineReducers({      // HOLDS EVERYTHING THERE IS ACROSS ALL REDUX ELEMENTS, EXPORTS AS STORE FOR DESTRUCTURING ANYWHERE
  user: userReducer,
  productsData: productsReducer,
//   feedData: feedReducer,
  cartData: cartReducer,   // WE WANT TO PERSIST THIS SO IT IS PASSED BELOW INTO THE WHITELIST ARRAY
  ordersData: ordersReducer,
});

const configStorage = {
  key: 'root',
  storage,
  whitelist: ['cartData']
};


//         ░██████╗███████╗░█████╗░██████╗░░█████╗░██╗░░██╗
//         ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██║░░██║
//         ╚█████╗░█████╗░░███████║██████╔╝██║░░╚═╝███████║
//         ░╚═══██╗██╔══╝░░██╔══██║██╔══██╗██║░░██╗██╔══██║
//         ██████╔╝███████╗██║░░██║██║░░██║╚█████╔╝██║░░██║
//         ╚═════╝░╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝

// WE PRETTY MUCH HAVE ALL ACTIONS, TYPES. AND REDUCERS HERE FOR SEARCH
// export const initialState ={
//   term:null,
// };

// export const actionTypes = {
//   SET_SEARCH_TERM: "SET_SEARCH_TERM",
// };

// export const reducer = (state, action) => {
//   console.log(action);

//   switch(action.type) {
//     case actionTypes.SET_SEARCH_TERM:
//       return{
//         ...state,
//         term: action.term,
//       };
//       default:
//         return state;
//   }
// };




export default persistReducer(configStorage, rootReducer);
