import { getDatabase, ref, set, get } from 'firebase/database';

const db = getDatabase();

export const getUserProfile = async (userId) => {
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  return snapshot.val();
};

export const updateUserProfile = (userId, profile) => {
  const userRef = ref(db, `users/${userId}`);
  return set(userRef, profile);
};
