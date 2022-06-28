import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';

import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
