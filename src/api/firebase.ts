import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { v4 as uuid } from 'uuid';
import { getDatabase, ref, get, set, remove, query, orderByChild, equalTo, serverTimestamp } from 'firebase/database';

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

export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      return user;
    })
    .catch(console.error);
}

export async function logout() {
  return signOut(auth).then(() => null);
}

export function onUserStateChange(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins'))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
    })
    .catch(console.error);
}

export async function getCitys() {
  return get(ref(database, 'citys')).then((snapshot) => (snapshot.exists() ? Object.values(snapshot.val()) : []));
}

export async function getGoods(city) {
  return get(query(ref(database, 'goods'), orderByChild('city_id'), equalTo(city))).then((snapshot) => (snapshot.exists() ? Object.values(snapshot.val()) : []));
}

type RouteType = {
  route: {
    id: string;
    title: string;
    description?: string;
  };
  citys: number[];
};

export async function getRoutes(): Promise<object[]> {
  return get(query(ref(database, 'routes'), orderByChild('createdAt'))).then((snapshot) => {
    const routes = [];

    snapshot.forEach((childSnapShot) => {
      routes.push(childSnapShot.val());
    });

    return routes.reverse();
  });
}

type RouteType2 = {
  id?: string;
  user_id?: string;
  title?: string;
  description?: string;
  citys?: number[];
  major_goods?: string[];
  major_chk?: boolean;
};

export async function getRoute(id: string): Promise<RouteType2> {
  return get(query(ref(database, 'routes'), orderByChild('id'), equalTo(id))).then((snapshot) => (snapshot.exists() ? Object.values(snapshot.val())[0] : {}));
}

export async function addOrUpdateRoute(
  user_id: string,
  route: {
    id?: string;
    major_goods?: string;
  },
  country: string,
  region: string,
  startMonth: number,
  endMonth: number,
  citys?: number[]
): Promise<RouteType> {
  const id = route.id ? route.id : uuid();

  console.log(route);

  const time = route.id == null ? { createdAt: serverTimestamp() } : { updatedAt: serverTimestamp() };

  set(ref(database, `routes/${id}`), { ...route, ...time, user_id, id, country, region, startMonth, endMonth });
  set(ref(database, `routes/${id}/citys`), citys);

  set(
    ref(database, `routes/${id}/major_goods`),
    String(route.major_goods || [])
      .replaceAll(' ', '')
      .split(',')
  );
  return null;
}

export async function removeRoute(id: string) {
  remove(ref(database, `routes/${id}`));
  return null;
}
