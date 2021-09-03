import { useState } from "react";
import { errorMessage } from '../utility';
import { updateBlogVotes } from '../services';

const ShowFriendBlogs = function ({ friendBlogs, username, blogId, setStatus }) {
    const [blogs, setBlogs] = useState(friendBlogs);
    const [start, setStart] = useState(friendBlogs.length);
    const [numPerPage, setNumPerPage] = useState(5);
    const blogList = [];
    const leftIndex = start - numPerPage < 0 ? 0 : start - numPerPage;
    const blogsOnCurrentPage = blogs.slice(leftIndex, start);

    const nextPage = function () {
        setStart(start - numPerPage < 0 ? 0 : start - numPerPage);
    }
    const previousPage = function () {
        setStart(start + numPerPage > blogs.length ? blogs.length : start + numPerPage);
    }
    const onUpdateBlogVotes = function ({ index, voteType }) {
        updateBlogVotes({ index, voteType, blogId })
            .then(response => {
                setBlogs(response.blogs);
            })
            .catch(error => {
                setStatus({ message: errorMessage[error.errorcode], type: 'error-message' });
            });
    }

    const upVote = function (e) {
        const id = parseInt(e.target.dataset.id, 10);
        onUpdateBlogVotes({ index: leftIndex + id, voteType: 'upvote' });
    }
    const downVote = function (e) {
        const id = parseInt(e.target.dataset.id, 10);
        onUpdateBlogVotes({ index: leftIndex + id, voteType: 'downvote' });
    }

    if (blogs.length === 0) {
        return (
            <div>
                Your friend didn't post anything yet.
            </div>
        );
    }

    //the blogs will be displayed in reversed chronological order
    for (let i = blogsOnCurrentPage.length - 1; i >= 0; i--) {
        const blog = blogsOnCurrentPage[i];
        let element =
            <li key={leftIndex + i}>
                <span className="blog-author">{username}</span>
                <span className="blog-text">{blog.text}</span>
                <div className="blog-relevent-info">
                    <span>{blog.timestamp}</span>
                    <button className="up-vote" data-id={i} onClick={upVote}>👍 {blog.upvote}</button>
                    <button className="down-vote" data-id={i} onClick={downVote}>👎 {blog.downvote}</button>
                </div>
            </li>

        blogList.push(element);
    }

    return (
        <div>
            <div className="blogs-per-page">
                <label htmlFor="blog-num">Blogs per page:</label>
                <select id="blog-num" onChange={(e) => setNumPerPage(parseInt(e.target.value))}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
            </div>
            <ul className="blog-list">{blogList}</ul>
            <div className="turn-page-commands">
                <button onClick={previousPage} disabled={start >= blogs.length}>&lt; Previous</button>
                <button onClick={nextPage} disabled={leftIndex <= 0}>Next &gt;</button>
            </div>
        </div>
    );
};

export default ShowFriendBlogs;