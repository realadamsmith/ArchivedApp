import axios from 'axios';

export const checkUserIsSeller = currentUser => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes('seller')) return true;  // MAYBE ALTER THIS FOR UID SPECIFIC
  return false;                         // SO THAT SELLER PRODUCTS ARE PER SELLER
}

export const checkUserIsAdmin = currentUser => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;
  const { userRoles } = currentUser;
  if (userRoles.includes('admin')) return true;  // MAYBE ALTER THIS FOR UID SPECIFIC
  return false;                         // SO THAT SELLER PRODUCTS ARE PER SELLER
}


export const apiInstance = axios.create({  // NEED TO PUT IN LOCALHOST OR PRODUCTION LINK TO FIREBASE FUNCTION OF PAYMENT
  // baseURL: 'https:'
  baseURL: 'ht'
});                                        // THE FIRENASE FUNCTION IS RUNNING LOCALLY AND MAKE ASYNC REQ
export const apiInstance2 = axios.create({  // NEED TO PUT IN LOCALHOST OR PRODUCTION LINK TO FIREBASE FUNCTION OF PAYMENT
  // baseURL: 'https'
  baseURL: 'https:'
});                                        // THE FIRENASE FUNCTION IS RUNNING LOCALLY AND MAKE ASYNC REQ
                                          // NOW IT IS NOT RUNNING LOCALLY, PASTED FROM FIREBASE FUNCTIONS

// SEGMENT SETUP https://segment.com/docs/connections/sources/catalog/libraries/server/node/quickstart/
// var Analytics = require('analytics-node');
// var analytics = new Analytics('YU');
