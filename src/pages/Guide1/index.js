import "./styles.scss";
import { useHistory } from "react-router-dom";

const Guide = () => {
  const history = useHistory();

  return (
    <div className="itemresults">
      <div className="ListOfLinks">
        <li>
          <a onClick={() => history.push("/SupportHelpPg")}>Support</a>
        </li>
        <li>
          <a onClick={() => history.push("/Advertise")}>Advertise</a>
        </li>
        <li>
            <a onClick={() => history.push("/LagrangeNetwork")}>Lagrange Network</a>
          </li>
        <li>
          <a onClick={() => history.push("/CompanyPage")}>Company News</a>
        </li>
        <li>
          <a onClick={() => history.push("/Affiliate")}>Affiliate</a>
        </li>
        <li>
          <a onClick={() => history.push("/SellerSignup")}>Seller Signup</a>
        </li>
      </div>
      <div className="superAffiliate">
        <div class="help-content">
          {/* <a name="GUID-8966E75F-9B92-4A2B-BFD5-967D57513A40"></a> */}
          <h1>Lagruni Seller Best Practices</h1>
          <div>
            <p class="lead">
              <span>
                One thing that sets us apart from Amazon and Walmart.com, is
                that, you don't need to have a large product catalog to be
                successful.{" "}
              </span>
            </p>
            <p class="lead">
              <span>
                The very nature of product reviews and video content is simple:
                Good videos will get views and sales, and second, if the product
                is good, innovative, and at least on par with similar class
                products it's going to get sold.
              </span>
            </p>
            <p class="lead">
              <span>
                So whether your products are optimized for mass production like{" "}
                <span
                  className="HighlightGuide"
                  onClick={() => history.push("/product/iHetuvbmUmxpA9qEWC5h")}
                >
                  Gildan Boxer Pack
                </span>{" "}
                or unique, has extra utility, or has features that beat current
                generation products like this{" "}
                <span
                  className="HighlightGuide"
                  onClick={() => history.push("/product/epzewbtWYrvKfCaWwk7a")}
                >
                  LED Desk Lamp with Wireless Charging
                </span>{" "}
                or{" "}
                <span
                  className="HighlightGuide"
                  onClick={() => history.push("/product/xgG1f1i2Da3hrobaDXhj")}
                >
                  9500L 1080p Bluetooth Wifi Projector,
                </span>
                {" "}their best qualities will be showcased to their full extent with
                Lagruni's video sharing ecommerce platform.
              </span>
            </p>
            <div className="SpacerForAffiliate"></div>
            <span>
              Sign up here today at <span className="HighlightGuide" onClick={() => history.push("/SellerSignup")}>https://lagruni.com/SellerSignup </span>
            </span>
            <div>
              Post Tiktok, Youtube, Instagram and Pinterest videos today with
              your affiliate links! Bonus points if you also upload your
              vertical videos onto Lagruni or film products with our App!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
