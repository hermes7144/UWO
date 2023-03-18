import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getDatabase, ref, get, set, remove } from 'firebase/database';

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

export async function getRoutes(userId: string): Promise<object[]> {
  return get(ref(database, `routes/${userId}`)).then((snapshot) => (snapshot.exists() ? Object.values(snapshot.val()) : []));
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

  set(ref(database, `routes/${userId}/${id}`), { ...route, id });
  set(ref(database, `routes/${userId}/${id}/citys`), { ...citys });
  return null;
}

export async function removeRoute(userId: string, id: string) {
  console.log('삭제', id);
  remove(ref(database, `routes/${userId}/${id}`));
  return null;
}
