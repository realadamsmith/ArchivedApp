import productTypes from './items.types';
import productsTypes from './items.types';

// HANDLES ALL PRODUCT RELATED REDUX

const INITIAL_STATE = { // MAYBE ADD sellerProduct
  products: [],
  product: {},
  sellerProduct: {},
  sellerProducts: [],
  referral: {},
};

// Responsible for the const mapState = ({ productsData }) => ({ products:productsData.products /.product});
const productsReducer = (state=INITIAL_STATE, action) => {  // THESE ARE YOUR ACTIONS BEING CARRIED OUT
  switch(action.type) {                    // I THINK THIS HANDLES THE STATE FOR YOUR REDUX STUFF
    case productTypes.SET_REFERRAL:
      return {
        ...state,
        referral: action.payload
      }
    case productTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      }
    case productTypes.SET_SELLER_PRODUCTS:
      return {
        ...state,
        sellerProducts: action.payload //Change Products to Seller Products
      }
    case productTypes.SET_SELLER_PRODUCT:
      return {
        ...state,
        sellerProduct: action.payload //Change Products to Seller Products
      }
    case productsTypes.SET_PRODUCT:
      return {
        ...state,
        product: action.payload
      }
    default:
      return state;
  }
};

export default productsReducer;