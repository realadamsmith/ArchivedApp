
const ordersTypes = {
    SAVE_ORDER_HISTORY_START: 'SAVE_ORDER_HISTORY_START',
    GET_USER_ORDER_HISTORY_START: 'GET_USER_ORDER_HISTORY_START',
    SET_USER_ORDER_HISOTRY: 'SET_USER_ORDER_HISOTRY',

    GET_ORDER_DETAILS_START: 'GET_ORDER_DETAILS_START',
    SET_ORDER_DETAILS: 'SET_ORDER_DETAILS',

    GET_SELLERORDER_DETAILS_START: 'GET_SELLERORDER_DETAILS_START',
    SET_SELLERORDER_DETAILS: 'SET_SELLERORDER_DETAILS'
  };

export const saveOrderHistory = order => ({
  type: ordersTypes.SAVE_ORDER_HISTORY_START,
  payload: order
});

export const getUserOrderHistory = uid => ({
  type: ordersTypes.GET_USER_ORDER_HISTORY_START,
  payload: uid
});

export const setUserOrderHistory = history => ({
  type: ordersTypes.SET_USER_ORDER_HISOTRY,
  payload: history
});

// CUSTOMER ORDERS
export const getOrderDetailsStart = orderID => ({
  type: ordersTypes.GET_ORDER_DETAILS_START,
  payload: orderID
});

export const setOrderDetails = order => ({
  type: ordersTypes.SET_ORDER_DETAILS,
  payload: order
});

// SELLER ORDERS
export const getSellerOrderDetailsStart = sellerOrdersIDGet => ({
    type: ordersTypes.GET_SELLERORDER_DETAILS_START,
    payload: sellerOrdersIDGet
  });

export const setSellerOrderDetails = sellerOrderSet => ({
  type: ordersTypes.SET_SELLERORDER_DETAILS,
  payload: sellerOrderSet
});

export default ordersTypes;
