import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { resetPasswordStart, resetUserState } from './../../Redux/User/user.actions';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import FormInput from './../Forms/FormInput';
import Button from './../Forms/Button';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  userErr: user.userErr
});

const EmailPassword = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetUserState());
      history.push('/Login');
    }

  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    }

  }, [userErr]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
  }

  const configAuthWrapper = {
    headline: 'Email Password'
  };

  return (
    <>
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">

        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return (
                <li key={index}>
                  {e}
                </li>
              );
            })}
          </ul>
        )}

        <form onSubmit={handleSubmit}>

          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={e => setEmail(e.target.value)}
          />
 <div className='RegisterSpacer'></div>
          <Button type="submit">
            Email Password
          </Button>

        </form>
        <div className='RegisterSpacer'></div>

       <div className="links">
          <Link to="/Login">
            Login
          </Link>
          {` | `}
          <Link to="/registration">
            Register
          </Link>
        </div>
      </div>
    </AuthWrapper>

    <div className="CenterPromoSignup"> ⭐️ Labor Day Deal until September 15, get 1000 UNI pts when you create an account, and 500 per vertical product video review!
    </div>
    </>
  );
}

export default EmailPassword;