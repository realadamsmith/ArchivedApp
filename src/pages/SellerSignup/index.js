import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";
import SellerIphone1 from "../../Assets/SellerIphone1.png";
import ShipbobSellerSignup1 from "../../Assets/ShipbobSellerSignup1.png";
import ReactGA from 'react-ga';
import { useHistory } from "react-router-dom";

const SellerSignup = () => {
    const history = useHistory();


    const GAClickHandler = () => {
        ReactGA.event({
            category: 'Button',
            action: 'Went to 2nd Signup Page'
        })
    }

    return (
        <div className="mainpage">
            <div className="oneWholeBackground">
                <div className="oneofthreeSellerpanel">
                    <p className="welcome">
                        Sell on Lagruni too with your amazing Products, Recieve New Seller benefits
                        {/* <a href="https://www.globalshapers.org/impact/themes/sustainable-development">
                            ESG
                        </a>{" "} */}
                    </p>
                    <div>
                    <div onClick={() => history.push("/SellerForm")} className="L1GetStartedBtn">
                        Start
                    </div>
                    <div className="UnderStartFees">$0 Listing fees</div>
                    </div>
                </div>
            </div>
            {/* Outside divs are for Background Image Purposes */}
            <div className="twoWholeBackground">
            <img className="Image" src={SellerIphone1}></img>

                <div className="twoofthreeSellerpanel">
                    <div className="FirstHalfBox">
                    </div>
                    <div className="SecondHalfBox">
                    Customers will get points by making video reviews of your products. Let our algorithm do the Crossposting work and tracking their likes.
                    </div>
                </div>

            </div>
                {/* <div className="BoxesForStats">
                    Maybe turn these each into Whole Page videos Apple style with 100px font
                    <div className="StatBox1">

                        <img></img>
                        <div>Video Reviews on average bring 7.3X more sales to products</div>
                    </div>
                    <div className="StatBox2">
                        <img></img>
                        <div>Detailed video reviews reduce Returns by 17%</div>
                    </div>
                    <div className="StatBox3">
                        <img></img>
                        <div>Being carbon neutral is much easier.</div>
                    </div>
                </div> */}
            <div className="threeWholeBackground">
            <img className="Image2" src={ShipbobSellerSignup1}></img>

                <div className="threeofthreeSellerpanel">
                    <div className="FirstHalfBox">
                    This batch of sellers receive benefits including only
                        15% Total fees per sale for 5 years.
                    </div>
                    <div className="SecondHalfBoxCustom">

                        {/* <img className="Image" src={LagruniPartnerInfo1}></img> */}
                    </div>
                </div>
            </div>
            <div className="oneofthreeSellerpanel">
                <p className="welcome">
                    Be part of the Video Review standard and product transparency.
                </p>
                <Link to="/SellerForm" className="L1GetStartedBtn">
                    Start
                </Link>
            </div>
        </div>
    );
};

export default SellerSignup;
