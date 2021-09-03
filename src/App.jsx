import './App.css';
import { useState, useEffect, useReducer } from 'react';
import { performLogout, checkLoginStatus, getFriends, getFriendBlogs } from './services';
import Navigation from './components/Navigation';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ShowHomePage from './components/ShowHomePage';
import { errorMessage, reducer } from './utility';
import ShowFriends from './components/ShowFriends';
import ShowFriendBlogs from './components/ShowFriendBlogs';

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    {
      content: '',
      userState: {
        isLoggedIn: false,
        isPending: false,
        username: '',
      }
    }
  );
  const [status, setStatus] = useState({ message: '', type: '' });

  useEffect(() => {
    checkLoginStatus()
      .then(userinfo => {
        dispatch({
          type: 'updateUserState',
          userState: {
            ...state.userState,
            isLoggedIn: true,
            username: userinfo.username,
          }
        });
        dispatch({
          type: 'changeContent',
          content: <ShowHomePage username={userinfo.username} setStatus={setStatus} />,
        });
        setStatus({ message: '', type: '' });
      })
      .catch(error => {
        dispatch({
          type: 'updateUserState',
          userState: {
            ...state.userState,
            isLoggedIn: false,
            username: '',
          }
        });
        dispatch({
          type: 'changeContent',
          content: <Login onLogin={onLogin} onSignUp={onSignUp} setStatus={setStatus} />,
        });
      });
  }, []);

  const onLogin = function ({ username }) {
    dispatch({
      type: 'updateUserState',
      userState: {
        ...state.userState,
        isLoggedIn: true,
        username,
      }
    });
    dispatch({
      type: 'changeContent',
      content: <ShowHomePage username={username} setStatus={setStatus} />,
    });
    setStatus({ message: '', type: '' });
  };

  const onSignUp = function () {
    dispatch({
      type: 'changeContent',
      content: <SignUp afterSignUp={afterSignUp} setStatus={setStatus} />,
    });
    setStatus({ message: '', type: '' });
  }

  const afterSignUp = function () {
    dispatch({
      type: 'changeContent',
      content: <Login onLogin={onLogin} onSignUp={onSignUp} setStatus={setStatus} />,
    });
    setStatus({ message: 'Sign up completed. Please log in', type: 'normal-message' });
  }

  const onLogout = function () {
    setStatus({ message: '', type: '' });
    performLogout()
      .then(() => {
        dispatch({
          type: 'updateUserState',
          userState: {
            isLoggedIn: false,
            isPending: false,
            username: '',
          }
        });
        dispatch({
          type: 'changeContent',
          content: <Login onLogin={onLogin} onSignUp={onSignUp} setStatus={setStatus} />,
        });
      })
      .catch(error => {
        setStatus(errorMessage[error.errorcode]);
      });
  };

  const browseFriends = function () {
    getFriends()
      .then(friends => {
        dispatch({
          type: 'changeContent',
          content: <ShowFriends friends={friends} onBrowseFriendBlogs={onBrowseFriendBlogs} />,
        });
      })
      .catch(error => {
        setStatus({ message: errorMessage[error.errorcode], type: 'error-message' });
      });
  }

  const onBrowseFriendBlogs = function (userId) {
    getFriendBlogs(userId)
      .then(data => {
        dispatch({
          type: 'updateUserState',
          userState: {
            ...state.userState,
            isPending: false,
          }
        });
        dispatch({
          type: 'changeContent',
          content: <ShowFriendBlogs friendBlogs={data.blogs} username={data.username} blogId={data.blogId} setStatus={setStatus} />,
        });
      })
      .catch(error => {
        setStatus({ message: errorMessage[error.errorcode], type: 'error-message' });
      });
  }

  const gohome = function () {
    dispatch({
      type: 'changeContent',
      content: <ShowHomePage username={state.userState.username} setStatus={setStatus} />,
    });
  }

  if (state.userState.isPending) {
    return (
      <div className="app">
        Loading...
      </div>
    );
  }

  return (
    <div className="app">
      <h1>MicroBlog</h1>
      {state.userState.isLoggedIn && <Navigation onLogout={onLogout} gohome={gohome} browseFriends={browseFriends} />}
      { status.message && <div className={status.type}>{status.message}</div>}
      {state.content}
    </div>
  );
}

export default App;
