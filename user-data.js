const uuid = require('uuid').v4;

const users = {
    "peter@gmail.com": {
        email: "peter@gmail.com",
        username: "Peter",
        followings: {               //people that I followed
            "paul@gmail.com": {
                email: "paul@gmail.com",
                username: "Paul",
            },
            "mark@gmail.com": {
                email: "mark@gmail.com",
                username: "Mark",
            },
        }
    },
    "mark@gmail.com": {
        email: "mark@gmail.com",
        username: "Mark",
        followings: {
            "paul@gmail.com": {
                email: "paul@gmail.com",
                username: "Paul",
            },
            "peter@gmail.com": {
                email: "peter@gmail.com",
                username: "Peter",
            }
        }
    },
    "paul@gmail.com": {
        email: "paul@gmail.com",
        username: "Paul",
        followings: {
            "peter@gmail.com": {
                email: "peter@gmail.com",
                username: "Peter",
            },
            "mark@gmail.com": {
                email: "mark@gmail.com",
                username: "Mark",
            },
        }
    },
};

//{sid: {sid, email}}
const sessions = {};

const login = function ({ email }) {
    const error = validateEmail(email);
    if (error) {
        return error;
    }
    if (!Object.keys(users).includes(email)) {
        return { errorcode: 'NO-SUCH-ACCOUNT' };
    }

    // create session data, link to user
    const sid = uuid();
    sessions[sid] = {
        sid,
        email,
    };
    return { sid };
};

//perform sign up
const createAccount = function ({ email, username }) {
    const emailError = validateEmail(email);
    if (emailError) {
        return emailError;
    }
    const userNameError = validateUserName(username);
    if (userNameError) {
        return userNameError;
    }
    if (Object.keys(users).includes(email)) {
        return { errorcode: 'EMAIL-REGISTERED' };
    }
    //initialize user data
    users[email] = { email, username, followings: {} };
    return { success: 'Account was created.' };
};

const logout = function (sid) {
    delete sessions[sid];
};

const getUserId = function (sid) {
    return sessions[sid].email;
}

const isValidSid = function (sid) {
    return !!sessions[sid];
};

const getFriends = function (sid) {
    const userId = getUserId(sid);
    return users[userId].followings;
}

const validateEmail = function (email) {
    email = email.trim();
    if (!email) {
        return { errorcode: 'EMAIL-REQUIRED' };
    }
    if (!email.includes('@')) {
        return { errorcode: 'EMAIL-INVALID' };
    }
    const cleanEmail = email.replace(/[^a-zA-Z0-9_.@\-]/g, '');
    if (email !== cleanEmail) {
        return { errorcode: 'EMAIL-INVALID' };
    }
}

const validateUserName = function (username) {
    username = username.trim();
    if (!username) {
        return { errorcode: 'USERNAME-REQUIRED' };
    }
    if (username.toLowerCase() === "dog") {
        return { errorcode: 'USERNAME-INVALID' };
    }
    const cleanUsername = username.replace(/[^a-zA-Z0-9 _\-]/g, '');
    if (username !== cleanUsername) {
        return { errorcode: 'USERNAME-INVALID' };
    }
}

const isValidUserId = function (userId) {
    return Object.keys(users).includes(userId);
}

module.exports = {
    users,
    sessions,
    login,
    createAccount,
    getUserId,
    logout,
    isValidSid,
    getFriends,
    isValidUserId,
};