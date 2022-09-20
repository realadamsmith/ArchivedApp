import React, {useEffect}from 'react';
import ProductResults from './../../components/ItemResults';
// import { useStateValue } from './../../Redux/StateProvider';



const SearchResultsPg = ({ }) => {
  useEffect(() => {
  window.scrollTo(0, 0)
}, [])

  return (
    <div>
      <ProductResults />
    </div>
  );
};

export default SearchResultsPg;