import ordersTypes from './orders.actions';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { handleSaveOrder, handleGetUserOrderHistory,
  handleGetOrder, handleGetSellerOrder } from './orders.helpers';
import { auth } from './../../Firebase/utils';
import { clearCart } from './../Cart/cart.actions';
import { setUserOrderHistory, setOrderDetails, setSellerOrderDetails } from './orders.actions';


export function* getUserOrderHistory({ payload }) {
  try {
    const history = yield handleGetUserOrderHistory(payload);
    yield put(
      setUserOrderHistory(history)
    );
  } catch (err) {
    console.log(err);
  }
}
export function* onGetUserOrderHistoryStart() {
  yield takeLatest(ordersTypes.GET_USER_ORDER_HISTORY_START, getUserOrderHistory);
};



export function* saveOrder({ payload }) {
  try {
    const timestamps = new Date();
    yield handleSaveOrder({
      ...payload,
      orderUserID: auth.currentUser.uid,
      orderCreatedDate: timestamps // Might need to move this into Helper function to get right
    });

    yield put(
      clearCart()
    )
  } catch (err) {
    // console.log(err);
  }
};
export function* onSaveOrderHistoryStart() {
  yield takeLatest(ordersTypes.SAVE_ORDER_HISTORY_START, saveOrder);
};



export function* getOrderDetails({ payload }) {
  try {
    const order = yield handleGetOrder(payload);


    yield put(
      setOrderDetails(order)
    )
  } catch (err) {
    // console.log(err);
  }
}
export function* onGetOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_ORDER_DETAILS_START, getOrderDetails);
};




// GETTING SELLER ORDER DETAILS
export function* getSellerOrderDetails({ payload }) {
  try {
    const sellerOrderSet = yield handleGetSellerOrder(payload);
    //This console.log should work just like the Regular orders but why not?

    yield put(
        setSellerOrderDetails(sellerOrderSet) // Makes orderSellerDetails obtainable with mapState
        )
  } catch (err) {
    console.log(JSON.stringify(err));
  }
}
export function* onGetSellerOrderDetailsStart() {
  yield takeLatest(ordersTypes.GET_SELLERORDER_DETAILS_START, getSellerOrderDetails);
};



export default function* ordersSagas() {
  yield all([
    call(onSaveOrderHistoryStart),
    call(onGetUserOrderHistoryStart),
    call(onGetOrderDetailsStart),
    call(onGetSellerOrderDetailsStart),
  ])
}