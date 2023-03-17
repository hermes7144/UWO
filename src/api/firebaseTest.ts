import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, query, orderByChild, equalTo, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

type RouteType = {
  routeNm: string;
  citys: number[];
};

export async function addOrUpdateRoute(userId: string, routeNm: string, city: number[]): Promise<RouteType> {
  const id = uuid();
  set(ref(database, `routes/${userId}/${id}`), { id, routeNm, city });
  return null;
}
