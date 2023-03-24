import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import { getDatabase, ref, get, set, remove, query, orderByChild, equalTo, serverTimestamp } from 'firebase/database';

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
  userId: string,
  route: {
    id?: string;
    title: string;
    remark?: string;
    major_goods?: string;
  },
  citys: number[]
): Promise<RouteType> {
  const id = route.id ? route.id : uuid();

  const time = route.id == null ? { createdAt: serverTimestamp() } : { updatedAt: serverTimestamp() };

  set(ref(database, `routes/${id}`), { ...route, user_id: userId, id, ...time });
  set(ref(database, `routes/${id}/citys`), { ...citys });
  set(ref(database, `routes/${id}/major_goods`), String(route.major_goods).replaceAll(' ', '').split(','));
  return null;
}

export async function removeRoute(id: string) {
  remove(ref(database, `routes/${id}`));
  return null;
}
