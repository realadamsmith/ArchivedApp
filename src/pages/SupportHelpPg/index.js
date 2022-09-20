import "./styles.scss";
import { useHistory } from "react-router-dom";

const Support = () => {
  const history = useHistory();

    return (
      <div className="itemresults">
          <div className="ListOfLinks">
          <li>
            <a onClick={() => history.push("/Affiliate")}>Affiliate Info</a>
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
            <a onClick={() => history.push("/SellingSuccessfully")}>Seller Best Practices</a>
          </li>
          <li>
            <a onClick={() => history.push("/SellerSignup")}>Seller Signup</a>
          </li>

        </div>
        <div className="support">
            <div class="help-content">
                {/* <a name="GUID-8966E75F-9B92-4A2B-BFD5-967D57513A40"></a> */}
                <h1>Support Page</h1>
                <div>
                    <p class="lead">
                        <span></span>
                    </p>

                    <div id="GUID-8966E75F-9B92-4A2B-BFD5-967D57513A40__SECTION_E43B23A9DE984224999AC8B10313459A">
                        {/* <a name="GUID-8966E75F-9B92-4A2B-BFD5-967D57513A40__SECTION_E43B23A9DE984224999AC8B10313459A"></a> */}
                    </div>

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

export default Support;
