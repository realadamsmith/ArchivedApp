import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { firestore } from "./../../Firebase/utils";

import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SocialsLink = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [social1, setSocial1] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]);
  }, []);

  useEffect(() => {
    if (currentUser.tiktokUser) {
     alert("You already linked your TikTok account");
     history.push('/Account');
    }
  }, [currentUser]);

  const resetForm = () => {
    setSocial1("");
    setPassword("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("rand")

    firestore.collection("users").doc(currentUser.id).update({
      tiktokUser: social1,
    });
  };

  const configAuthWrapper = {
    headline: "Link your TikTok Account",
  };

  return (
    <div>
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="Social"
              value={social1}
              placeholder="@yourtiktokusernamehere"
              handleChange={(e) => setSocial1(e.target.value)}
            />

            <ul>{errors ? <div>{errors}</div> : <></>}</ul>
            <Button type="submit">Track your Crossposts</Button>

            <div className="socialSignin">
              <div className="row">
                {/* <Button onClick={handleGoogleSignIn}>
                Sign in with Google
              </Button> */}
                {/* {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return (
                <li key={index}>
                  {e}
                </li>
              );
            })}
          </ul>
        )} */}
              </div>
            </div>

            {/* <div className="links">
              <Link to="/registration">Register</Link>
              {` | `}
              <Link to="/recovery">Reset Password</Link>
            </div> */}
          </form>
          {/* <h2>things</h2> */}
          {/* <span className="LoginErrMsg">If login does not work, please try a different password or email.</span> */}
        </div>
      </AuthWrapper>
      <div className="CenterPromoSignup">
        {" "}
        You will earn points for each video review across Lagruni and TikTok. We track this by acknowledging TikTok Username.
      </div>

      <div className="CenterPromoSignup">
        {" "}
        Every 100 Likes on TikTok will earn roughly 1000 points, or $10.00 worth towards your next Lagruni purchases.
      </div>
      <div className="RegisterSpacer"></div>
      <div className="CenterPromoSignup">
        {" "}
        This is the reward for helping the mission of having the best most detailed reviews of a product.      </div>
    </div>
  );
};

export default SocialsLink;
