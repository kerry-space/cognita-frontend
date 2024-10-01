import React, { useState } from 'react';
import './LoginPrompt.css';
import { useAuthContext } from '../../Hooks';
import { useNavigate } from 'react-router-dom';

export function LoginPrompt() {
  const { login } = useAuthContext();
  const [isInvalidCreds, setIsInvalidCreds] = useState(false);
  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDetails = Object.fromEntries(formData) as {
      userName: string;
      password: string;
    };
    try {
      await login(formDetails).then(() => {
        console.log('login success..');
        navigate('/user-management');
      });
    } catch (err) {
      console.log(err);
      setIsInvalidCreds(true);
    }
  };

  return (
    <div className='card'>
      <div className='card-header'>Cognita Learning</div>
      <p className='prompt'>Enter your email and password to login</p>
      {isInvalidCreds ? (
        <div className='invalid-container'>
          <p className='invalid-info'>Invalid credentials</p>
        </div>
      ) : null}
      <form onSubmit={onSubmit}>
        <div className='mb-3 wider'>
          <label htmlFor='email-input' className='form-label'>
            Email
          </label>
          <input
            //The 'name' attr below sets the attr name that comes out from the form which we send
            // to backend login endpoint and the backend login endpoint takes the attr name "userName"
            name='userName'
            type='email'
            className='form-control'
            id='email-input'
            placeholder='m@example.com'
            required
          />
        </div>
        <div className='mb-3 wider'>
          <label htmlFor='password-input' className='form-label'>
            Password
          </label>
          <input
            name='password'
            minLength={3}
            type='password'
            className='form-control'
            id='password-input'
            required
          />
        </div>
        {/* This hidden input is to catch an enter-press when user has any of the inputs focused 
        (i.e finished typing its password). If this is not present, when user presses enter the form
        is submitted anyways but user is not redirected, SUPERWEIRD! */}
        <input type='submit' className='d-none' />
        <button className='btn wider' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}
