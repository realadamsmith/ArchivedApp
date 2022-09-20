import FrontPageBanners1 from "./../../Assets/FrontPageBanners1.png";
import three from "./../../Assets/3Final.svg";
import four from "./../../Assets/4Final.svg";
import five from "./../../Assets/5Final.svg";
import Mthree from "./../../Assets/Mthree.png";
import six from "./../../Assets/six.png";
import { useHistory } from "react-router-dom";
import SwiperCore, {
  Pagination,
  Navigation,
  Autoplay,
  EffectFade,
} from "swiper/core";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/effect-fade/effect-fade.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import MediaQuery from "react-responsive";

SwiperCore.use([Pagination, Navigation, Autoplay, EffectFade]);

const MainSwiper = () => {
  const history = useHistory();

  return (
    <div>
      <MediaQuery minWidth={400}>
      {(matches) => {
          return matches ? (
        <Swiper
          effect={"fade"}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          // navigation={true}
          loop="true"
          className="swiper-container1"
        >
          <SwiperSlide
            className="swiper-slide1"
            onClick={() => history.push("/SearchResults")}
          >
            <img className="ImageLimitSize" src={six}></img>
          </SwiperSlide>
          <SwiperSlide
            className="swiper-slide1"
            onClick={() => history.push("/ReviewFeed")}
          >
            <img className="ImageLimitSize" src={three}></img>
          </SwiperSlide>
          <SwiperSlide
            className="swiper-slide1"
            onClick={() => history.push("/SearchResults")}
          >
            <img className="ImageLimitSize" src={five}></img>
          </SwiperSlide>
          <SwiperSlide
            className="swiper-slide1"
            onClick={() => history.push("/Account")}
          >
            <img className="ImageLimitSize" src={four}></img>
          </SwiperSlide>
          <SwiperSlide className="swiper-slide1">
            <img
              className="ImageLimitSize"
              src={FrontPageBanners1}
              onClick={() => history.push("/AnnouncementPage")}
            ></img>
          </SwiperSlide>
          {/* <SwiperSlide className="swiper-slide1">
            <img src="https://img.ltwebstatic.com/images3_ach/2021/08/23/1629690237992358084e95fb10032f2822cd95344c.webp"></img>
        </SwiperSlide> */}
          {/* <SwiperSlide className="swiper-slide1">
            <img src="https://static.coupangcdn.com/ya/cmg_paperboy/image/1623990698068/0621_PC_C1_%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC.png"></img>
        </SwiperSlide> */}
        </Swiper>
      ) : (
        <Swiper
        effect={"fade"}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        // navigation={true}
        loop="true"
        className="swiper-container1"
      >
        <SwiperSlide
          className="swiper-slide1"
          onClick={() => history.push("/ReviewFeed")}
        >
          <img className="ImageLimitSize" src={three}></img>
        </SwiperSlide>
        <SwiperSlide
          className="swiper-slide1"
          onClick={() => history.push("/SearchResults")}
        >
          <img className="ImageLimitSize" src={five}></img>
        </SwiperSlide>
        <SwiperSlide
          className="swiper-slide1"
          onClick={() => history.push("/Account")}
        >
          <img className="ImageLimitSize" src={four}></img>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide1">
          <img
            className="ImageLimitSize"
            src={FrontPageBanners1}
            onClick={() => history.push("/AnnouncementPage")}
          ></img>
        </SwiperSlide>
        {/* <SwiperSlide className="swiper-slide1">
          <img src="https://img.ltwebstatic.com/images3_ach/2021/08/23/1629690237992358084e95fb10032f2822cd95344c.webp"></img>
      </SwiperSlide> */}
        {/* <SwiperSlide className="swiper-slide1">
          <img src="https://static.coupangcdn.com/ya/cmg_paperboy/image/1623990698068/0621_PC_C1_%E1%84%89%E1%85%AE%E1%84%8C%E1%85%A5%E1%86%BC.png"></img>
      </SwiperSlide> */}
        </Swiper>

       );
      }}
      </MediaQuery>
    </div>
  );
};
export default MainSwiper;
