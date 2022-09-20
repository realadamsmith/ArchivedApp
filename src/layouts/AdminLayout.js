import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../Redux/User/user.actions';

import Header2Admin from './../components/Header2Admin';
import VerticalNav from './../components/VerticalNav';
import Footer from './../components/Footer';

const AdminLayout = props => {
  const dispatch = useDispatch();

  const signOut = () => {
    dispatch(signOutUserStart());
  };

  return (
    <div>     
    <Header2Admin {...props} />
    <div className="adminLayout">
      <div className="controlPanel">
        <div className="sidebar">
          <VerticalNav>
            <ul>
              <li>
                <Link to="/Account">
                  Back to Customer Account
                </Link>
              </li>
              <li>
                <span className="signOut" onClick={() => signOut()}>
                  Sign Out
                </span>
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

export default AdminLayout;