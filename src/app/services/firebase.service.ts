import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth';
import {
  getFirestore,
  Firestore,
  doc,
  getDoc
} from 'firebase/firestore';

import { firebaseConfig } from '../../environments/firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  private app: FirebaseApp;
  private auth: Auth;
  private db: Firestore;

  constructor() {
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  // ✅ PRIDĖTI ŠITĄ
  getDb(): Firestore {
    return this.db;
  }

  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout(): Promise<void> {
    return signOut(this.auth);
  }

  async getUserRole(uid: string): Promise<string | null> {
    const ref = doc(this.db, 'users', uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data()['role'] ?? null : null;
  }

}
