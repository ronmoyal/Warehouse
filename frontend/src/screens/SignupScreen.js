import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function SignupScreen() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showValidPassword, setShowValidPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== validPassword) {
      toast.error('Passwords do not match');
      setValidPassword('');
      return;
    }

    const formDataObj = {
      email: email,
      id: id,
      pwd: password,
      code: code,
    };

    axios
      .post('http://localhost:4000/register', formDataObj)
      .then((response) => {
        console.log(response.data);
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = '/signin';
        }, 4000);
      })
      .catch((error) => {
        console.error('Error sending data to server:', error);
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
          setPassword('');
          setValidPassword('');
          setCode('');
        } else {
          toast.error('Oops, something went wrong!');
        }
      });
  };

  return (
    <div className="signup">
      <form
        className="signup-form-container"
        id="signup-form-container"
        onSubmit={handleSubmit}
      >
        <h2>Create an account</h2>
        <div key="id" className="signup-form-group">
          <label className="signup-lable" htmlFor="id">
            ID:
          </label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter your ID"
            required={true}
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div key="email" className="signup-form-group">
          <label className="signup-lable" htmlFor="email">
            Email:
          </label>
          <input
            className="signup-input"
            type="email"
            placeholder="Enter your email"
            required={true}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div key="password" className="signup-form-group">
          <label className="signup-lable" htmlFor="password">
            Password:
          </label>
          <div className="password-input-container">
            <input
              className="signup-input"
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
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
        </div>
        <div key="confpassword" className="signup-form-group">
          <label className="signup-lable" htmlFor="confpassword">
            Confirm Password:
          </label>
          <div className="password-input-container">
            <input
              className="signup-input"
              type={showValidPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              required={true}
              value={validPassword}
              onChange={(e) => setValidPassword(e.target.value)}
            />
            <button
              className="show-password-button"
              type="button"
              onClick={() => setShowValidPassword(!showValidPassword)}
            >
              <FontAwesomeIcon
                icon={showValidPassword ? faEyeSlash : faEye}
              />
            </button>
          </div>
        </div>
        <div key="code" className="signup-form-group">
          <label className="signup-lable" htmlFor="code">
            Code (optional) - ADMIN REGISTER:
          </label>
          <input
            className="signup-input"
            type="text"
            placeholder="Enter code"
            required={false}
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          className="signup-submit"
          type="submit"
          id="submit-btn"
          title="Save"
        >
          Sign up
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignupScreen;