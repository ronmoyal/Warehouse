import axios from 'axios';
import React, { useState } from 'react';
import { useSignIn } from 'react-auth-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SigninScreen() {
  const signIn = useSignIn();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataObj = {
      email: email,
      pwd: password,
    };

    axios
      .post('http://localhost:4000/signin', formDataObj)
      .then((response) => {
        signIn({
          token: response.data.accessToken,
          expiresIn: 3600,
          tokenType: 'Bearer',
          authState: { email: formDataObj.email, role: response.data.role },
        });
        console.log(response.data);
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = '/';
        }, 4000);
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
          setPassword('');
        } else {
          toast.error('Oops, something went wrong!');
        }
      })
      .finally(() => {
        setShowPassword(false);
      });
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="signin">
      <form
        className="signin-form-container"
        id="signin-form-container"
        onSubmit={handleSubmit}
      >
        <h2>Login to an account</h2>
        <div key="email" className="signin-form-group">
          <label className="signin-lable" htmlFor="email">
            Email:
          </label>
          <input
            className="signin-input"
            type="email"
            placeholder="Enter your email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div key="password" className="signin-form-group">
          <label className="signin-lable" htmlFor="password">
            Password:
          </label>
          <div className="password-input-container">
            <input
              className="signin-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              required={true}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="show-password-button"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FontAwesomeIcon icon={faEyeSlash} />
              ) : (
                <FontAwesomeIcon icon={faEye} />
              )}
            </button>
          </div>
        </div>
        <button className="signin-submit" type="submit" id="submit-btn">
          Sign In
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SigninScreen;
  