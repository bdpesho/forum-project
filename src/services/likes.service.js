import { ref, update, get } from 'firebase/database'; // query, equalTo, orderByChild,
import { db } from '../config/firebase-config';
import { getUserData } from './users.service';
import { getThreadById } from './threads.service';


export const toggleLike = async (threadId, userID) => {
  console.log("THREAD START")
  console.log(threadId);
  console.log("THREAD END")
  // console.log(userID);
  // const thId = threadId.id

  try {
    // const threadId = threadId.id
    const threadRef = ref(db, `threads/${threadId}`);
    const threadSnapshot = await get(threadRef);
    
    if (!threadSnapshot.exists()) {
      throw new Error(`Thread with id ${threadId} does not exist!`);
    }
    
    const threadData = threadSnapshot.val();
    
    if (!threadData.likedBy) threadData.likedBy = [];
    
    const userLikedIndex = threadData.likedBy.indexOf(userID);
    console.log(userLikedIndex);
    
    if (userLikedIndex === -1) {
      // User has not liked the post, so add the like
      threadData.likedBy.push(userID);
      threadData.likesCount++;
    } else {
      // User has already liked the post, so remove the like
      threadData.likedBy.splice(userLikedIndex, 1);
      threadData.likesCount--;
    }
    
    const updates = {};
    updates[`/threads/${threadId}/likedBy`] = threadData.likedBy;
    updates[`/threads/${threadId}/likesCount`] = threadData.likesCount;
    
    await update(ref(db), updates);
    
    // Update user's likes count
    const userSnapshot = await getUserData(userID);
    const userStatistics = userSnapshot.val()[Object.keys(userSnapshot.val())[0]].statistics;
    const userName = userSnapshot.val()[Object.keys(userSnapshot.val())[0]].username;
    
    const updateUserLikes = {};
    updateUserLikes[`/users/${userName}/statistics/likes`] = userStatistics.likes + (userLikedIndex === -1 ? 1 : 0);
    
    await update(ref(db), updateUserLikes);
    
    return getThreadById(threadId);
  } catch (error) {
    console.error('Error toggling like:', error);
    throw error;
  }
};




