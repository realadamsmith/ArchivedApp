import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Product from "./../ItemResults/Items";
import ReactPlayer from "react-player";

import "./CSstyles.scss";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";

SwiperCore.use([Pagination, Navigation, Autoplay, EffectFade]);

const mapState = ({ productsData }) => ({
  products: productsData.products,
});
const CategorySliders = () => {
  const history = useHistory();

  const { products } = useSelector(mapState); // ALSO USED ON ADMIN PAGE
  const { data, queryDoc, isLastPage, productName } = products;

  return (
    <div>
      <div className="DesktopCategories">
        <div className="Holder1234Title">
          <h3>WATCH SHORT REVIEWS</h3>
        </div>

        <div className="Category_Holder1234">
          <div className="categoryIntroBest">
            <div className="Slider_For_Category_Images">
              <Swiper
                effect={"fade"}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                // navigation={true}
                loop="true"
                className="Swiper-container2"
              >
                <SwiperSlide className="Swiper-slide2">
                  <img src="//thumbnail7.coupangcdn.com/thumbnails/remote/x/image/bannerunit/bannerunit_71fbc21b-ee5e-40f2-b1e6-ea921633273e.jpg"></img>
                </SwiperSlide>
                <SwiperSlide className="Swiper-slide2">
                  <img src="http://thumbnail10.coupangcdn.com/thumbnails/remote/x/image/bannerunit/bannerunit_66295181-0d94-43d2-b2b0-7e6366bb6054.png"></img>
                </SwiperSlide>
                <SwiperSlide className="Swiper-slide2">
                  <img src="//thumbnail7.coupangcdn.com/thumbnails/remote/x/image/bannerunit/bannerunit_e19cd029-5177-4cd5-8c2d-dc6a316d8d94.jpg"></img>
                </SwiperSlide>
                <SwiperSlide className="Swiper-slide2">
                  <img src="http://thumbnail7.coupangcdn.com/thumbnails/remote/x/image/bannerunit/bannerunit_98006927-8017-4f19-8c87-3adafaf1539a.jpg"></img>
                </SwiperSlide>
              </Swiper>
            </div>
            <h3 className="CSname">
              Clothing Trends
              <div className="hotitems">
                <strong>Trending</strong>

                <span
                  onClick={() => history.push("/product/lIvag6XdPUG6MNEIYCEr")}
                >
                  Patagonia
                </span>
                <span
                  onClick={() => history.push("/product/iHetuvbmUmxpA9qEWC5h")}
                >
                  Gildan
                </span>
                <span
                  onClick={() => history.push("/product/5ASP4ZQo9B6eGgW2Rzdl")}
                >
                  Columbia
                </span>
                <span
                  onClick={() => history.push("/product/hi3uda3f0Jn5YAdPs0iC")}
                >
                  Starlink Shirts
                </span>
              </div>
            </h3>

            <div className="CatSliderPromoItems">
              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                navigation={true}
                loop="true"
                className="SwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(50, 54).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
                      if (
                        !productThumbnail ||
                        !productName ||
                        typeof productPrice === "undefined"
                      )
                        return null;

                      const configProduct = {
                        ...product,
                      };

                      return <Product key={pos} {...configProduct} />;
                    })}
                  </div>
                </SwiperSlide>
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(4, 8).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>

              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                navigation={true}
                loop="true"
                className="SwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(16, 20).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(8, 12).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>
            </div>
          </div>

          <div className="Category_Intro_Best_Right">
            <div className="CatSliderPromoItems">
              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                navigation={true}
                loop="true"
                className="SwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(8, 12).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(20, 24).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>

              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                navigation={true}
                loop="true"
                className="SwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(12, 16).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(24, 28).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>
            </div>
            <h3 className="name_Right">
              Just Vibes
              <div className="hotitems_Right">
                <strong>Trending</strong>
                <span
                  onClick={() => history.push("/product/xgG1f1i2Da3hrobaDXhj")}
                >
                  TOPTRO Projector
                </span>
                <span
                  onClick={() => history.push("/product/6xlNCoscpFwPDdUoXUIA")}
                >
                  Cloud LED Lights
                </span>
                <span
                  onClick={() => history.push("/product/WKmrjAvyROltVodCtCXv")}
                >
                  Tesla Logo Caps
                </span>
                <span
                  onClick={() => history.push("/product/vfK9VV7ipq6sJmiaV4ZI")}
                >
                  Infinity Mirror
                </span>
              </div>
            </h3>

            <div className="Slider_For_Category_Images">
              <ReactPlayer
                playing={false}
                url="https://v-cg.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/fluxprdx_marsedition_newjz3.mp4"
                width="100%"
                height="100%"
                controls
                muted
                loop
                className="Swiper-container2"

                // onClick={() => history.push(`/ReviewFeed/${productID}`)}
              />
              {/* <Swiper
              effect={"fade"}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              // navigation={true}
              loop="true"
              className="Swiper-container2"
            >
              <SwiperSlide className="Swiper-slide2">
                <img src="https://static.coupangcdn.com/ha/cmg_paperboy/image/1631695121349/C3_PC.jpg"></img>
              </SwiperSlide>
              <SwiperSlide className="Swiper-slide2">
                <img src="https://static.coupangcdn.com/xa/cmg_paperboy/image/1632447339325/C3_PC-2021-09-24T103514.516.jpg"></img>
              </SwiperSlide>

            </Swiper> */}
            </div>
          </div>
        </div>
        {/* <div className="Category_Holder1234_2">
        <div className="categoryIntroBest">
          <div className="Slider_For_Category_Images">
            <Swiper
              effect={"fade"}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              // navigation={true}
              loop="true"
              className="Swiper-container2"
            >
              <SwiperSlide className="Swiper-slide2">
                <img src="//thumbnail10.coupangcdn.com/thumbnails/remote/x/image/bannerunit/bannerunit_846d9bb1-2e3a-4e94-95ee-47e7cabdceba.jpg"></img>
              </SwiperSlide>
              <SwiperSlide className="Swiper-slide2">
                <img src="https://static.coupangcdn.com/oa/cmg_paperboy/image/1632715933512/C3_PC%281%29.jpg"></img>
              </SwiperSlide>
              <SwiperSlide className="Swiper-slide2">
                <img src="//thumbnail8.coupangcdn.com/thumbnails/remote/x/image/bannerunit/bannerunit_ede20070-1755-4b2e-b3e8-1dcece75ab5b.jpg"></img>
              </SwiperSlide>
            </Swiper>
          </div>
          <h3 className="CSname">
            Her
            <div className="hotitems">
              <strong>Trending</strong>
              <span>Your Product Here</span>
              <span>Your Product Here</span>
              <span>Your Product Here</span>
              <span>Your Product Here</span>
            </div>
          </h3>
          <div className="CatSliderPromoItems">
            <Swiper
              effect={"fade"}
              pagination={{ clickable: true }}
              navigation={true}
              loop="true"
              className="SwiperItemsInCategories"
              slidesPerView="1"
            >
              <SwiperSlide className="NCBPCatSlider">
                <div className="CatSliderMap">
                  {data.slice(0, 4).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
              <SwiperSlide className="NCBPCatSlider">
                <div className="CatSliderMap">
                  {data.slice(4, 8).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
            </Swiper>

            <Swiper
              effect={"fade"}
              pagination={{ clickable: true }}
              navigation={true}
              loop="true"
              className="SwiperItemsInCategories"
              slidesPerView="1"
            >
              <SwiperSlide className="NCBPCatSlider">
                <div className="CatSliderMap">
                  {data.slice(0, 4).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
              <SwiperSlide className="NCBPCatSlider">
                <div className="CatSliderMap">
                  {data.slice(4, 8).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <div className="Category_Intro_Best_Right">
          <div className="CatSliderPromoItems">
            <Swiper
              effect={"fade"}
              pagination={{ clickable: true }}
              navigation={true}
              loop="true"
              className="SwiperItemsInCategories"
              slidesPerView="1"
            >
              <SwiperSlide className="NCBPCatSlider">
                <div className="CatSliderMap">
                  {data.slice(0, 4).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
              <SwiperSlide className="NCBPCatSlider">
                <div className="CatSliderMap">
                  {data.slice(4, 8).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
            </Swiper>

            <Swiper
              effect={"fade"}
              pagination={{ clickable: true }}
              navigation={true}
              loop="true"
              className="SwiperItemsInCategories"
              slidesPerView="1"
            >
              <SwiperSlide className="NCBPCatSlider">
                <div className="CatSliderMap">
                  {data.slice(0, 4).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
              <SwiperSlide className="NCBPCatSlider">
                <div className="CatSliderMap">
                  {data.slice(4, 8).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
            </Swiper>
          </div>
          <h3 className="name_Right">
            Phone Care
            <div className="hotitems_Right">
              <strong>Trending</strong>
              <span>Your Product Here</span>
              <span>Your Product Here</span>
              <span>Your Product Here</span>
              <span>Your Product Here</span>
            </div>
          </h3>

          <div className="Slider_For_Category_Images">
            <Swiper
              effect={"fade"}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              // navigation={true}
              loop="true"
              className="Swiper-container2"
            >
              <SwiperSlide className="Swiper-slide2">
                <img src="https://static.coupangcdn.com/fa/cmg_paperboy/image/1627026904131/0727_%28%EC%A3%BC%29%EB%9E%98%EC%95%88%ED%85%8D_C3_PC.jpg"></img>
              </SwiperSlide>
              <SwiperSlide className="Swiper-slide2">
                <img src="https://static.coupangcdn.com/ka/cmg_paperboy/image/1627376422578/C3_PC3%283%29.jpg"></img>
              </SwiperSlide>
              <SwiperSlide className="Swiper-slide2">
                <img src="https://static.coupangcdn.com/ma/cmg_paperboy/image/1627028659554/C3_PC-%EB%B3%B5%EC%82%AC%EB%B3%B8.jpg"></img>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div> */}

        <div className="Category_Holder1234_3">
          <div className="categoryIntroBest">
            <div className="Slider_For_Category_Images">
              <Swiper
                effect={"fade"}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                // navigation={true}
                loop="true"
                className="Swiper-container2"
              >
                <SwiperSlide className="MSwiper-slide2">
                  <img src="https://static.coupangcdn.com/qa/cmg_paperboy/image/1632738798980/C3_PC_210729.jpg"></img>
                </SwiperSlide>
                <SwiperSlide className="MSwiper-slide2">
                  <img src="https://static.coupangcdn.com/ua/cmg_paperboy/image/1632739155132/C3_PC-2021-09-27T193901.172.jpg"></img>
                </SwiperSlide>
                <SwiperSlide className="MSwiper-slide2">
                  <img src="https://static.coupangcdn.com/ha/cmg_paperboy/image/1632717009567/C3_PC4%2813%29.jpg"></img>
                </SwiperSlide>
              </Swiper>
            </div>
            <h3 className="CSname">
              Home Tech
              <div className="hotitems">
                <strong>Trending</strong>
                <span>LED Teeth Whitening</span>
                <span>Revlon Blowdryer</span>
                <span>Maybelline Eyeliner</span>
                <span>Your Product Here</span>
              </div>
            </h3>
            <div className="CatSliderPromoItems">
              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                navigation={true}
                loop="true"
                className="SwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(28, 32).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(14, 18).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>

              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                navigation={true}
                loop="true"
                className="SwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(36, 40).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(16, 20).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="Category_Intro_Best_Right">
            <div className="CatSliderPromoItems">
              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                navigation={true}
                loop="true"
                className="SwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(32, 36).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(27, 31).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>

              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                navigation={true}
                loop="true"
                className="SwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(40, 44).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="NCBPCatSlider">
                  <div className="CatSliderMap">
                    {data.slice(4, 8).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>
            </div>
            <h3 className="name_Right">
              Desk Setup
              <div className="hotitems_Right">
                <strong>Trending</strong>
                <span>Your Product</span>
                <span>Your Product</span>
                <span>Your Product</span>
                <span>Your Product</span>
              </div>
            </h3>

            <div className="Slider_For_Category_Images">
              <Swiper
                effect={"fade"}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                // navigation={true}
                loop="true"
                className="Swiper-container2"
              >
                <SwiperSlide className="Swiper-slide2">
                  <img src="https://static.coupangcdn.com/pa/cmg_paperboy/image/1632709348571/C3_PC-2021-09-27T112057.869.jpg"></img>
                </SwiperSlide>
                <SwiperSlide className="Swiper-slide2">
                  <img src="https://static.coupangcdn.com/ka/cmg_paperboy/image/1627376422578/C3_PC3%283%29.jpg"></img>
                </SwiperSlide>
                <SwiperSlide className="Swiper-slide2">
                  <img src="https://static.coupangcdn.com/fa/cmg_paperboy/image/1627026904131/0727_%28%EC%A3%BC%29%EB%9E%98%EC%95%88%ED%85%8D_C3_PC.jpg"></img>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>

      <div className="MobileCategories">
        <div className="Holder1234Title">
          <h3>WATCH SHORT REVIEWS</h3>
        </div>

        <div className="MCategory_Holder1234">
          <div className="MSlider_For_Category_Images">
            <Swiper
              effect={"fade"}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              // navigation={true}
              loop="true"
              className="MSwiper-container2"
            >
              <SwiperSlide className="MSwiper-slide2">
                <img src="https://firebasestorage.googleapis.com/v0/b/mallshop-5fa49.appspot.com/o/prodimages%2FAmznColumbiaVest1.jpg?alt=media&token=2cc488bd-040e-4127-8fe4-247c2999b5d3"></img>
              </SwiperSlide>
              <SwiperSlide className="MSwiper-slide2">
                <img src="https://firebasestorage.googleapis.com/v0/b/mallshop-5fa49.appspot.com/o/prodimages%2FTwitterElonHoodie1.jpg?alt=media&token=48d13f2e-ac84-45fc-9cec-38a137cb5975"></img>
              </SwiperSlide>
              <SwiperSlide className="MSwiper-slide2">
                <img src="https://firebasestorage.googleapis.com/v0/b/mallshop-5fa49.appspot.com/o/prodimages%2FNasaLongSleeve.jpg?alt=media&token=064e7cc6-e381-40b4-b73e-c1b299c9bcb3"></img>
              </SwiperSlide>

            </Swiper>
          </div>

          <h3 className="MCSname">Clothing</h3>
          <div className="Mhotitems">
            <strong>Trending</strong>

            <span onClick={() => history.push("/product/lIvag6XdPUG6MNEIYCEr")}>
              Patagonia
            </span>
            <span onClick={() => history.push("/product/iHetuvbmUmxpA9qEWC5h")}>
              Gildan
            </span>
            <span onClick={() => history.push("/product/5ASP4ZQo9B6eGgW2Rzdl")}>
              Columbia
            </span>
            <span onClick={() => history.push("/product/hi3uda3f0Jn5YAdPs0iC")}>
              Starlink Shirts
            </span>
          </div>

          <div className="MCatSliderPromoItems">
            <Swiper
              effect={"fade"}
              pagination={{ clickable: true }}
              // navigation={true}
              loop="true"
              className="MSwiperItemsInCategories"
              slidesPerView="1"
            >
              <SwiperSlide className="MNCBPCatSlider">
                <div className="MCatSliderMap">
                  {data.slice(50, 54).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
              <SwiperSlide className="MNCBPCatSlider">
                <div className="MCatSliderMap">
                  {data.slice(4, 8).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
            </Swiper>

            <Swiper
              effect={"fade"}
              pagination={{ clickable: true }}
              // navigation={true}
              loop="true"
              className="MSwiperItemsInCategories"
              slidesPerView="1"
            >
              <SwiperSlide className="MNCBPCatSlider">
                <div className="MCatSliderMap">
                {data.slice(16, 20).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
              <SwiperSlide className="MNCBPCatSlider">
                <div className="MCatSliderMap">
                  {data.slice(0, 4).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
            </Swiper>
          </div>

          <div className="MCategory_Holder1234">
            <div className="MSlider_For_Category_Images">
               <ReactPlayer
                playing={false}
                url="https://v-cg.etsystatic.com/video/upload/ac_none,du_15,q_auto:good/fluxprdx_marsedition_newjz3.mp4"
                width="100%"
                height="100%"
                controls
                muted
                loop
                className="Swiper-container2"
                onClick={() => history.push("/product/AEasfDDUO9f66k4ZVc4N")}
              />
            </div>
            <h3 className="MCSname">Just Vibes</h3>
            <div className="Mhotitems">
              <strong>Trending</strong>
              <span
                onClick={() => history.push("/product/xgG1f1i2Da3hrobaDXhj")}
              >
                TOPTRO Projector
              </span>
              <span
                onClick={() => history.push("/product/6xlNCoscpFwPDdUoXUIA")}
              >
                Cloud LED Lights
              </span>
              <span
                onClick={() => history.push("/product/WKmrjAvyROltVodCtCXv")}
              >
                Tesla Logo Caps
              </span>
              <span
                onClick={() => history.push("/product/vfK9VV7ipq6sJmiaV4ZI")}
              >
                Infinity Mirror
              </span>
            </div>
            <div className="MCatSliderPromoItems">
              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                // navigation={true}
                loop="true"
                className="MSwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="MNCBPCatSlider">
                  <div className="MCatSliderMap">
                  {data.slice(12, 16).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="MNCBPCatSlider">
                  <div className="MCatSliderMap">
                    {data.slice(4, 8).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>

              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                // navigation={true}
                loop="true"
                className="MSwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="MNCBPCatSlider">
                  <div className="MCatSliderMap">
                  {data.slice(24, 28).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="MNCBPCatSlider">
                  <div className="MCatSliderMap">
                    {data.slice(4, 8).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>



        <div className="MCategory_Holder1234_3">
          <div className="MSlider_For_Category_Images">
            <Swiper
              effect={"fade"}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              // navigation={true}
              loop="true"
              className="MSwiper-container2"
            >
              <SwiperSlide className="MSwiper-slide2">
                <img src="https://static.coupangcdn.com/qa/cmg_paperboy/image/1632738798980/C3_PC_210729.jpg"></img>
              </SwiperSlide>
              <SwiperSlide className="MSwiper-slide2">
                <img src="https://static.coupangcdn.com/ua/cmg_paperboy/image/1632739155132/C3_PC-2021-09-27T193901.172.jpg"></img>
              </SwiperSlide>
              <SwiperSlide className="MSwiper-slide2">
                <img src="https://static.coupangcdn.com/ha/cmg_paperboy/image/1632717009567/C3_PC4%2813%29.jpg"></img>
              </SwiperSlide>
            </Swiper>
          </div>
          <h3 className="MCSname">Home Tech</h3>
          <div className="Mhotitems">
            <strong>Trending</strong>
            <span>LED Teeth Whitening</span>
            <span>Jawzersize</span>
            <span>Maybelline Eyeliner</span>
            <span>Your Product</span>
          </div>
          <div className="MCatSliderPromoItems">
            <Swiper
              effect={"fade"}
              pagination={{ clickable: true }}
              // navigation={true}
              loop="true"
              className="MSwiperItemsInCategories"
              slidesPerView="1"
            >
              <SwiperSlide className="MNCBPCatSlider">
                <div className="MCatSliderMap">
                {data.slice(28, 32).map((product, pos) => {
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
              <SwiperSlide className="MNCBPCatSlider">
                <div className="MCatSliderMap">
                {data.slice(14, 18).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
            </Swiper>

            <Swiper
              effect={"fade"}
              pagination={{ clickable: true }}
              // navigation={true}
              loop="true"
              className="MSwiperItemsInCategories"
              slidesPerView="1"
            >
              <SwiperSlide className="MNCBPCatSlider">
                <div className="MCatSliderMap">
                {data.slice(36, 40).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
              <SwiperSlide className="MNCBPCatSlider">
                <div className="MCatSliderMap">
                {data.slice(16, 20).map((product, pos) => {
                    // const pageSize = 10;
                    // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                    // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                    const { productThumbnail, productName, productPrice } =
                      product;
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
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="MCategory_Holder1234">
            <div className="MSlider_For_Category_Images">
              <Swiper
                effect={"fade"}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={{ clickable: true }}
                // navigation={true}
                loop="true"
                className="MSwiper-container2"
              >
                <SwiperSlide className="MSwiper-slide2">
                  <img src="https://static.coupangcdn.com/pa/cmg_paperboy/image/1632709348571/C3_PC-2021-09-27T112057.869.jpg"></img>
                </SwiperSlide>
                <SwiperSlide className="MSwiper-slide2">
                  <img src="https://static.coupangcdn.com/ka/cmg_paperboy/image/1627376422578/C3_PC3%283%29.jpg"></img>
                </SwiperSlide>
                <SwiperSlide className="MSwiper-slide2">
                  <img src="https://static.coupangcdn.com/fa/cmg_paperboy/image/1627026904131/0727_%28%EC%A3%BC%29%EB%9E%98%EC%95%88%ED%85%8D_C3_PC.jpg"></img>
                </SwiperSlide>
              </Swiper>
            </div>
            <h3 className="MCSname">Desk Setup</h3>
            <div className="Mhotitems">
              <strong>Trending</strong>
              <span>Your Product</span>
              <span>Your Product</span>
              <span>Your Product</span>
              <span>Your Product</span>
            </div>

            <div className="MCatSliderPromoItems">
              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                // navigation={true}
                loop="true"
                className="MSwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="MNCBPCatSlider">
                  <div className="MCatSliderMap">
                  {data.slice(32, 36).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="MNCBPCatSlider">
                  <div className="MCatSliderMap">
                    {data.slice(4, 8).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>

              <Swiper
                effect={"fade"}
                pagination={{ clickable: true }}
                // navigation={true}
                loop="true"
                className="MSwiperItemsInCategories"
                slidesPerView="1"
              >
                <SwiperSlide className="MNCBPCatSlider">
                  <div className="MCatSliderMap">
                  {data.slice(27, 31).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
                <SwiperSlide className="MNCBPCatSlider">
                  <div className="MCatSliderMap">
                    {data.slice(4, 8).map((product, pos) => {
                      // const pageSize = 10;
                      // let ItemPageRef = firestore.collection('products').orderBy('createdDate').limit(pageSize);
                      // if (term) ItemPageRef = ItemPageRef.where('productCategory', '==', term);  // MIGHT NEED A COUNTER TO BE >1,
                      const { productThumbnail, productName, productPrice } =
                        product;
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
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySliders;
