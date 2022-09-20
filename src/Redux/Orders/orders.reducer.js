import ordersTypes from './orders.actions';

const INITIAL_STATE = {
  orderHistory: [],
  orderDetails: {},
  orderSellerDetails: {},
};

const ordersReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case ordersTypes.SET_USER_ORDER_HISOTRY:
      return {
        ...state,
        orderHistory: action.payload
      };
    case ordersTypes.SET_ORDER_DETAILS:
      return {
        ...state,
        orderDetails: action.payload
      };
    case ordersTypes.SET_SELLERORDER_DETAILS:
      return {
        ...state,
        orderSellerDetails: action.payload
      };
    default:
      return state;
  }
};

export default ordersReducer;