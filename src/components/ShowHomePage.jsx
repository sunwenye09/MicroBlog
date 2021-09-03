
import ShowBlogs from './ShowBlogs';
import CreateBlog from './CreateBlog';
import { getBlogs, deleteBlog, updateBlog } from '../services';
import { useState, useEffect } from "react";
import { errorMessage } from '../utility';

const ShowHomePage = ({ username, setStatus }) => {
  const [blogs, setBlogs] = useState([]);
  const [start, setStart] = useState(0);
  const [numPerPage, setNumPerPage] = useState(5);

  useEffect(() => {
    getBlogs()
      .then(response => {
        setBlogs(response.blogs);
        setStart(response.blogs.length);
      })
      .catch(error => {
        setStatus({ message: errorMessage[error.errorcode], type: 'error-message' });
      });
  }, []);

  const onSend = function (newBlogs) {
    setBlogs(newBlogs);
    setStart(newBlogs.length);
  };

  const onDeleteBlog = function (index) {
    deleteBlog(index)
      .then(response => {
        setBlogs(response.blogs);
        if (start > response.blogs.length || start === 0) {
          setStart(response.blogs.length);
        } else {
          setStart(start - 1);
        }
      })
      .catch(error => {
        setStatus({ message: errorMessage[error.errorcode], type: 'error-message' });
      });
  }
  const onUpdateBlog = function ({ index, text, timestamp }) {
    updateBlog({ index, text, timestamp })
      .then(response => {
        setBlogs(response.blogs);
      })
      .catch(error => {
        setStatus({ message: errorMessage[error.errorcode], type: 'error-message' });
      });
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
      <ShowBlogs blogs={blogs} username={username} numPerPage={numPerPage} start={start} setStart={setStart}
        onDeleteBlog={onDeleteBlog} onUpdateBlog={onUpdateBlog} setStatus={setStatus} />
      <CreateBlog author={username} onSend={onSend} setStatus={setStatus} />
    </div>
  );
};
export default ShowHomePage;