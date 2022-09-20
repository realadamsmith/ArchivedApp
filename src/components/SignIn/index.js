import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
} from "./../../Redux/User/user.actions";

import "./styles.scss";

import AuthWrapper from "./../AuthWrapper";
import FormInput from "./../Forms/FormInput";
import Button from "./../Forms/Button";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
  userErr: user.userErr,
});

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser, userErr } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (currentUser) {
      resetForm();
      history.push("/");
    }
  }, [currentUser]);

  useEffect(() => {
    setErrors([]);
  }, []);

  useEffect(() => {
    setErrors([]);
  }, [email, password]);

  useEffect(() => {
    if (userErr) {
      setErrors(
        "Password invalid or wrong account, try again. Reset your password below if needed."
      );
    }
  }, [userErr]);

  const resetForm = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
    // alert("If signin fails, retry password, or reset password")
  };

  const handleGoogleSignIn = () => {
    //   try {
    dispatch(googleSignInStart());
    //   } catch (err) {
    //      setError(err)
    //   }
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <div>
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={(e) => setPassword(e.target.value)}
            />
            <ul>{errors ? <div>{errors}</div> : <></>}</ul>
            <Button type="submit">LOGIN</Button>

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

            <div className="links">
              <Link to="/registration">Register</Link>
              {` | `}
              <Link to="/recovery">Reset Password</Link>
            </div>
          </form>
          {/* <h2>things</h2> */}
          {/* <span className="LoginErrMsg">If login does not work, please try a different password or email.</span> */}
        </div>
      </AuthWrapper>
      <div className="CenterPromoSignup">
        {" "}
        🇺🇳🚀 Tip - Visit the site with the same browser to stay logged in every
        time you visit!
      </div>
      <div className="RegisterSpacer"></div>

      <div className="CenterPromoSignup">
        {" "}
        ⭐️ Labor Day Deal until September 15, get 1000 UNI pts when you create
        an account, and 500 per vertical product video review!
      </div>
    </div>
  );
};

export default SignIn;
