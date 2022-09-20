import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import { firestore } from "./../../Firebase/utils";

import {
  fetchProductStart,
  setProduct,
  referralProduct,
} from "./../../Redux/Items/items.actions";
import Button from "./../Forms/Button";
import Buttons2 from "./../Forms/Button2";
import { BsCameraReels } from "react-icons/bs";
import "./styles.scss";
import { addProduct } from "./../../Redux/Cart/cart.actions";
import { useIonToast } from "@ionic/react";
// import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css'

//    ███████╗░█████╗░██████╗░  ██████╗░██████╗░░█████╗░██████╗░██╗░░░██╗░█████╗░████████╗
//    ██╔════╝██╔══██╗██╔══██╗  ██╔══██╗██╔══██╗██╔══██╗██╔══██╗██║░░░██║██╔══██╗╚══██╔══╝
//    █████╗░░██║░░██║██████╔╝  ██████╔╝██████╔╝██║░░██║██║░░██║██║░░░██║██║░░╚═╝░░░██║░░░
//    ██╔══╝░░██║░░██║██╔══██╗  ██╔═══╝░██╔══██╗██║░░██║██║░░██║██║░░░██║██║░░██╗░░░██║░░░
//    ██║░░░░░╚█████╔╝██║░░██║  ██║░░░░░██║░░██║╚█████╔╝██████╔╝╚██████╔╝╚█████╔╝░░░██║░░░
//    ╚═╝░░░░░░╚════╝░╚═╝░░╚═╝  ╚═╝░░░░░╚═╝░░╚═╝░╚════╝░╚═════╝░░╚═════╝░░╚════╝░░░░╚═╝░░░
//
//    ██████╗░███████╗████████╗░█████╗░██╗██╗░░░░░░██████╗  ██████╗░░█████╗░░██████╗░███████╗
//    ██╔══██╗██╔════╝╚══██╔══╝██╔══██╗██║██║░░░░░██╔════╝  ██╔══██╗██╔══██╗██╔════╝░██╔════╝
//    ██║░░██║█████╗░░░░░██║░░░███████║██║██║░░░░░╚█████╗░  ██████╔╝███████║██║░░██╗░█████╗░░
//    ██║░░██║██╔══╝░░░░░██║░░░██╔══██║██║██║░░░░░░╚═══██╗  ██╔═══╝░██╔══██║██║░░╚██╗██╔══╝░░
//    ██████╔╝███████╗░░░██║░░░██║░░██║██║███████╗██████╔╝  ██║░░░░░██║░░██║╚██████╔╝███████╗
//    ╚═════╝░╚══════╝░░░╚═╝░░░╚═╝░░╚═╝╚═╝╚══════╝╚═════╝░  ╚═╝░░░░░╚═╝░░╚═╝░╚═════╝░╚══════╝

const mapState = (state) => ({
  product: state.productsData.product,
});

