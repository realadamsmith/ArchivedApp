import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux';
import { firestore } from './../../Firebase/utils';

const mapState = state => ({
  product: state.productsData.product
});

// if (term) = !undefined || term === ItemPageRef {
// Array.isArray

const SearchResults = (term) => {
const [data2, setData] = useState(null);
const ItemPageRef = firestore.collection('products').orderBy('productName').limit(20);
const { product } = useSelector(mapState);

 // YOU CAN ORDER THIS BY REVIEWS, OR PRICE. WE CAN CREATE A HELPER FUNCTION TO 
  useEffect(() => {
  const fetchData = async () => {
  fetch(`ItemPageRef${term})`
  )
  
  
  .then(response => response.json())
  .then(result => {
    setData(result)
  })
}
fetchData();
  }, [term] )
  return {data2}
};

export default SearchResults
