import { Link, useHistory } from "react-router-dom";
import React from "react";
import "./styles.scss";

const Footer = (props) => {
  const history = useHistory();

  return (
    <footer className="footer">
      <div className="Midwrap">
        <div class="navFooterLinkCol">
          <div class="navFooterColHead">About Lagruni</div>
          <ul>
            <li class="nav_first">
              <a
                href="https://lagruni.notion.site/Careers-with-Lagruni-7ba4f23e46bd4e53a6cc7688b497631f"
                class="nav_first"
              >
                Careers
              </a>
            </li>
            <li>
              <a onClick={() => history.push("/CompanyPage")} class="nav_first">
                Blog
              </a>
            </li>

            <li>
              <a onClick={() => history.push("/CompanyPage")} class="nav_first">
                Press Center
              </a>
            </li>
            <li>
              <a onClick={() => history.push("/CompanyPage")} class="nav_first">
                Investor Relations
              </a>
            </li>
          </ul>
        </div>
        <div class="navFooterLinkCol">
          <div class="navFooterColHead">Make Money with Us</div>
          <ul>
            <li class="nav_first">
              <a
                class="nav_first"
                onClick={() => history.push("/sellerSignup")}
              >
                Sell products on Lagruni
              </a>
            </li>

            <li>
              <a onClick={() => history.push("/Affiliate")} class="nav_first">
                Become an Affiliate
              </a>
            </li>
            <li>
              <a onClick={() => history.push("/LagrangeNetwork")} class="nav_first">
                How the Lagrange Network Works
              </a>
            </li>

            <li>
              <a onClick={() => history.push("/Advertise")} class="nav_first">
                Advertise Your Products
              </a>
            </li>
            <li>
              <a onClick={() => history.push("/SellingSuccessfully")} class="nav_first">
                Lagruni Seller Best Practices
              </a>
            </li>
          </ul>
        </div>
        <div class="navFooterLinkCol">
          <div class="navFooterColHead">Lagruni Values</div>
          <ul>
            <li>
              <a
                href="https://www.globalshapers.org/impact/themes/sustainable-development"
                class="nav_first"
              >
                Economic, Social, and Governance
              </a>
            </li>
            <li>
              <a
                href="https://www.globalshapers.org/impact/themes/sustainable-development"
                class="nav_first"
              >
                Sustainability
              </a>
            </li>
          </ul>
        </div>
        <div class="navFooterLinkCol navAccessibility">
          <div class="navFooterColHead">Let Us Help You</div>
          <ul>
            {/* <li class="nav_first">
                                <a
                                    href="/gp/help/customer/display.html?nodeId=GDFU3JS5AL6SYHRD&amp;ref_=footer_covid"
                                    class="nav_first"
                                >
                                    Lagruni and COVID-19
                                </a>
                            </li> */}
            <li>
              <a class="nav_first" onClick={() => history.push("/Account")}>
                Your Account
              </a>
            </li>
            <li>
              <a
                class="nav_first"
                onClick={() => history.push("/OrderHistory")}
              >
                Your Orders
              </a>
            </li>
            {/* <li>
                                <a
                                    href="/gp/help/customer/display.html?nodeId=468520&amp;ref_=footer_shiprates"
                                    class="nav_first"
                                >
                                    Shipping Rates &amp; Policies
                                </a>
                            </li> */}
            {/* <li>
                                <a
                                    href="/gp/css/returns/homepage.html?ref_=footer_hy_f_4"
                                    class="nav_first"
                                >
                                    Returns &amp; Replacements
                                </a>
                            </li> */}
            {/* <li>
                                <a
                                    href="/hz/mycd/myx?ref_=footer_myk"
                                    class="nav_first"
                                >
                                    Manage Your Content and Devices
                                </a>
                            </li> */}

            <li class="nav_last ">
              <a
                onClick={() => history.push("/SupportHelpPg")}
                class="nav_first"
              >
                Help & Support
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="Bottomwrap">
        <p>
          Copyright © 2022, UNI, LLC
          <Link to="/ConditionsOfUse"> Conditions of Use</Link> |
          <Link to="/PrivacyNotice"> Privacy Notice</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
