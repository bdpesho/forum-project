import { ref, push, set, get } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addCommentToThread = async (threadId, content, authorId, authorUsername) => {
  // Create a new reference for the comments collection within the specific thread
  console.log(threadId)
  const commentsRef = ref(db, `threads/${threadId}/comments`);

  // Push a new comment object to the comments collection
  const newCommentRef = push(commentsRef);
  console.log('New comment reference:', newCommentRef.key);
  const commentId = newCommentRef.key;
  console.log('Comment ID:', commentId);

  const commentData = {
    id: commentId,
    content,
    authorId,
    authorUsername,
    createdOn: Date.now(),
  };

  console.log('commentData:', commentData); // Add this line

  // Set the comment data in the new comment reference
  try {
    await set(newCommentRef, commentData);
    console.log('Comment added successfully TO DB ?');
  } catch (error) {
    console.error('Error adding comment:', error);
    throw error;
  }
};


// export const getCommentForThread = (threadID, commentId) => {

//     return get(ref(db, `threads/${threadID}/comments/${commentId}`))
//       .then(result => {
//         if (!result.exists()) {
//           throw new Error(`Comment with id ${commentId} does not exist!`);
//         }
  
//         const comment = result.val();
//         console.log(comment)
//         // comment.id = id;
//         comment.createdOn = new Date(comment.createdOn);
//         if (!comment.likedBy) comment.likedBy = [];
  
//         return comment;
//       });
//   };
