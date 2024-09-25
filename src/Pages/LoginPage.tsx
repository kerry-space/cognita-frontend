import { LoginPrompt } from '../Components';
import './LoginPage.css';

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
