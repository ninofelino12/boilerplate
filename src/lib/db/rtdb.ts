import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase, ref, set, update, remove, onValue, off, query, orderByChild, limitToLast, Query } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const database = getDatabase(app);

// Write data to RTDB
export const writeToDB = async (path: string, data: any) => {
  const dbRef = ref(database, path);
  await set(dbRef, data);
  return { success: true, path };
};

// Update data in RTDB
export const updateDB = async (path: string, data: any) => {
  const dbRef = ref(database, path);
  await update(dbRef, data);
  return { success: true, path };
};

// Delete data from RTDB
export const deleteFromDB = async (path: string) => {
  const dbRef = ref(database, path);
  await remove(dbRef);
  return { success: true, path };
};

// Subscribe to real-time updates
export const subscribeToDB = (
  path: string,
  callback: (data: any) => void,
  options?: { orderBy?: string; limit?: number }
) => {
  let dbQuery: Query = ref(database, path);
  
  if (options?.orderBy) {
    dbQuery = query(dbQuery, orderByChild(options.orderBy));
  }
  
  if (options?.limit) {
    dbQuery = query(dbQuery, limitToLast(options.limit));
  }

  const unsubscribe = onValue(dbQuery, (snapshot) => {
    const data = snapshot.val();
    callback(data || null);
  });

  // Return unsubscribe function
  return () => off(dbQuery, 'value', unsubscribe);
};

// Get data once (no subscription)
export const getFromDB = async (path: string) => {
  return new Promise((resolve, reject) => {
    const dbRef = ref(database, path);
    onValue(dbRef, (snapshot) => {
      resolve(snapshot.val() || null);
    }, { onlyOnce: true });
  });
};

export { database };
export default app;
