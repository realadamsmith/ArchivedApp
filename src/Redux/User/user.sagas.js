import { takeLatest, call, all, put } from 'redux-saga/effects';
import { auth, handleUserProfile, getCurrentUser, GoogleProvider } from './../../Firebase/utils';
import userTypes from './user.types';
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userError, fetchShippingStart } from './user.actions';
import { handleResetPasswordAPI, handleUserShippingSave, handleFetchUserShipping } from './user.helpers';

export function* addUserShippingInfo({ payload }) { // THE PAYLOAD IS JUST THE FIELDS YOU PUT AND LABELLING THEM AS userShippingdata, anything you want to call it.
  try {
    const timestamp = new Date();
    yield handleUserShippingSave({  // FUNCTION 1 BEING YIELDED FOR ADD_NEW_PRODUCT_START
      ...payload,
      // productSellerUserID: auth.currentUser.uid, // CREATES A FIELD TO ADD
      createdDateShipping: timestamp                      // CREATES TIMESTAMP FIELD

    });
    yield put(
      fetchShippingStart()  // FUNCTION 2 BEING YIELDED FOR ADD_NEW_PRODUCT_START
    );
  } catch (err) {
    console.log(err);
  }
}
export function* onaddUserShippingInfo() {
  yield takeLatest(userTypes.ADD_SHIPPING_INFO, addUserShippingInfo);   // DOES THIS MEAN WE ARE LOADING THESE FUNCTIONS INTO onADDPRODSTART?
}  // WE ARE REFERRING TO THE ITEMS.TYPES ACTION: ADD_NEW_PRODUCT_START, and ITS


/////////////////// FOR FETCHING SHIPPING

export function* fetchUserShippingInfo({ payload }) { // MAY NEED TO DUP THIS FOR NEW SEARCH HELPER
  try {
    console.log('the user shipinfo is set')

    const userShipinfo = yield handleFetchUserShipping(payload); // .helper func for fetching user Shipping info
    console.log('the full helper func went thru', {userShipinfo})
    // yield put(
    //   setShipping(userShipInfo) // PAYLOAD IS ALL THE SHIPPING INFO OF 1 USER
    // );
  } catch (err) {
    console.log(err);
  }
}


export function* onFetchShippingInfo() {  // GENERATOR FUNCTIONS FOR /ADMIN to fetch
  yield takeLatest(userTypes.FETCH_SHIPPING_INFO, fetchUserShippingInfo);
}

///////////////////






export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);

  } catch (errordude) {
    // const er = ['Password or email not valid'];
    const er = ['Password or email not valid, refresh page and try again or contact support'];
    yield put(
      userError(errordude)
    );
    return;

  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapshotFromUserAuth(userAuth);

  } catch (err) {
    console.log(err);
  }
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword,

  } }) {

    if (password !== confirmPassword) {
      const err = ['Password does not match'];
      yield put(
        userError(err)
      );
      return;
    }

    try {
      const { user } = yield auth.createUserWithEmailAndPassword(email, password);
      const additionalData = {
        displayName,
        points: 1000,
        Totalpoints: 1000,
        VideosVotedUp: 0,
      };
      yield getSnapshotFromUserAuth(user, additionalData);

    } catch (err) {
      console.log(err);
    }

  }

  export function* onSignUpUserStart() {
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
  }

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(
      signOutUserSuccess()
    )

  } catch (err) {
    console.log(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}



export function* resetPassword({ payload: { email }}) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(
      resetPasswordSuccess()
    );

  } catch (err) {
    yield put(
      userError(err)
    )
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
    try {
      const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
      const snapshot = yield userRef.get();
      yield put(
        signInSuccess({ // This shows you all the data related to that user. But we can't pass it into another Saga because
          id: snapshot.id,
          ...snapshot.data()
        })
      );

    } catch (err) {
      console.log(err);
    }
  }

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);

  } catch (err) {
    console.log(err);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}


export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUserStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
    call(onaddUserShippingInfo),
    call(onFetchShippingInfo), // IF WE DON'T HAVE THIS, THE HELPER FUNC DOES NOT START

  ])
}