const ProductCard = ({}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { productID } = useParams();
  const { product } = useSelector(mapState);
  const [reviews, setReviews] = useState([]);
  const [colorPurchase, setColorPurchase] = useState("");
  const [sizePurchase, setSizePurchase] = useState("");
  const [thumbSlider, setThumbSlider] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [man, setMan] = useState([]);
  const [selectorOutline, setSelectorOutline] = useState(
    "FocusHoverVariations0"
  );

  const [present, dismiss] = useIonToast();
  const [rewardfulID, setRewardfulID] = useState("");

  const {
    productThumbnail,
    productName,
    productPrice,
    productDesc,
    colorArray,
    sizeArray,
  } = product;
  useEffect(() => {
    if (productThumbnail != undefined) {
      setThumbSlider(productThumbnail);
    }
  }, [productThumbnail]);
  useEffect(() => {
    window.rewardful("ready", () => {
      if (window.Rewardful.referral) {
        dispatch(referralProduct(window.Rewardful.referral));
      }
    });
  }, []);

  useEffect(() => {
    dispatch(fetchProductStart(productID));

    return () => {
      dispatch(setProduct({}));
    };
  }, []);

  useEffect(async () => {
    const productscollection = firestore.collectionGroup(
      "productMainESGFeedReviews"
    );
    const snapshot = await productscollection
      .where("productID", "==", productID)
      .orderBy("createdDate")
      .get();
    if (snapshot.empty) {
    }
    setReviews(
      snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          documentID: doc.id,
        };
      })
    );
  }, []);

  const handleAddToCart = (product) => {
    const cl = product.colorArray.length;
    const sl = product.sizeArray.length;
    if (cl > 0) {
      if (!product || !colorPurchase) {
        present("Please choose a Color", 4000);
        return false;
      } else {
        if (sl > 0) {
          if (!sizePurchase) {
            present("Please choose a Size", 4000);
            return false;
          } else {
            //This checks for if they've chosen a size
            const configCartItem = {
              color: colorPurchase,
              size: sizePurchase,
              ...product,
            };
            dispatch(addProduct(configCartItem));
            history.push("/cart");
          }
        } else {
          // They've already chosen a color, but there's no size choices, so go ahead.
          const configCartItem = {
            color: colorPurchase,
            size: sizePurchase,
            ...product,
          };
          dispatch(addProduct(configCartItem));
          history.push("/cart");
        }
      }
    } else {
      if (sl > 0) {
        // After we've checked if there's colors, now we check for sizes in listing.
        if (!sizePurchase) {
          // If no size is chosem, we block the Cart Add
          present("Please choose a Size", 4000);
          return false;
        } else {
          // There's no colors, and If a size was chosen, go ahead and let them add to cart
          const configCartItem = {
            color: colorPurchase,
            size: sizePurchase,
            ...product,
          };
          dispatch(addProduct(configCartItem));
          history.push("/cart");
        }
      } else {
        // If there are no sizes after checking colors, then add to cart
        const configCartItem = {
          color: colorPurchase,
          size: sizePurchase,
          ...product,
        };
        dispatch(addProduct(configCartItem));
        history.push("/cart");
      }
    }
    // const configCartItem = {
    //   color: colorPurchase,
    //   size: sizePurchase,
    //   ...product,
    // };
    // dispatch(addProduct(configCartItem));
    // history.push("/cart");

    // if (!product || !sizePurchase || !colorPurchase) {

    // } else {

    // }
  };

  const configAddToCartBtn = {
    type: "button",
  };

  const colorFunction = (color) => {
    // setSelectorOutline(color);
    setColorPurchase(color);
  };
  const sizeFunction = (size) => {
    setSizePurchase(size);
  };

  // function hover(element) {
  //   element.setAttribute(productThumbnail[0], 'http://dummyimage.com/100x100/eb00eb/fff');
  // }
  // function unhover(element) {
  //   element.setAttribute(productThumbnail[0], 'http://dummyimage.com/100x100/000/fff');
  // }

  const changeImage = (image) => {
    // consol.log(e.target.src)
    setMainImage([image]);
  };

  return (
    <>
      <div className="productCard">
        <div className="LeftSideImages">
          {/* <InnerImageZoom src={productThumbnail}
            className="laurenashpoleFile" /> */}
          {mainImage ? (
            <img className="BigPicture" src={mainImage} />
          ) : (
            <img className="BigPicture" src={productThumbnail} />
          )}
          {/* <img src={productThumbnail}/> */}

          <div className="SliderOfProdImages">
            {thumbSlider.length > 10 && typeof thumbSlider == "string" ? (
              <></>
            ) : (
              thumbSlider.map((image, index) => {
                return (
                  <div
                    className="eachSlideImage"
                    // onMouseOver={(e) => {hover(e)}}
                    // onMouseOut={(e) => {unhover(e)}}
                    key={index}
                  >
                    <img src={image} onClick={() => changeImage(image)} />
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="productDetails">
          <ul>
            <li>
              <h2>{productName}</h2>
            </li>
            <li>
              <div className="reviews">New Listing </div>
              {/* <div className="reviews">Guaranteed Best Price</div> */}
              {/* Show a loading circle with Guaranteed Best Price to grab attention */}
              {/* Include tooltip button to share info on how we got to that conclusion */}
              {/* Hide Stars, but instead rank by hidden reviews maybe */}

              <span className="Pageprice">${productPrice}</span>
            </li>
            <li>
              {colorArray ? (
                <div className="ColorsColumn">
                  {colorArray.map((color, pos) => {
                    return (
                      <div
                        className={`FocusHoverVariations0 ${
                          colorPurchase == color ? "FocusHoverVariations2" : ""
                        }`}
                        onClick={() => colorFunction(color)}
                        key={pos}
                        id={pos}
                      >
                        {color}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </li>
            <li>
              {sizeArray ? (
                <div className="ColorsColumn">
                  {sizeArray.map((size, pos) => {
                    return (
                      <div
                        className={`FocusHoverVariations0 ${
                          sizePurchase == size ? "FocusHoverVariations2" : ""
                        }`}
                        onClick={() => sizeFunction(size)}
                        key={pos}
                        value={size}
                      >
                        {size}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <></>
              )}
            </li>
            <li>
              <div className="addToCart">
                <Button
                  {...configAddToCartBtn}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </Button>
              </div>
            </li>
            <div className="ClipWrapper">
              <div className="aligner">
                <div className="reviews2">Top Review Clips</div>
                {/* <BsCameraReels className="ClipImage"></BsCameraReels> */}
              </div>
              <div className="videoReel">
                {reviews.slice(0, 7).map((documentID, pos) => {
                  const { videoUrl } = documentID;
                  const configProduct = {
                    ...documentID,
                  };
                  return (
                    <ReactPlayer
                      playing={false} // Because causes intrusive pop up of video on mobile
                      url={videoUrl}
                      width="25%"
                      height="100%"
                      audio
                      controls
                      loop
                      key={pos}
                      {...configProduct}
                      // onClick={() => history.push(`/ReviewFeed/${productID}`)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="ClipWrapperIncentive">
              <a href="https://apps.apple.com/us/app/lagruni/id1587491962">
                Download the app to get <b>250pts</b> per Review recorded,{" "}
                <b>1000pts</b> per 20 likes and for the mobile experience!
              </a>
            </div>
          </ul>
          {/* // AND THEN CALL IT TO THE PRODUVT PAGE */}
        </div>
      </div>
      {/* <div class="sellerdetails">
                {SellerImage}
                <div class="seller-details__info-wrap">
                    <div class="seller-details__logo-wrap">
                    </div>
                    <div class="seller-details__info">
                        <div class="seller-details__title-wrap">
                        </div>
                    </div>
                </div>
            </div> */}
      <div className="desc">
        <span
          // CAN CHANGE THIS AS YOU PLEASE
          dangerouslySetInnerHTML={{ __html: productDesc }}
        />
        <div className="RegisterSpacer"></div>

        <div className="ClipWrapperIncentive2">
          <span>
            We aim to show you accurate product information. Manufacturers,
            Suppliers and others provide what you see here, and we have not
            verified it. <Link to="/ConditionsOfUse"> See our disclaimer</Link>
          </span>
        </div>
      </div>
      <div className="ReviewBtnMakeSpecial">
        {/* ALSO A FEED OF REVIEWS, ADD SAME BUTTON INSIDE AS WELL. */}
        <Buttons2 onClick={() => history.push(`/ReviewPost/${productID}`)}>
          Record a Review Short!
        </Buttons2>
      </div>
    </>
  );
};

export default ProductCard;
