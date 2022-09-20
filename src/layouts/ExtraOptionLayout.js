import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutUserStart } from './../Redux/User/user.actions';
import firebase from 'firebase/app';
import { auth } from '../Firebase/utils';
import { firestore } from '../Firebase/utils';
import { useHistory } from "react-router-dom";
import Buttons from '../components/Forms/Button';
import './ExtraOptionLayout.scss'

import Header1 from './../components/Header1';
import VerticalNav from './../components/VerticalNav';
import Footer from './../components/Footer';
import { apiInstance, apiInstance2 } from '../Utils';
import {
  AiOutlineCloseCircle,
  AiFillHeart,
  AiOutlineHeart,
} from "react-icons/ai";
import { useIonToast, createGesture, IonModal, IonContent } from "@ionic/react";


const ExtraOptionLayout = props => {
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  const [reportModal, setReportModal] = useState(false);


  const signOut = () => {
    dispatch(signOutUserStart());
  };

  const reportBoxOpen = () => {

    if (reportModal == true) {
      setReportModal(false);
    } else {
    alert("To ensure our servers delete the account please sign out and re-login, then continue.")
      setReportModal(true);
    }
  };

  const deleteAccount = async () => {
    // console.log(auth.currentUser.uid);
    setDisable(true);
    const user = firebase.auth().currentUser;
    if (user.uid == "5lyU0TCyqRcTD3y7Rs2FGV8h2Sd2") {
      alert("This option is not available for this account")
    } else {
      user.delete().then(function() {
        console.log("deleted")
      }).catch(function(error) {
        console.log(error.message)
      });

      await firestore.collection('users').doc(user.uid).update({
        deleted: true
      })

      dispatch(signOutUserStart());
      history.push("/Home")
    }
  }

  return (
     <div>
    <Header1 {...props} />
    <div className="dashboardLayout">
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
              <li>
                <span className="signOut" disabled={disable} onClick={() => reportBoxOpen()}>
                  Delete Account
                </span>
              </li>
            </ul>
          </VerticalNav>
          {reportModal ? (
            <IonModal
              isOpen={true}
              swipeToClose={true}
              className="testFieldsModalWrapper"
            >
              <div className="testFieldsModalPadd">
                <div className="optionsHeader">
                  <AiOutlineCloseCircle
                    className="ExitButtonTok"
                    onClick={reportBoxOpen}
                  />
                </div>
                <div className="testFields">
                  <div>
                    <div className="deleteHeader">Delete account, videos, likes, comments, and other data.</div>
                    <div className="deleteTextPadd">
                      We've always wanted to allow customers to be rewarded for sharing videos of their purchases since false reviews are rampant on other sites, so we're sorry if you must go. Hope we can work harder to bring you back.
                    </div>
                    <div className="deleteTextPadd">
                      We will continue working to bring on more sellers for customers to review products and share the best products with others.
                    </div>
                    <div className="deleteTextPadd">
                      This process will delete all of the above mentioned data and you won't be able to login unless you make a new account.
                    </div>
                  </div>

                </div>
                <div>
                  <Buttons onClick={() => deleteAccount()}>Delete</Buttons>
                </div>
              </div>
            </IonModal>
          ) : (
            <></>
          )}
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

export default ExtraOptionLayout;