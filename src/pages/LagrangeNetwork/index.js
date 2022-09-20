import "./styles.scss";
import { useHistory } from "react-router-dom";
import SellerIphone1 from "../../Assets/SellerIphone1.png";

const LagrangeNetwork = () => {
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
          <a onClick={() => history.push("/CompanyPage")}>Company News</a>
        </li>
        <li>
          <a onClick={() => history.push("/SellingSuccessfully")}>
            Seller Best Practices
          </a>
        </li>
        <li>
          <a onClick={() => history.push("/Affiliate")}>
            Affiliate
          </a>
        </li>
        <li>
          <a onClick={() => history.push("/SellerSignup")}>Seller Signup</a>
        </li>
      </div>
      <div className="superAffiliate">
        <div class="help-content">
          {/* <a name="GUID-8966E75F-9B92-4A2B-BFD5-967D57513A40"></a> */}
          <h1>The Lagrange Network</h1>
          <div>
            <p class="lead">
              <span></span>
            </p>
            <p></p>

            {/* <span>
              Sign up here today at{" "}
              <span
                className="HighlightGuide"
                onClick={() => history.push("/Affiliate")}
              >
                https://lagruni.getrewardful.com{" "}
              </span>
            </span> */}
            <div>
              When your Lagruni product review reaches certain thresholds, the video is posted to TikTok, Instagram Reels, Facebook Reels, Pinterest, and other social media platforms.
            </div>
            <div>
              We track likes and comments on each platform your video is on, all resulting in more Points for you toward your next purchase.
            </div>
            <div className="twoWholeBackground">
            <img className="LagrangeExplainerImage" src={SellerIphone1}></img>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default LagrangeNetwork;
