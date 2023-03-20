import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getDatabase, ref, get, set, remove, query, orderByChild, equalTo } from 'firebase/database';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

type RouteType = {
  route: {
    id: string;
    title: string;
    description?: string;
  };
  citys: number[];
};

export async function getRoutes(): Promise<object[]> {
  return get(ref(database, 'routes')).then((snapshot) => (snapshot.exists() ? Object.values(snapshot.val()) : []));
}

export async function getUserRoutes(userId: string): Promise<object[]> {
  return get(query(ref(database, 'routes'), orderByChild('user_id'), equalTo(userId))).then((snapshot) => (snapshot.exists() ? Object.values(snapshot.val()) : []));
}

export async function addOrUpdateRoute(
  userId: string,
  route: {
    id?: string;
    title: string;
    remark?: string;
  },
  citys: number[]
): Promise<RouteType> {
  const id = route.id ? route.id : uuid();

  set(ref(database, `routes/${id}`), { ...route, user_id: userId, id });
  set(ref(database, `routes/${id}/citys`), { ...citys });
  return null;
}

export async function removeRoute(id: string) {
  console.log('remove', id);
  remove(ref(database, `routes/${id}`));
  return null;
}
