import React from 'react';
import Button from './../../Forms/Button';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from './../../../Redux/Cart/cart.actions';

// THIS FILE IS IMPORTED INTO ITEMRESULTS TO LOAD EACH ITEM

// ██╗░██████╗  ███████╗░█████╗░██████╗░  ███████╗░█████╗░░█████╗░██╗░░██╗  
// ██║██╔════╝  ██╔════╝██╔══██╗██╔══██╗  ██╔════╝██╔══██╗██╔══██╗██║░░██║  
// ██║╚█████╗░  █████╗░░██║░░██║██████╔╝  █████╗░░███████║██║░░╚═╝███████║  
// ██║░╚═══██╗  ██╔══╝░░██║░░██║██╔══██╗  ██╔══╝░░██╔══██║██║░░██╗██╔══██║  
// ██║██████╔╝  ██║░░░░░╚█████╔╝██║░░██║  ███████╗██║░░██║╚█████╔╝██║░░██║  
// ╚═╝╚═════╝░  ╚═╝░░░░░░╚════╝░╚═╝░░╚═╝  ╚══════╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝  
// 
// ██████╗░██████╗░░█████╗░██████╗░██╗░░░██╗░█████╗░████████╗  ░█████╗░███╗░░██╗  
// ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║░░░██║██╔══██╗╚══██╔══╝  ██╔══██╗████╗░██║  
// ██████╔╝██████╔╝██║░░██║██║░░██║██║░░░██║██║░░╚═╝░░░██║░░░  ██║░░██║██╔██╗██║  
// ██╔═══╝░██╔══██╗██║░░██║██║░░██║██║░░░██║██║░░██╗░░░██║░░░  ██║░░██║██║╚████║  
// ██║░░░░░██║░░██║╚█████╔╝██████╔╝╚██████╔╝╚█████╔╝░░░██║░░░  ╚█████╔╝██║░╚███║  
// ╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═════╝░░╚═════╝░░╚════╝░░░░╚═╝░░░  ░╚════╝░╚═╝░░╚══╝  
// 
// ░██████╗███████╗░█████╗░██████╗░░█████╗░██╗░░██╗  ██████╗░░█████╗░░██████╗░███████╗
// ██╔════╝██╔════╝██╔══██╗██╔══██╗██╔══██╗██║░░██║  ██╔══██╗██╔══██╗██╔════╝░██╔════╝
// ╚█████╗░█████╗░░███████║██████╔╝██║░░╚═╝███████║  ██████╔╝███████║██║░░██╗░█████╗░░
// ░╚═══██╗██╔══╝░░██╔══██║██╔══██╗██║░░██╗██╔══██║  ██╔═══╝░██╔══██║██║░░╚██╗██╔══╝░░
// ██████╔╝███████╗██║░░██║██║░░██║╚█████╔╝██║░░██║  ██║░░░░░██║░░██║╚██████╔╝███████╗
// ╚═════╝░╚══════╝╚═╝░░╚═╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝  ╚═╝░░░░░╚═╝░░╚═╝░╚═════╝░╚══════╝


const ProductCol = (product) => { // HAD TO CHANGE THE DESTRUCTURING TO RECIEVE THE PRODUCT OBJECT AND THEN DESTRUCTURE FROM THE PRODUVT ITSELF
  const dispatch = useDispatch();
  const history = useHistory();
  const {
    documentID,
    productThumbnail,
    productName,
    productPrice
  } = product;  // I BELIEVE THIS IS COMING FROM THE HOOK MENTIONED IN ITEMS.SAGAS "FETCHPRODUCT", AND THEN PRODUCTS FOR ITEMRESULTS PAGE.

  if (!documentID || !productThumbnail || !productName ||
    typeof productPrice === 'undefined') return null;

  const configAddToCartBtn = {
    type: 'button'
  };

    const handleAddToCart = (product) => {  //  NEW FUNCTION TO TAKE THE PRODUCT AND IF THERE IS NO PRODUCT, 
    if (!product) return;                   //  PASS THE PRODUCT OBJECT TO THE ADDPRODUCT ACTION AND PERFORM THE 
    dispatch(                               //  CART ACTION. NOW WHEN YOU CHECK STATE, THE ARRAY WILL BE UPDATED WITH THE 
      addProduct(product)  
          );
    history.push('/cart');                  //  NUMBER OF PRODUCTS
                                            //  NOW WE NEED TO GO TO CARTREDUCER AND CHECK IF THE SAME ITEM IS ADDED 2X
  };                                        //  NOW WE WRITE A UTIL FUNC THAT WILL HANDLE THIS

  return (
    <div className="product">
      <div className="thumb">
        <Link to={`/product/${documentID}`}>
          <img src={productThumbnail} alt={productName} />
        </Link>
      </div>

      <div className="details">
        <ul>
          <li>
            <span className="name">
              <Link to={`/product/${documentID}`}>
                {productName}
              </Link>
            </span>
          </li>
          <li>
            <span className="price">
              ${productPrice}
            </span>
          </li>
          {/* <li>
            <div className="addToCart">   
            ALL ITEMS ARE CARRIED OUT WITH ADD TO CART BUTTON HERE, SO PUT REDUX ACTIONS HERE
              <Button {...configAddToCartBtn} onClick={() => handleAddToCart(product)}>       
               Add to cart
              </Button>
            </div>
          </li> */}
        </ul>
      </div>

    </div>
  );
};

export default ProductCol;