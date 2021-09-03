import { useState } from "react";
import { addBlog } from '../services';
import { errorMessage, getStamp } from '../utility';

const CreateBlog = function ({ setStatus, onSend }) {
    const [text, setText] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPending, setIsPending] = useState(false);

    const onUserInput = (e) => {
        setText(e.target.value);
        setIsDisabled(!e.target.value);
    };
    const send = () => {
        const inputText = text.trim();
        if (!inputText) {
            setStatus({ message: errorMessage['BLOG-CONTENT-REQUIRED'], type: 'error-message' });
            return;
        }
        setIsPending(true);
        const timestamp = getStamp();
        addBlog({ text, timestamp })
            .then(response => {
                setText('');
                setStatus({ message: '', type: '' });
                setIsPending(false);
                setIsDisabled(true);
                onSend(response.blogs);
            })
            .catch(error => {
                setStatus({ message: errorMessage[error.errorcode], type: 'error-message' });
                setIsPending(false);
            });
    }


    return (
        <div className="create-blog">
            <textarea disabled={isPending} onChange={onUserInput} value={text} placeholder="Enter message here" rows="5" cols="20" />
            <button onClick={send} disabled={isDisabled || isPending} >{isPending ? "..." : "Post"}</button>
        </div>
    );
};

export default CreateBlog;