import productsTypes from './items.types';


export const referralProduct = referralID => ({
  type: productsTypes.REFERRAL_PRODUCT,
  payload: referralID
});
export const setReferral = referral => ({ // PRODUCTS IS DEFINED HERE, READY FOR DISPATCH
  type: productsTypes.SET_REFERRAL,
  payload: referral
});

export const addProductStart = productData => ({ // PRODUCTDATA IS DEFINED HERE AS THE NAME FOR PROPS WHICH IS THE NAME PRICE ETC, READY FOR DISPATCH
  type: productsTypes.ADD_NEW_PRODUCT_START,     // OKAY MAYBE NOT READY FOR DISPATCH
  payload: productData
});

export const fetchProductsStart = (filters={}) => ({
  type: productsTypes.FETCH_PRODUCTS_START,
  payload: filters
});

export const fetchProductStart = productID => ({
  type: productsTypes.FETCH_PRODUCT_START,
  payload: productID
});

export const setProduct = product => ({
  type: productsTypes.SET_PRODUCT,
  payload: product
});

export const setProducts = products => ({ // PRODUCTS IS DEFINED HERE, READY FOR DISPATCH
  type: productsTypes.SET_PRODUCTS,
  payload: products
});
// ░██████╗███████╗██╗░░░░░██╗░░░░░███████╗██████╗░  ██████╗░██████╗░░█████╗░██████╗░██╗░░░██╗░█████╗░████████╗░██████╗
// ██╔════╝██╔════╝██║░░░░░██║░░░░░██╔════╝██╔══██╗  ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║░░░██║██╔══██╗╚══██╔══╝██╔════╝
// ╚█████╗░█████╗░░██║░░░░░██║░░░░░█████╗░░██████╔╝  ██████╔╝██████╔╝██║░░██║██║░░██║██║░░░██║██║░░╚═╝░░░██║░░░╚█████╗░
// ░╚═══██╗██╔══╝░░██║░░░░░██║░░░░░██╔══╝░░██╔══██╗  ██╔═══╝░██╔══██╗██║░░██║██║░░██║██║░░░██║██║░░██╗░░░██║░░░░╚═══██╗
// ██████╔╝███████╗███████╗███████╗███████╗██║░░██║  ██║░░░░░██║░░██║╚█████╔╝██████╔╝╚██████╔╝╚█████╔╝░░░██║░░░██████╔╝
// ╚═════╝░╚══════╝╚══════╝╚══════╝╚══════╝╚═╝░░╚═╝  ╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═════╝░░╚═════╝░░╚════╝░░░░╚═╝░░░╚═════╝░

export const fetchSellerProductsStart = (filters={}) => ({
  type: productsTypes.FETCH_SELLER_PRODUCTS_START,
  payload: filters
});

export const setSellerProducts = products => ({ // PRODUCTS IS DEFINED HERE, READY FOR DISPATCH
  type: productsTypes.SET_SELLER_PRODUCTS,
  payload: products
});

export const setSellerProduct = product => ({
  type: productsTypes.SET_SELLER_PRODUCT,
  payload: product
});

export const deleteProductStart = productID => ({
  type: productsTypes.DELETE_PRODUCT_START,
  payload: productID
});

