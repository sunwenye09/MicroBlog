import { useState } from 'react';
import { performLogin } from '../services';
import { errorMessage } from '../utility';

const Login = function ({ onLogin, onSignUp, setStatus }) {

  const [email, setEmail] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);


  const onUserInput = (e) => {
    setEmail(e.target.value.toLowerCase());
    setIsDisabled(!e.target.value);
  };

  const login = () => {
    const inputEmail = email.trim();
    if (!inputEmail) {
      setStatus({ message: errorMessage['EMAIL-REQUIRED'], type: 'error-message' });
      return;
    }
    setIsPending(true);
    performLogin({ email })
      .then(response => {
        setStatus({ message: '', type: '' });
        setIsPending(false);
        onLogin({ username: response.userInfo.username });
      })
      .catch(error => {
        setStatus({ message: errorMessage[error.errorcode], type: 'error-message' });
        setIsPending(false);
      });
  };

  return (
    <div className="login">
      <span>Join MicoroBlog Today</span>
      <input type="email" disabled={isPending} onChange={onUserInput} value={email} placeholder="user@email.com" />
      <button onClick={login} disabled={isDisabled || isPending} className="login-button">{isPending ? "..." : "Log In"}</button>
      <button onClick={onSignUp} className="signup-button">Sign Up</button>
    </div>
  );
};
export default Login;