//check log in status
export const checkLoginStatus = () => {
  return fetch('/api/session', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
};

//perfrom login
export const performLogin = ({ email }) => {
  return fetch('/api/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ email }),
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
};

//perform sign up
export const performSignUp = ({ email, username }) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ email, username }),
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
};

//perform logout
export const performLogout = () => {
  return fetch('/api/session', {
    method: 'DELETE',
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
};

//retrieve messages and active users
export const getBlogs = () => {
  return fetch('/api/blogs', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
}

//perform add message
export const addBlog = ({ text, timestamp }) => {
  return fetch('/api/blogs', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ text, timestamp }),
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
};

export const deleteBlog = (index) => {
  return fetch('/api/blogs', {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ index }),
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
};

export const updateBlog = ({ index, text, timestamp }) => {
  return fetch('/api/blogs', {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ index, text, timestamp }),
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
};

export const updateBlogVotes = ({ index, voteType, blogId }) => {
  return fetch('/api/votes', {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify({ index, voteType, blogId }),
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
};

//retrieve friends
export const getFriends = () => {
  return fetch('/api/friends', {
    method: 'GET',
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
}

export const getFriendBlogs = (userId) => {
  return fetch(`/api/friendBlogs/${userId}`, {
    method: 'GET',
  })
    .catch(() => Promise.reject({ errorcode: 'NETWORK-ERROR' }))
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then(json => Promise.reject(json));
    });
}