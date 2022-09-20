import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkUserIsSeller } from './../../Utils';
import './styles.scss';

const mapState = ({ user }) => ({
  currentUser: user.currentUser
})

const SellerTab = props => {
  const { currentUser } = useSelector(mapState);

  const isSeller = checkUserIsSeller(currentUser);
  if (!isSeller) return null;

  return (
    // <div className="adminToolbar">
    <li>
          <Link to="/Seller">
            Seller Profile
          </Link>
          </li>
    // </div>
  );
}

export default SellerTab;