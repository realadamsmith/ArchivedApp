import React from 'react';
import ShipLabel from '../ShipLabel';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { publishableKey } from './../../stripe/config';

const stripePromise = loadStripe(publishableKey);

const ShipLabelWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <ShipLabel />
    </Elements>
  );
}

export default ShipLabelWrapper;