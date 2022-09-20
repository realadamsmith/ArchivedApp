import "./styles.scss";
import { useHistory } from "react-router-dom";

const CompanyPage = () => {
  const history = useHistory();

  return (
    <div className="itemresults">
      <div className="ListOfLinks">
        <li>
          <a onClick={() => history.push("/Affiliate")}>Affiliate Info</a>
        </li>
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
          <a onClick={() => history.push("/SellingSuccessfully")}>
            Seller Best Practices
          </a>
        </li>
        <li>
          <a onClick={() => history.push("/SellerSignup")}>Seller Signup</a>
        </li>
      </div>
      <div className="superAffiliate">
        <div class="help-content">
          {/* <a name="GUID-8966E75F-9B92-4A2B-BFD5-967D57513A40"></a> */}
          <div className="NewsHeader">
            <h1>News & Insights</h1>
          </div>
          <div className="EachNewsItem">
            <h3>
              {" "}
              7/25/22 - When recording a video review from your Order
              History, or the Product Page from your iOS or Android phone, pause
              and resume the video by tapping the record button to get multiple
              takes!
            </h3>
          </div>
          <div className="EachNewsItem">
            <h3>5/3/22 Complete implementation of our Affiliate program</h3>
            Vertical video content is what we're based on, it is accessible and
            easy for people to share their experiences this way. Video Reviews
            posted on our app/site are algorithmically crossposted to other
            platforms. Affiliates and customers alike can film on and off
            platform their experiences on products. Although we'd prefer each
            product have a good selection of videos to scroll through.
          </div>
          <div className="EachNewsItem">
            <h3>4/10/22 Android, Web, and iOS platforms available</h3>
            Look through short video reviews of products on all platforms and
            app stores.
          </div>
          <div className="EachNewsItem">
            <h3>3/15/22 Addition of Shippo Shipping Label quote system</h3>
            Our Seller network can now be empowered natively on the Lagruni
            platform to create shipping labels for their Self Fulfilled Orders
            to Ship items.
          </div>
          <div className="EachNewsItem">
            <h3>
              4/15/21 The boys come together to innovate in ecommerce by
              focusing on Video Reviews only and creating a community of
              customers and reviewers reviewing products through our Scrollable
              Feed
            </h3>
            We want to promote the best products, and the best value. Full
            transparency. Trying to see which of the 50 lamps on Amazon or
            Walmart are the best? Just scroll through some videos through the
            App or Desktop to see video review comparisons. We're working on
            this niche and hope to partner with sellers all over the U.S and
            China to really find the best products. New sellers on Amazon also
            have to compete against fake reviews, and similar looking products.
            What better way to see quality differences than with short Tiktok
            style video reviews.
          </div>
          <div className="QuotesBusiness">
            <div>
              "The best part is no part, the best process is no process" Don’t
              overcomplicate. — Elon Musk - Tesla
            </div>
            <div>
              "Have the confidence to focus on uncharted territory. Take
              chances." — Julie Sweet - Accenture
            </div>
          </div>
          {/* <div className="EachNewsItem">
                    <h3>3/10/22 Lagruni </h3>

                </div> */}
        </div>
      </div>
    </div>
  );
};
export default CompanyPage;
