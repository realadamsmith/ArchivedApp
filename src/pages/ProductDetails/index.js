import React from "react";
import ProductCard from "./../../components/ProductCard";
import { useHistory } from "react-router-dom";
import Buttons from "./../../components/Forms/Button2";
import "./styles.scss";

const ProductDetails = ({}) => {
  const history = useHistory();

  return (
    <div>
      <ProductCard />

    </div>
  );
};

export default ProductDetails;
