import { ref, push, get, set, update, query, orderByChild, limitToLast } from 'firebase/database'; // query, equalTo, orderByChild,
import { db } from '../config/firebase-config';
import { getUserData } from './users.service';


export const getThreadById = (id) => {
    console.log(id)
    return get(ref(db, `threads/${id}`))
      .then(result => {
        if (!result.exists()) {
          throw new Error(`Post with id ${id} does not exist!`);
        }
  
        const post = result.val();
        post.id = id;
        post.createdOn = new Date(post.createdOn);
        if (!post.likedBy) post.likedBy = [];
  
        return post;
      });
  };

export const addThread = async (
    content,
    authorID,
    authorUserName,
    title,
    // section,
    // subsection
  ) => {
    try {
      const threadRef = ref(db, 'threads');
      const newThreadRef = push(threadRef);
      const newThreadKey = newThreadRef.key;
  
      const threadData = {
        title: title,
        body: content,
        authorID: authorID,
        authorUserName: authorUserName,
        createdOn: Date.now(),
        // section: section,
        // subsection: subsection,
        modifiedOn: 0,
        likesCount: 0,
        id: newThreadKey, // Adding the thread's key as an id property
      };
  
      await set(newThreadRef, threadData);
  
      // Update user's threads and statistics
      
      const userSnapshot = await getUserData(authorID);
      console.log('userSnapshot:', userSnapshot.val());

      const userName = userSnapshot.val()[Object.keys(userSnapshot.val())[0]].username;
    
      const userKey = Object.keys(userSnapshot.val())[0];
      // console.log('userKey:', userKey); // Log the userKey

      const userData = userSnapshot.val()[userKey];
      console.log('userData:', userData); // Log the userData

      const userStatistics = userSnapshot.val()[Object.keys(userSnapshot.val())[0]].statistics;
      // console.log('userStatistics:', userStatistics);
  
      const updateUserThreads = {};
      updateUserThreads[`/users/${userName}/threads/${newThreadKey}`] = true;
      updateUserThreads[`/users/${userName}/statistics/threads`] = userStatistics.threads + 1;
      
      await update(ref(db), updateUserThreads);

      return getThreadById(newThreadKey); // Assuming getThreadById returns a promise
    } catch (error) {
      console.error('Error adding thread:', error);
      throw error;
    }
  };

  export const getAllThreads = async () => {
    const threadsRef = ref(db, 'threads');
    const threadsQuery = query(threadsRef, orderByChild('createdOn'), limitToLast(5)); // Adjust the query as needed
  
    const snapshot = await get(threadsQuery);
    const threads = [];
  
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const thread = childSnapshot.val();
        threads.push(thread);
      });
    }
  
    return threads;
  };