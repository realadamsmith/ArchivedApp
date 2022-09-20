import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsStart } from "./../../Redux/Items/items.actions";
import Product from "./Items";
import "./styles.scss";
import { useHistory, useParams } from "react-router-dom";
import FormSelect from "./../Forms/FormSelect";
import LoadMore from "./../LoadMore";

// CALLS ITEMS/INDEX.JS TO BRING TO SEARCH PAGE

const mapState = ({ productsData }) => ({
  products: productsData.products,
});

// WOULD BE AMAZING TO SHOW A VIDEO OF A PRODUCT LIKE AMAZON OF THE FIRST ITEM RESULTING FROM THE SEARCH TERM

const ProductResults = () => {
  const dispatch = useDispatch();
  const { products } = useSelector(mapState); // ALSO USED ON ADMIN PAGE
  const history = useHistory();
  const { filterType, filterType2, input } = useParams(); // FILTERTYPE REFERRING TO ITEMS.HELPERS FUNCTION

  const { data, queryDoc, isLastPage, productName } = products;
//   const [{ term }, dispatchSearch] = useStateValue(); // WE CAN THEN PASS THE TERM (INPUT) INTO
  // USEEFFECT TO BRING PAGE RESULTS BY QUERY
  // TERM IS COMING FROM HEADER.JS, INTO HERE, THEN BEING PASSED TO

  useEffect(() => {
    console.log(input)
    dispatch(fetchProductsStart({ filterType, input }));
  }, [filterType, input]);

  // useEffect(() => {
  //   dispatch(
  //     fetchProductsStart({ filterType2 })
  //   )
  // }, [filterType2]);

  const handleFilter = (e) => {
    const nextFilter = e.target.value; //  I MUST MAKE THIS = TO
    history.push(`/SearchResults/${nextFilter}`);
  };
  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <FormSelect />
        <p>No search results, or try a different word/query!</p>
      </div>
    );
  }
  // const handleFilter2 = (e) => {
  //   sort =
  //   const nextFilter = sort  //  I MUST MAKE THIS = TO
  //     history.push(`/search/${nextFilter}`);
  //   };
  //     if (!Array.isArray(data)) return null;
  //   if (data.length < 1) {
  //     return (
  //       <div className="products">
  //         <p>
  //           No search results.
  //         </p>
  //       </div>
  //     );
  //   }
  const configFilters = {
    defaultValue: filterType,
    options: [
      {
        name: "Show All",
        value: "",
      },
      {
        name: "Clothing, Shoes, Jewelry & Watches",
        value: "Clothing, Shoes, Jewelry & Watches",
      },
      {
        name: "Electronics",
        value: "Electronics",
      },
      {
        name: "Computers",
        value: "Computers",
      },
      {
        name: "Smart home",
        value: "Smart Home",
      },
      {
        name: "Home, Garden & Tools",
        value: "Home, Garden & Tools",
      },
      {
        name: "Beauty & Health",
        value: "Beauty & Health",
      },
      {
        name: "Accessories",
        value: "Accessories",
      },
    //   {
    //     name: "Handmade",
    //     value: "Handmade",
    //   },
    //   {
    //     name: "Sports",
    //     value: "Sports",
    //   },
    //   {
    //     name: "Outdoors",
    //     value: "Outdoors",
    //   },
    //   {
    //     name: "Automotive & Industrial",
    //     value: "Automotive & Industrial",
    //   },
    ],
    handleChange: handleFilter,
  };
  // const configFilters2 = {
  //   defaultValue: filterType2,
  //   options: [{
  //     name: 'Sort Low to High',
  //     value: ''
  //   }, {
  //     name: 'Clothing, Shoes, Jewelry & Watches',
  //     value: 'Clothing, Shoes, Jewelry & Watches'
  //   }, {
  //     name: 'Automotive & Industrial',
  //     value: 'Automotive & Industrial'
  //   } ],
  //   handleChange: handleFilter2
  // };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        filterType,
        startAfterDoc: queryDoc,
        persistProducts: data,
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  // const {data2} = SearchResults(term);
  // console.log(data2)

  // EVERYTHING ABOVE IS FOR THE FILTER, WE RENDER PRODUCTS AND THE
  // DESTURCTURED CONTENT BELOW IN THE RETURN

  return (
    <div className="itemresults">
      <div className="leftfilters">
        <h1>Browse Products</h1>
        <FormSelect {...configFilters} />
      </div>
      <div className="products">
        {/* <FormSelect {...configFilters2} /> */}
        <div className="productResults">
          {data.map((product, pos) => {
            // const pageSize = 10;
            // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
            // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,

            // if (str.includes(term))
            //   try {
            //   } catch (error) {
            //   }
            const { productThumbnail, productName, productPrice } = product;
            if (
              !productThumbnail ||
              !productName ||
              typeof productPrice === "undefined"
            )
              return null;

            const configProduct = {
              ...product,
            };

            return (
              // SOMEHOW RETURN MAYBE A NEW INDEX OF ITEMS AFTER TERM IS == CHECKED
              <Product key={pos} {...configProduct} />
            );
          })}
        </div>

        {!isLastPage && <LoadMore {...configLoadMore} />}
      </div>
    </div>
  );
};

export default ProductResults;
