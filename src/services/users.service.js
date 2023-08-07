import { get, set, ref, query, equalTo, orderByChild } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getUserByHandle = (username) => {

  return get(ref(db, `users/${username}`));
};

// export const createUserHandle = (username, uid, email, firstName, lastName) => {

//   return set(ref(db, `users/${username}`), { username, uid, email, firstName, lastName})
// };

export const createUserHandle = (username, uid, email, firstName, lastName) => {
  const userData = {
    username,
    uid,
    email,
    firstName,
    lastName,
    statistics: {
      threads: 0,
      comments: 0
      // Add other initial statistics fields as needed
    }
  };

  return set(ref(db, `users/${username}`), userData);
};


export const getUserData = (uid) => {

  return get(query(ref(db, 'users'), orderByChild('uid'), equalTo(uid)));
};