export const errorMessage = {
    'SESSION-REQUIRED': 'Please login first.',
    'SESSION-INVALID': 'Your login information is invalid. Refresh your page and try again.',
    'USERNAME-REQUIRED': 'The username cannot be empty.',
    'USERNAME-INVALID': 'The username is invalid. A valid username can only contain English letters, numbers, and underscore. In addition, "Dog" is not a valid name.',
    'NETWORK-ERROR': 'There was a problem reaching your network, please try again.',
    'EMAIL-REQUIRED': 'The email field cannot be empty.',
    'EMAIL-REGISTERED': 'This email was registered. Please log in with this email or sign up with another email.',
    'NO-SUCH-ACCOUNT': 'The account does not exist.',
    'EMAIL-INVALID': 'Please provide a valid email.',
    'BLOG-CONTENT-REQUIRED': 'The blog content cannot be empty.',
    'NO-SUCH-BLOG': 'The blog you are trying to modify does not exist.',
    'VOTE-TYPE-ERROR': 'The vote type is incorrect. The allowable vote types are: upvote, downvote.',
    'FRIEND-ID-REQUIRED': 'The user ID of your friend is required.',
    'NO-SUCH-FRIEND': 'The friend you are trying to access does not exist.',
}

export const getStamp = () => {
    const date_obj = new Date();
    const year = date_obj.getFullYear();
    const month = ('0' + (date_obj.getMonth() + 1)).slice(-2);
    const date = ('0' + date_obj.getDate()).slice(-2);
    const hours = ('0' + date_obj.getHours()).slice(-2);
    const minutes = ('0' + date_obj.getMinutes()).slice(-2);
    const seconds = ('0' + date_obj.getSeconds()).slice(-2);

    return (hours + ':' + minutes + ':' + seconds + ' ' + month + '-' + date + '-' + year);
}

export const reducer = function (state, action) {
    state = { ...state, content: action.content };
    switch (action.type) {
        case 'changeContent':
            return state;
        case 'updateUserState':
            return { ...state, userState: action.userState };
        default:
            return state;
    }
}

