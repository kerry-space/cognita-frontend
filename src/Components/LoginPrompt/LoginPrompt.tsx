import React, { useState } from 'react';
import './LoginPrompt.css';

export function LoginPrompt() {
  const [isInvalidCreds, setIsInvalidCreds] = useState(false);
  const onSubmit: React.FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formDetails = Object.fromEntries(formData) as {
      email: string;
      password: string;
    };
    console.log(formDetails);
    //TODO
    // Send email and password to backend for validation and navigate to home if success.

    //If incorrect credentials
    setIsInvalidCreds(true);
  };

  return (
    <div className='card login-card'>
      <div className='login-card-header'>Cognita Learning</div>
      <p className='prompt'>Enter your email and password to login</p>
      {isInvalidCreds ? (
        <div className='invalid-container'>
          <p className='invalid-info'>Invalid credentials</p>
        </div>
      ) : null}
      <form onSubmit={onSubmit}>
        <div className='mb-3 wider'>
          <label htmlFor='email-input' className='form-label login-form-label'>
            Email
          </label>
          <input
            name='email'
            type='email'
            className='form-control login-form'
            id='email-input'
            placeholder='m@example.com'
            required
          />
        </div>
        <div className='mb-3 wider'>
          <label
            htmlFor='password-input'
            className='form-label login-form-label'>
            Password
          </label>
          <input
            name='password'
            minLength={3}
            type='password'
            className='form-control login-form'
            id='password-input'
            required
          />
        </div>

        <button className='login-btn wider' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}
