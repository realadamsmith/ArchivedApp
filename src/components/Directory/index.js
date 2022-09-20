import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./../ItemResults/Items";
import { fetchProductsStart } from "./../../Redux/Items/items.actions";
import { useHistory, } from "react-router-dom";
import MainSwiper from "./../../components/MainSwiper/index.js";

import "./styles.scss";
import { Link } from "react-router-dom";
import FormSelect from "./../Forms/FormSelect";
import CategorySliders from "./../1MainPage/CategorySliders";
import ReactPlayer from "react-player";
import Uniceflogo from "./../../Assets/UNICEFLogo1986.png";

import { useIonToast } from "@ionic/react";


const mapState = ({ productsData }) => ({
  products: productsData.products,
});

// async function () { https://www.youtube.com/watch?v=IATOicvih5A
//     const anything = await Object({})
// }

const Directory = (props) => {
  const dispatch = useDispatch();
  const [present, dismiss] = useIonToast();

  const { products } = useSelector(mapState); // ALSO USED ON ADMIN PAGE
  const { data, queryDoc, isLastPage, productName } = products;
  const history = useHistory();
  //   const { filterType, filterType2 } = useParams(); // FILTERTYPE REFERRING TO ITEMS.HELPERS FUNCTION
  //     setTimeout(function(){
  //      document.getElementById('LoadRandomReviewsSlider').play();
  //  },1000);
  useEffect(() => {
    dispatch(fetchProductsStart());
  }, []);

  const handleFilter = (e) => {
    const nextFilter = e.target.value; //  I MUST MAKE THIS = TO
    history.push(`/SearchResults/${nextFilter}`);
  };
  if (!Array.isArray(data)) return null;
  if (data.length < 1) {
    return (
      <div className="products">
        <FormSelect />
        <p>No search results.</p>
      </div>
    );
  }
  // <div></div> // For rapid debugging purposes

  return (
    <div>
      <div className="MainExploreOtherBarHome">
        <div>
          {/* <Link to="ReviewFeed" className="ChngTXTtoblue"> */}
          Main
          {/* </Link> */}
          <div className="ThinUnderline"></div>
        </div>
        <div>
          <Link to="ReviewFeed" className="ChngTXTtoblue">
            Explore
          </Link>
        </div>
      </div>
      <div className="unicefBanner">
        <div className="CenterUnicef">
          <img className="ImageSizing" src={Uniceflogo} />
          <a href="https://help.unicef.org/gao/ukraine-emergency">
            Donate to support families affected by the war in Ukraine
          </a>
        </div>
      </div>

      <MainSwiper />
      <div className="Under_Slider_Promo">
        <Link to="../AnnouncementPage">
          Lagruni just Opened! Here's our community message!
        </Link>
      </div>
      <div className="mainpage">
        {/* <canvas id="hero-lightpass" /> */}
        <div className="Flex_For_Promo_Bar">
          <div className="Niche_Category_Box_Promo">
            <div className="Title_Niche_Category_Box_Promo">
              See Reviews on Products
            </div>
            <ReactPlayer
              className="ReviewsTokVideos"
              url="https://firebasestorage.googleapis.com/v0/b/mallshop-5fa49.appspot.com/o/prodReviews%2FVUZOUqWQbtM8h8D7oR1W?alt=media&token=acde3007-10f3-4430-afee-303318e45793"
              playing={false} //Because causes intrusive video popup on mobile
              width="100%"
              height="90%"
              controls
              loop
              // onEnded
            />
            <Link to="ReviewFeed" className="ChngTXTtoblue">
              See More
            </Link>
          </div>
          <div className="Niche_Category_Box_Promo">
            <div className="Title_Niche_Category_Box_Promo">
              Watch the product review Clips!
            </div>

            <div className="NCBP1">
              {data.slice(1, 3).map((product, pos) => {
                const configProduct = { ...product, };
                return <Product key={pos} {...configProduct} />;
              })}
            </div>
            <div className="NCBP1">
              {data.slice(3, 5).map((product, pos) => {
                const configProduct = { ...product, };
                return (
                  // SOMEHOW RETURN MAYBE A NEW INDEX OF ITEMS AFTER TERM IS == CHECKED
                  <Product key={pos} {...configProduct} />
                );
              })}
            </div>
          </div>
          <div className="Niche_Category_Box_Promo">
            {/* MAP RANDOM HOME CATEGORY */}
            <div className="Title_Niche_Category_Box_Promo">
              See the product review Clips!
            </div>
            <div className="NCBP1">
              {data.slice(14,16).reverse().map((product, pos) => {
                  const configProduct = { ...product, };
                  return (
                    // SOMEHOW RETURN MAYBE A NEW INDEX OF ITEMS AFTER TERM IS == CHECKED
                    <Product key={pos} {...configProduct} />
                  );
                })}
            </div>
            <div className="NCBP1">
              {data.slice(16,18).reverse().map((product, pos) => {
                  const configProduct = { ...product, };
                  return (
                    // SOMEHOW RETURN MAYBE A NEW INDEX OF ITEMS AFTER TERM IS == CHECKED
                    <Product key={pos} {...configProduct} />
                  );
                })}
            </div>
          </div>
          <div className="Niche_Category_Box_Promo">
            <div className="Title_Niche_Category_Box_Promo">
              View the product review Clips!
            </div>
            <div className="NCBP1">
              {data.slice(7, 9).map((product, pos) => {
                const configProduct = { ...product, };
                return (
                  // SOMEHOW RETURN MAYBE A NEW INDEX OF ITEMS AFTER TERM IS == CHECKED
                  <Product key={pos} {...configProduct} />
                );
              })}
            </div>
            <div className="NCBP1">
              {data.slice(9, 11).map((product, pos) => {
                const configProduct = { ...product, };
                return (
                  // SOMEHOW RETURN MAYBE A NEW INDEX OF ITEMS AFTER TERM IS == CHECKED
                  <Product key={pos} {...configProduct} />
                );
              })}
            </div>
          </div>
        </div>

        <CategorySliders />
        <div className="columnsliderBox">
          Gifts for someone else?
          <div className="columnNongrid">
            {data.slice(40, 50).map((product, pos) => {
              const configProduct = { ...product };
              return (
                // SOMEHOW RETURN MAYBE A NEW INDEX OF ITEMS AFTER TERM IS == CHECKED
                <Product key={pos} {...configProduct} />
              );
            })}
          </div>
        </div>
      </div>
      <div className="mainpage">
        <div className="CLMpromo">
          {/* Where we will be doing Product.map math.random */}
          <div className="columnsliderBox">
            Weekly Featured Items
            <div className="columnNongrid">
              {data.slice(0, 10).map((product, pos) => {
                const configProduct = { ...product, };
                return (
                  // SOMEHOW RETURN MAYBE A NEW INDEX OF ITEMS AFTER TERM IS == CHECKED
                  <Product key={pos} {...configProduct} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Directory;
