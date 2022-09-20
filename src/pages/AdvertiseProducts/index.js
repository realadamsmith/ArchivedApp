import "./styles.scss";
import { useHistory } from "react-router-dom";

const Advertise = () => {
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
            <a onClick={() => history.push("/LagrangeNetwork")}>Lagrange Network</a>
          </li>
          <li>
            <a onClick={() => history.push("/CompanyPage")}>Company News</a>
          </li>
          <li>
            <a onClick={() => history.push("/SellingSuccessfully")}>Seller Best Practices</a>
          </li>
          <li>
            <a onClick={() => history.push("/SellerSignup")}>Seller Signup</a>
          </li>


        </div>
        <div className="superAffiliate">
            <div class="help-content">
                {/* <a name="GUID-8966E75F-9B92-4A2B-BFD5-967D57513A40"></a> */}
                <h1>Advertise on Lagruni</h1>
                <div>
                    <p>
                        Please send an email to adam@lagruni.com for support
                        needs. Please understand this is still a small company
                        and we are pushing hard everyday to get things off the
                        ground.
                    </p>
                    <p>Expect a response within 24 hours.</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Advertise;
