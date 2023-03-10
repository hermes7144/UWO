import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, query, orderByChild, equalTo } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user
    }).catch(console.error)
}

export async function logout() {
  return signOut(auth).then(() => null)
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  })
}

async function adminUser(user) {
  return get(ref(database, 'admins'))
    .then(snapshot => {
      if (snapshot.exists())
      {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin }
      }
    }).catch(console.error)
}

export async function getCitys() {
  return get(ref(database, 'citys'))
    .then(snapshot => {
      if (snapshot.exists())
      {
        return Object.values(snapshot.val());
      }
      return [];
    })
}

export async function getGoods(city) {
  if (!city) return;
  const temp = query(ref(database, 'goods'), orderByChild('city_nm'), equalTo(city));
  return get(temp)
    .then(snapshot => {
      if (snapshot.exists())
      {
        return Object.values(snapshot.val());
      }
      return [];
    })
}
