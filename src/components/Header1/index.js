import "./styles.scss";
import Logo from "./../../Assets/MiroLogoTransparentSmallFont.png";

import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItemsCount } from "./../../Redux/Cart/cart.selectors";
import { HiMenu, HiSearch } from "react-icons/hi";
import { IoAppsSharp } from "react-icons/io5";
import { BsPerson } from "react-icons/bs";
import SearchIcon from "@mui/icons-material/Search";
import { GrApps } from "react-icons/gr";
import { SettingsData, SidebarData, SubmenuData } from "./SidebarData";
// import { actionTypes } from "../../Redux/rootReducer";
// import { useStateValue } from "../../Redux/StateProvider";
import { IconContext } from "react-icons/lib";
// import { Navigation } from './SubNavMenu';

const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state), // WE ONLY WANT TO CHANGE THIS IF
}); // ALLOWS US TO WRITE CUSTOM REDUX SELECTORS, DNLD RESELECT

const Header1 = (props) => {
  // const [{}, dispatchSearch] = useStateValue();
  const { currentUser, totalNumCartItems } = useSelector(mapState);
  const location = useLocation();
  const history = useHistory();
  const [activeMenu, setActiveMenu] = useState(false);

  const [sidebar, setSidebar] = useState(false);
  const [getInvolved, setgetInvolved] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const showGetInvolved = () => setgetInvolved(!getInvolved);

  const [input, setInput] = useState(""); // FOR SEARCH

  //  const signOut = () => {
  //     dispatch(signOutUserStart());
  //   };
  useEffect(() => {
    setActiveMenu(false);
  }, [location]);

  const search = (e) => {
    e.preventDefault();
    history.push(`/SearchResults/${input}`);
  };

  // const showGetInvolved = () => {
  //   return(

  //   )
  // }

  return (
    <header className="header">
      <div className="wrap1">
        <div>
          <div className="MiddleAnnouncement">
            {/* <div className="CenterTextHeaderAnnouncement">Free 2-4 Day Shipping on orders over $10</div> */}
            <a className="CenterTextHeaderAnnouncement" href='https://apps.apple.com/us/app/lagruni/id1587491962'>
              Downloading the app and filming a video review of your puchase gets <b>250pts</b> per Review recorded, <b>50pts</b> per Like, <b>1000pts</b> if your video review is posted to the Lagruni Network and TikTok.
            </a>
            <div className="appsbutton" onClick={showGetInvolved}>
              <IoAppsSharp
                className="hamburger"
                size="30px"
                // color="white"
              />
            </div>
            <nav
              className={
                getInvolved ? "getInvolvedmenu active" : "getInvolvedmenu"
              }
              onClick={showGetInvolved}
            >
              {/* <p className="welcomeheader">Welcome to Mallshop</p> */}
              <li>
                <Link to="/CompanyPage">Community Blog</Link>
              </li>
              <li>
                <Link to="/CompanyPage">Company News</Link>
              </li>

              <li>
                <Link to="/SupportHelpPg">Community Support</Link>
              </li>
              <li>
                <Link to="/Account">Settings</Link>
              </li>
            </nav>
          </div>
        </div>
        <div className="1LeftHalf"></div>

        {/* <div className="topRightHalf"> */}
        {/* <IconContext.Provider
                 value={{ color: "white"}}> */}
        {/* <IoAppsSharp
                        className="anything"
                        color="white"
                        size="1.5em"
                        onClick={showGetInvolved}
                        cursor="pointer"
                    ></IoAppsSharp>

                    <nav
                        className={
                            getInvolved
                                ? "getInvolvedmenu active"
                                : "getInvolvedmenu"
                        }
                        onClick={showGetInvolved}
                    >
                        <div className="getInvolvedmenu">
                            <div className="appsmenu">Company Page</div>
                            <div className="appsmenu">Company Page</div>
                        </div>
                    </nav> */}
      </div>
      {/* </div> */}

      <div className="wrap2">
        <nav className="lefthalfnav">
          <div className="btner btn-1" onClick={showSidebar}>
            <HiMenu viewBox="27 -3 10 25" />
            <svg>
              <rect x="0" y="0" fill="none" width="100%" height="100%" />
            </svg>
            <div className="Options">Options</div>
          </div>
          <nav
            className={sidebar ? "nav-menu active" : "nav-menu"}
            onClick={showSidebar}
          >
            <div className="menuHeader">
              <p className="welcomeheader">Welcome to Lagruni</p>
              <div className="ITEM-SECTION1">Trending</div>
              <ul className="nav-menu-items">
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span className="eachfield">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="ITEM-SECTION1">Help & Settings</div>
              <ul className="nav-menu-items">
                {SettingsData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span className="eachfield">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {/* <li>
                        <p><Link to = "/dashboard">Your Account</Link></p>
                      </li> */}
            </div>
          </nav>

          {/* <Link to="/search">
                  Categories
                </Link> */}
          {/* </ul> */}
        </nav>
        <div className="righthalfnav">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="mallshop" />
            </Link>
          </div>

          <div className="SearchWrap">
            <form className="Field">
              <input
                value={input}
                type="search"
                placeholder="Find the Best Value Products"
                onChange={(e) => setInput(e.target.value)}
              ></input>
              {/* <div className="SearchButton"> */}
              <button
                class="SearchButton"
                onClick={search}
                type="submit"
                aria-label="Perform Search"
                id="global-search-submit"
              >
                <span class="g_b">
                  <SearchIcon
                    className="srch"
                    alt="null"
                    aria-hidden="true"
                    width="40"
                    height="40"
                    color="white"
                    // src="//i5.walmartimages.com/dfw/63fd9f59-43e0/1ed7036a-feba-43ca-8885-1d937a9aa4f2/v1/search-nav-black.b92f68559cf70c3bcfb9eae1d8dcca59ca58af11.svg"
                  ></SearchIcon>
                </span>
              </button>
              {/* </div> */}
            </form>
          </div>

          <div className="callToActions">
            {currentUser && [
              <li key={1}>
                <Link prefetch to="/Account" className="btner btn-1">
                  {/* <div className="CTAimage"> */}
                  <svg>
                    <BsPerson
                      size={35}
                      viewBox="5 -2 6 19"
                      // style={{
                      //     margin: "0px 10px 0px 0px",
                      // }}
                      className="Personicon"
                    />
                    <rect x="0" y="0" fill="none" width="100%" height="100%" />
                  </svg>
                  {/* </div> */}
                  <div className="Account1">Your Account</div>
                </Link>
              </li>,
              // <li key={2}>
              //   <span onClick={() => signOut()}>
              //     LogOut
              //     <i class="fas fa-sign-out-alt"></i>
              //   </span>
              // </li>
            ]}
            {currentUser && [
              <li key={1}>
                <Link to="/OrderHistory" className="btner btn-1">
                  <svg>
                    <svg
                      size={25} //MAKES THE HEIGHT OF EVERYTHING ELSE GO DOWN
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="-3 2 90 20"
                    >
                      <path
                        d="M12.486 1.626L20.97 6.34A2 2 0 0122 8.088v7.824a2 2 0 01-1.029 1.748l-8.485 4.714a1 1 0 01-.972 0L3.03 17.66A2 2 0 012 15.912V8.088A2 2 0 013.029 6.34l8.485-4.714a1 1 0 01.972 0zM4 9.176v6.736l7 3.888v-6.711L4 9.176zm16 .022l-7 3.887V19.8l7-3.888V9.198zm-3.5-3.055L9.566 9.996l2.431 1.36 6.943-3.857-2.44-1.356zM12 3.644L5.079 7.488l2.433 1.36 6.929-3.849L12 3.644z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <rect x="0" y="0" fill="none" width="100%" height="100%" />
                  </svg>

                  <div className="Account">Orders & Returns</div>
                </Link>
              </li>,
              // <li key={2}>
              //   <span onClick={() => signOut()}>
              //     LogOut
              //     <i class="fas fa-sign-out-alt"></i>
              //   </span>
              // </li>
            ]}
            <li>
              <Link to="/Cart" className="btner btn-1">
                <svg>
                  {/* <a target="_self"  data-widget="cart"> */}
                  <svg
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="33 -3 10 30"
                  >
                    <path
                      fill-rule="evenodd"
                      // clip-rule="evenodd"
                      d="M10 2a4 4 0 00-4 4v2H.867L2.18 18.496A4 4 0 006.15 22h11.703a4 4 0 003.969-3.504L23.133 8H18V6a4 4 0 00-4-4h-4zm3 7a1 1 0 00-1-1H8V6a2 2 0 012-2h4a2 2 0 012 2v4h4.867l-1.03 8.248A2 2 0 0117.851 20H6.148a2 2 0 01-1.984-1.752L3.133 10H12a1 1 0 001-1z"
                      fill="currentColor"
                    ></path>
                  </svg>

                  <rect x="0" y="0" fill="none" width="100%" height="100%" />
                </svg>
                <div className="NumCartItems">{totalNumCartItems}</div>
                Cart
                {/* <span class="a9c6">Cart </span> */}
                {/* </a> */}
              </Link>
            </li>

            {/* I THINK CLASS IS BEING ERRORD AS A INVALID DOM PROPERTY, WANTS CLASSNAME */}
            {!currentUser && [
              <li key={2}>
                <Link to="/Login" className="btner btn-1">
                  <svg>
                    <BsPerson
                      size={35}
                      viewBox="5 -2 6 19"
                      // style={{
                      //     margin: "0px 10px 0px 0px",
                      // }}
                      className="Personicon"
                    />
                    <rect x="0" y="0" fill="none" width="100%" height="100%" />
                  </svg>
                  <div className="Textmove">Login</div>
                </Link>
              </li>,
            ]}
            {/* <li className="mobileMenu">  //NOT SURE WHAT THE FUNCTION OF THIS IS
              <span onClick={() => setActiveMenu(!activeMenu)}>
                <i className="fas fa-bars"></i> // ITS ALL PART OF SIMPLETUT #38 MOBILE COMMIT
              </span>
            </li> */}
          </div>
        </div>
      </div>
    </header>
  );
};

Header1.defaultProps = {
  currentUser: null,
};

export default Header1;
