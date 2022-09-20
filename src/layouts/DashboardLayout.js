import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../Redux/User/user.actions';

import Header1 from './../components/Header1';
import VerticalNav from './../components/VerticalNav';
import Footer from './../components/Footer';
import SellerTab from './../components/SellerTab'
import AdminTab2 from './../components/AdminTab2'
import Admin2 from './../components/SellerTab'

const DashBoardLayout = props => {

  return (
     <div>
    <Header1 {...props} />
    <div className="dashboardLayout">

      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/Home">
                  Home
                </Link>
              </li>
              <li>
                 <Link to="/Cart">
                  Your Cart
                </Link>
              </li>
              <li>
                 <Link to="/OrderHistory">
                  Order History
                </Link>
              </li>
              <li>
                 <Link prefetch to="/SellerSignup">
                  Become a Seller
                </Link>
              </li>
               <SellerTab/>

             <AdminTab2/>
              <li>
              <Link to="/ExtraSettings">
                  Settings
              </Link>
              </li>
            </ul>
          </VerticalNav>
        </div>
        <div className="content">
          {props.children}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashBoardLayout;