import React , {useEffect}from 'react';
import Checkout from './../../components/Checkout';

const Cart = ({}) => {
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])
  return (
    <div>
      <Checkout />
    </div>
  );
}

export default Cart;