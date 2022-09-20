import "./styles.scss";
import { useHistory } from "react-router-dom";


const Affiliate = () => {
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
            <a onClick={() => history.push("/SellingSuccessfully")}>Seller Best Practices</a>
          </li>
          <li>
            <a onClick={() => history.push("/SellerSignup")}>Seller Signup</a>
          </li>


        </div>
        <div className="superAffiliate">
            <div class="help-content">
                {/* <a name="GUID-8966E75F-9B92-4A2B-BFD5-967D57513A40"></a> */}
                <h1>Affiliate/Influencer Information</h1>
                <div>
                    <p class="lead">
                        <span></span>
                    </p>
                    <p></p>
                    <table class="ratetable">
                        <tbody>
                            <tr>
                                <th>Product Category</th>
                                <th>Fixed Commission Income Rates</th>
                            </tr>
                            <tr>
                                <td>All Categories</td>
                                <td>15.00%</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="SpacerForAffiliate"></div>
                    <span>
              Sign up here today at <span   className="HighlightGuide" onClick={() => history.push("/Affiliate")}>https://lagruni.getrewardful.com </span>
            </span>
                 <div>Post Tiktok, Youtube, Instagram and Pinterest videos today with your affiliate links! Bonus points if you also upload your vertical videos onto Lagruni or film products with our App!

                 </div>

                </div>
            </div>
                              </div>
        </div>
    );
};

export default Affiliate;
