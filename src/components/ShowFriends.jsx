const ShowFriends = function ({ friends, onBrowseFriendBlogs }) {
    const browseFriendBlogs = function (e) {
        const userId = e.target.dataset.id;
        onBrowseFriendBlogs(userId);
    }

    const friendList = Object.values(friends).map(friend => {
        return <li key={friend.email}>
            <a href="#friend-blogs" onClick={browseFriendBlogs} data-id={friend.email}>{friend.username}</a>
        </li>
    });

    if (friendList.length === 0) {
        return (
            <div className="normal-message">
                You did not follow anyone yet.
            </div>
        );
    }
    return (
        <ul className="friend-list">{friendList}</ul>
    );
};

export default ShowFriends;