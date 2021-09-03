import { useState } from 'react';
import { getStamp, errorMessage } from '../utility';

const ShowBlogs = ({ blogs, username, numPerPage, start, setStart, onDeleteBlog, onUpdateBlog, setStatus }) => {

    const [blogIdInEdition, setBlogIdInEdition] = useState(-1);
    const [blogTextInEdition, setBlogTextInEdition] = useState('');
    const blogList = [];
    const leftIndex = start - numPerPage < 0 ? 0 : start - numPerPage;
    const blogsOnCurrentPage = blogs.slice(leftIndex, start);

    const nextPage = function () {
        setStart(start - numPerPage < 0 ? 0 : start - numPerPage);
    }
    const previousPage = function () {
        setStart(start + numPerPage > blogs.length ? blogs.length : start + numPerPage);
    }
    const deleteBlog = function (e) {
        const id = parseInt(e.target.dataset.id, 10);
        onDeleteBlog(leftIndex + id);
    }
    const editBlog = function (e) {
        const id = parseInt(e.target.dataset.id, 10);
        setBlogIdInEdition(id);
        setBlogTextInEdition(blogsOnCurrentPage[id].text);
    }
    const updateBlog = function (e) {
        const inputText = blogTextInEdition.trim();
        if (!inputText) {
            setStatus({ message: errorMessage['BLOG-CONTENT-REQUIRED'], type: 'error-message' });
            return;
        }
        const id = parseInt(e.target.dataset.id, 10);
        onUpdateBlog({ index: leftIndex + id, text: blogTextInEdition, timestamp: getStamp() });
        setBlogIdInEdition(-1);
    }
    const onUserInput = (e) => {
        setBlogTextInEdition(e.target.value);
    };
    const cancelBlogEdition = function () {
        setBlogIdInEdition(-1);
        setStatus({ message: '', type: '' });
    }

    if (blogs.length === 0) {
        return (
            <div className="normal-message">
                You didn't post anything yet. Start posting now!
            </div>
        );
    }
    //the blogs will be displayed in reversed chronological order
    for (let i = blogsOnCurrentPage.length - 1; i >= 0; i--) {
        const blog = blogsOnCurrentPage[i];
        let blogElement;
        if (i !== blogIdInEdition) {
            blogElement = <li key={leftIndex + i}>
                <span className="blog-author">{username}</span>
                <span className="blog-text">{blog.text}</span>
                <div className="blog-relevent-info">
                    <span>{blog.timestamp}</span>
                    <span>👍 {blog.upvote} </span>
                    <span>👎 {blog.downvote} </span>
                    <button className="edit" data-id={i} onClick={editBlog}>Edit</button>
                    <button className="delete" data-id={i} onClick={deleteBlog}>Delete</button>
                </div>
            </li>
        } else {
            blogElement = <li key={leftIndex + i} className="blog-in-edition">
                <textarea onChange={onUserInput} value={blogTextInEdition} rows="5" cols="20" />
                <div className="commands-for-edition">
                    <button data-id={i} onClick={updateBlog}>Confirm</button>
                    <button onClick={cancelBlogEdition}>Cancel</button>
                </div>
            </li>
        }
        blogList.push(blogElement);
    }

    return (
        <div>
            <ul className="blog-list">{blogList}</ul>
            <div className="turn-page-commands">
                <button onClick={previousPage} disabled={start >= blogs.length}> &lt; Previous</button>
                <button onClick={nextPage} disabled={leftIndex <= 0}>Next &gt;</button>
            </div>
        </div>
    );
};
export default ShowBlogs;
