import './styles.scss';
import Logo from "./../../Assets/MiroLogoTransparent2.png";
import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation  } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCartItemsCount } from './../../Redux/Cart/cart.selectors';
// import { actionTypes } from '../../Redux/rootReducer';
import { useStateValue } from '../../Redux/StateProvider';
import SearchIcon from '@mui/icons-material/Search';

// import { Navigation } from './SubNavMenu';

// const mapState = (state) => ({
//   currentUser: state.user.currentUser,
//   totalNumCartItems: selectCartItemsCount(state)    // WE ONLY WANT TO CHANGE THIS IF
// });                                                 // ALLOWS US TO WRITE CUSTOM REDUX SELECTORS, DNLD RESELECT

const Header2Admin = props => {
// const [{}, dispatchSearch] = useStateValue();
// const { currentUser } = useSelector(mapState);
const location = useLocation();
const history = useHistory();
const [activeMenu, setActiveMenu] = useState(false);



const [input, setInput] = useState("") // FOR SEARCH

//  const signOut = () => {
//     dispatch(signOutUserStart());
//   };
  useEffect(() => {
    setActiveMenu(false);
  }, [location]);



const search = (e) => {
  e.preventDefault();
//   console.log('you hit the search button >> ', input)
//   dispatchSearch({  // DISPATCH THE ACTION TYPE FROM THE SEARCH ACTION REDUX
//     type:actionTypes.SET_SEARCH_TERM,
//     term:input  // PASSES THE INPUT TERM FROM THE INPUT IN THE SEARCH BAR DIV
//   })
  history.push('/SearchResults') // CHANGE TO PRODUCTS TO SELL INSTEAD LIKE AMZN
}



  return (
    <header className="header2">
      <div className="wrapSeller1">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="mallshop" />
          </Link>
        </div>
        {/* <nav className={`mainMenu ${activeMenu ? 'active' : ''}`}>
        </nav> */}

        <div className="SearchWrap">
          <form className="Field">
            <input value ={input} type="search" placeholder="Find the Best Value Products"
            onChange={e => setInput(e.target.value)}>
            </input>
            {/* <div className="SearchButton"> */}
            <button class="SearchButton" onClick={search} type="submit" aria-label="Perform Search" id="global-search-submit">
              <span class="g_b"><SearchIcon
                                        className="srch"
                                        alt="null"
                                        aria-hidden="true"
                                        width="40"
                                        height="40"
                                        // src="//i5.walmartimages.com/dfw/63fd9f59-43e0/1ed7036a-feba-43ca-8885-1d937a9aa4f2/v1/search-nav-black.b92f68559cf70c3bcfb9eae1d8dcca59ca58af11.svg"
                                    ></SearchIcon>
              </span>
            </button>
      {/* </div> */}
          </form>
        </div>

{/* ██████╗░██╗░██████╗░██╗░░██╗████████╗  ███╗░░██╗░█████╗░██╗░░░██╗██████╗░░█████╗░██████╗░
    ██╔══██╗██║██╔════╝░██║░░██║╚══██╔══╝  ████╗░██║██╔══██╗██║░░░██║██╔══██╗██╔══██╗██╔══██╗
    ██████╔╝██║██║░░██╗░███████║░░░██║░░░  ██╔██╗██║███████║╚██╗░██╔╝██████╦╝███████║██████╔╝
    ██╔══██╗██║██║░░╚██╗██╔══██║░░░██║░░░  ██║╚████║██╔══██║░╚████╔╝░██╔══██╗██╔══██║██╔══██╗
    ██║░░██║██║╚██████╔╝██║░░██║░░░██║░░░  ██║░╚███║██║░░██║░░╚██╔╝░░██████╦╝██║░░██║██║░░██║
    ╚═╝░░╚═╝╚═╝░╚═════╝░╚═╝░░╚═╝░░░╚═╝░░░  ╚═╝░░╚══╝╚═╝░░╚═╝░░░╚═╝░░░╚═════╝░╚═╝░░╚═╝╚═╝░░╚═╝ */}

        {/* <div className="callToActions">
            {currentUser && [
              <li key={1}>
                <Link to="/Account" className="AccountBtn">Hello, Welcome
                <div className="Account">Account Info

                </div>
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
                <Link to="/Orderhistorypg" className="ReturnsBtn">Orders
                <div className="Account">& Returns

                </div>
                </Link>
              </li>,
              // <li key={2}>
              //   <span onClick={() => signOut()}>
              //     LogOut
              //     <i class="fas fa-sign-out-alt"></i>
              //   </span>
              // </li>
            ]}

        </div> */}
      </div>

    {/* ░██████╗██╗░░░██╗██████╗░███╗░░░███╗███████╗███╗░░██╗██╗░░░██╗
        ██╔════╝██║░░░██║██╔══██╗████╗░████║██╔════╝████╗░██║██║░░░██║
        ╚█████╗░██║░░░██║██████╦╝██╔████╔██║█████╗░░██╔██╗██║██║░░░██║
        ░╚═══██╗██║░░░██║██╔══██╗██║╚██╔╝██║██╔══╝░░██║╚████║██║░░░██║
        ██████╔╝╚██████╔╝██████╦╝██║░╚═╝░██║███████╗██║░╚███║╚██████╔╝
        ╚═════╝░░╚═════╝░╚═════╝░╚═╝░░░░░╚═╝╚══════╝╚═╝░░╚══╝░╚═════╝░ */}

      {/* <div className="wrap2">


      </div> */}

    </header>
  );
};

Header2Admin.defaultProps = {
  currentUser: null
};

export default Header2Admin;