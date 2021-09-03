//{userId: [{text, timestamp}]}
const blogs = {
    "peter@gmail.com": [
        {
            text: "Steph Curry is in that awkward phase of his career like Kobe was after his first three rings where he was hooping with guys like Smush Parker and Chris Mihm.",
            upvote: 108,
            downvote: 4,
            timestamp: '11:30:25 03-06-2021'
        },
        {
            text: 'Free agent Ben McLemore has agreed to a deal with the Los Angeles Lakers.',
            upvote: 155,
            downvote: 7,
            timestamp: '09:26:10 03-07-2021'
        },


    ],
    "mark@gmail.com": [
        {
            text: 'A cat called Dusty has the known record for the most kittens. She had more than 420 kittens in her lifetime.',
            upvote: 3,
            downvote: 1,
            timestamp: '18:06:10 04-03-2021'
        },
        {
            text: 'A cat can jump 5 times as high as it is tall.',
            upvote: 34,
            downvote: 17,
            timestamp: '21:06:30 04-04-2021'
        },
    ],
    "paul@gmail.com": [
        {
            text: 'A 2007 Gallup poll revealed that both men and women were equally likely to own a cat.',
            upvote: 76,
            downvote: 4,
            timestamp: '15:00:05 04-01-2021'
        },
        {
            text: 'A cat almost never meows at another cat, mostly just humans. Cats typically will spit, purr, and hiss at other cats.',
            upvote: 6,
            downvote: 9,
            timestamp: '14:07:05 04-03-2021'
        },
    ]
}
const initializeBlog = function (userId) {
    blogs[userId] = [];
}

const getBlogs = function (userId) {
    const userBlogs = blogs[userId];
    for (let blog of userBlogs) {
        blog.text = transformBack(blog.text);
    }
    return userBlogs;
}

const addBlog = function ({ userId, text, timestamp }) {
    text = text.trim();
    if (!text) {
        return { errorcode: 'BLOG-CONTENT-REQUIRED' };
    }
    text = transform(text);
    blogs[userId].push({ text, timestamp, upvote: 0, downvote: 0, });
    return { success: 'The blog was added.' };
}

function transform(blogText) {
    blogText = blogText.replace(/&/g, '&amp');
    blogText = blogText.replace(/>/g, '&gt');
    blogText = blogText.replace(/</g, '&lt');
    blogText = blogText.replace(/=/g, '&eq');
    return blogText;
}

function transformBack(blogText) {
    blogText = blogText.replace(/&amp/g, '&');
    blogText = blogText.replace(/&gt/g, '>');
    blogText = blogText.replace(/&lt/g, '<');
    blogText = blogText.replace(/&eq/g, '=');
    return blogText;
}

const deleteBlog = function ({ userId, index }) {
    const userBlogs = blogs[userId];
    if (index < 0 || index >= userBlogs.length) {
        return { errorcode: 'NO-SUCH-BLOG' };
    }
    userBlogs.splice(index, 1);
    return { success: 'The blog was deleted.' };
}

const updateVotes = function ({ blogId, index, voteType }) {
    if (!Object.keys(blogs).includes(blogId)) {
        return { errorcode: 'NO-SUCH-ACCOUNT' };
    }
    const userBlogs = blogs[blogId];
    if (index < 0 || index >= userBlogs.length) {
        return { errorcode: 'NO-SUCH-BLOG' };
    }
    if (voteType !== 'upvote' && voteType !== 'downvote') {
        return { errorcode: 'VOTE-TYPE-ERROR' };
    }
    userBlogs[index][voteType] += 1;
    return { success: 'The vote was updated.' };
}

const updateBlog = function ({ userId, index, text, timestamp }) {
    const userBlogs = blogs[userId];
    text = text.trim();
    if (index < 0 || index >= userBlogs.length) {
        return { errorcode: 'NO-SUCH-BLOG' };
    }
    if (!text) {
        return { errorcode: 'BLOG-CONTENT-REQUIRED' };
    }
    text = transform(text);
    userBlogs[index].text = text;
    userBlogs[index].timestamp = timestamp;
    return { success: 'The blog was updated.' };
}

module.exports = {
    blogs,
    initializeBlog,
    getBlogs,
    addBlog,
    deleteBlog,
    updateVotes,
    updateBlog,
}