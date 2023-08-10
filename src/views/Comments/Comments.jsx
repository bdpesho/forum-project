import { useState, useContext } from 'react';
import { addCommentToThread } from '../../services/comments.service';
import { AuthContext } from '../../context/context';

const Comments = ({ threadId }) => {
  const [commentContent, setCommentContent] = useState('');
  const { userData } = useContext(AuthContext);

  const handleCommentSubmit = async () => {
    try {
        
      console.log('userData:', userData); // Add this line
      await addCommentToThread(threadId.id, commentContent, userData.uid, userData.username);
      setCommentContent('');
      console.log('Comment added successfully');
      // You might want to refresh the comments or handle the UI in some way
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };
  
  return (
    <div>
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="Write your comment here..."
      />
      <button onClick={handleCommentSubmit}>Submit Comment</button>
    </div>
  );
};

export default Comments;
