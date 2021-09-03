const express = require('express');
const cookieParser = require('cookie-parser');
const userData = require('./user-data');
const blogData = require('./blog-data');

const app = express();
const PORT = 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.static('./build'));

//check login status
app.get('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ errorcode: 'SESSION-REQUIRED' });
        return;
    }
    if (!userData.isValidSid(sid)) {
        res.status(403).json({ errorcode: 'SESSION-INVALID' });
        return;
    }
    const userId = userData.sessions[sid].email;
    res.json(userData.users[userId]);
});

//perform login
app.post('/api/session', (req, res) => {
    const email = req.body.email;
    const { sid, errorcode } = userData.login({ email });
    if (errorcode) {
        res.status(400).json({ errorcode });
        return;
    }
    res.cookie('sid', sid);
    res.json({ userInfo: userData.users[email] });
});

//perform sign up
app.post('/api/users', (req, res) => {
    const { email, username } = req.body;
    const { success, errorcode } = userData.createAccount({ email, username });
    if (errorcode) {
        res.status(400).json({ errorcode });
        return;
    }
    blogData.initializeBlog(email);
    res.status(200).json({ success });
});

//retrive user blogs
app.get('/api/blogs', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ errorcode: 'SESSION-REQUIRED' });
        return;
    }
    if (!userData.isValidSid(sid)) {
        res.status(403).json({ errorcode: 'SESSION-INVALID' });
        return;
    }

    const userId = userData.getUserId(sid);
    const blogs = blogData.getBlogs(userId);
    res.json({ blogs });
})

//perform log out
app.delete('/api/session', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ errorcode: 'SESSION-REQUIRED' });
        return;
    }
    if (!userData.isValidSid(sid)) {
        res.status(403).json({ errorcode: 'SESSION-INVALID' });
        return;
    }

    userData.logout(sid);
    res.clearCookie('sid');
    res.json({ sid, status: 'removed' });
});

//add blogs
app.post('/api/blogs', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ errorcode: 'SESSION-REQUIRED' });
        return;
    }
    if (!userData.isValidSid(sid)) {
        res.status(403).json({ errorcode: 'SESSION-INVALID' });
        return;
    }
    const { text, timestamp } = req.body;
    const userId = userData.getUserId(sid);
    const { errorcode } = blogData.addBlog({ userId, text, timestamp });
    if (errorcode) {
        res.status(400).json({ errorcode });
        return;
    }
    res.json({ blogs: blogData.getBlogs(userId) });
})

app.delete('/api/blogs', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ errorcode: 'SESSION-REQUIRED' });
        return;
    }
    if (!userData.isValidSid(sid)) {
        res.status(403).json({ errorcode: 'SESSION-INVALID' });
        return;
    }
    const { index } = req.body;
    const userId = userData.getUserId(sid);
    const { errorcode } = blogData.deleteBlog({ userId, index });
    if (errorcode) {
        res.status(400).json({ errorcode });
        return;
    }
    res.json({ blogs: blogData.getBlogs(userId) });
})

//update blogs
app.patch('/api/blogs', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ errorcode: 'SESSION-REQUIRED' });
        return;
    }
    if (!userData.isValidSid(sid)) {
        res.status(403).json({ errorcode: 'SESSION-INVALID' });
        return;
    }
    const { index, text, timestamp } = req.body;
    const userId = userData.getUserId(sid);
    const { errorcode } = blogData.updateBlog({ userId, index, text, timestamp });
    if (errorcode) {
        res.status(400).json({ errorcode });
        return;
    }
    res.json({ blogs: blogData.getBlogs(userId) });
})

//update votes
app.patch('/api/votes', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ errorcode: 'SESSION-REQUIRED' });
        return;
    }
    if (!userData.isValidSid(sid)) {
        res.status(403).json({ errorcode: 'SESSION-INVALID' });
        return;
    }
    const { index, voteType, blogId } = req.body;
    const { errorcode } = blogData.updateVotes({ blogId, index, voteType });
    if (errorcode) {
        res.status(400).json({ errorcode });
        return;
    }
    res.json({ blogs: blogData.getBlogs(blogId) });
})

app.get('/api/friends', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ errorcode: 'SESSION-REQUIRED' });
        return;
    }
    if (!userData.isValidSid(sid)) {
        res.status(403).json({ errorcode: 'SESSION-INVALID' });
        return;
    }

    const friends = userData.getFriends(sid);
    res.json(friends);
})

//read friend blogs
app.get('/api/friendBlogs/:userId', (req, res) => {
    const sid = req.cookies.sid;
    if (!sid) {
        res.status(401).json({ errorcode: 'SESSION-REQUIRED' });
        return;
    }
    if (!userData.isValidSid(sid)) {
        res.status(403).json({ errorcode: 'SESSION-INVALID' });
        return;
    }
    const userId = req.params.userId;
    if (!userId) {
        res.status(400).json({ errorcode: 'FRIEND-ID-REQUIRED' });
        return;
    }
    if (!userData.isValidUserId(userId)) {
        res.status(400).json({ errorcode: 'NO-SUCH-FRIEND' });
        return;
    }
    const blogs = blogData.getBlogs(userId);
    res.json({ blogs, username: userData.users[userId].username, blogId: userId });
})

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});