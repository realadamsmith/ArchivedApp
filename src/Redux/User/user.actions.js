import userTypes from './user.types';

export const addShippingInfo = userShippingdata => ({ // USERSHIPPINGDATA IS DEFINED HERE, READY FOR DISPATCH
  type: userTypes.ADD_SHIPPING_INFO,
  payload: userShippingdata
});

export const fetchShippingStart = shippingData => ({ 
  type: userTypes.FETCH_SHIPPING_INFO,
  payload: shippingData
});

export const emailSignInStart = userCredentials => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials
});

export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const checkUserSession = () => ({ // WHY WOULD YOU NOT WANT TO LABEL YOUR PROPS? OR WHATEVER YOU'RE DISPATCHING?
  type: userTypes.CHECK_USER_SESSION
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS
});

export const signUpUserStart = userCredentials => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials
});

export const userError = err => ({
  type: userTypes.USER_ERROR,
  payload: err
});

export const resetPasswordStart = userCredentials => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START
});