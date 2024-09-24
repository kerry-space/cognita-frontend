import React from 'react';
import './LoginPage.css';
import { LoginPrompt } from '../Components/LoginPrompt';

export function LoginPage() {
  return (
    <section
      className={
        'vh-100 d-flex justify-content-center align-items-center login-page'
      }>
      <LoginPrompt />
    </section>
  );
}
