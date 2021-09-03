import { useState } from 'react';
import { performSignUp } from '../services';
import { errorMessage } from '../utility';

const SignUp = function ({ afterSignUp, setStatus }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPending, setIsPending] = useState(false);

    const onUserInput = (e) => {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        }
        if (e.target.name === 'email') {
            setEmail(e.target.value);
        }
        setIsDisabled(!username || !email);
    };

    const signUp = () => {
        const inputEmail = email.trim();
        const inputUserName = username.trim();
        if (!inputEmail) {
            setStatus({ message: errorMessage['EMAIL-REQUIRED'], type: 'error-message' });
            return;
        }
        if (!inputUserName) {
            setStatus({ message: errorMessage['USERNAME-REQUIRED'], type: 'error-message' });
            return;
        }
        setIsPending(true);
        performSignUp({ email, username })
            .then(() => {
                setStatus({ message: '', type: '' });
                setIsPending(false);
                afterSignUp();
            })
            .catch(error => {
                setStatus({ message: errorMessage[error.errorcode], type: 'error-message' });
                setIsPending(false);
            });
    };

    return (
        <div className="signup">
            <span>Sign up to join MicoroBlog</span>
            <input type="text" disabled={isPending} onChange={onUserInput} name="username" value={username} placeholder="username" />
            <input type="email" disabled={isPending} onChange={onUserInput} name="email" value={email} placeholder="user@email.com" />
            <button onClick={signUp} disabled={isDisabled || isPending} className="signup-button">{isPending ? "..." : "Sign Up"}</button>
        </div>
    );
};

export default SignUp;