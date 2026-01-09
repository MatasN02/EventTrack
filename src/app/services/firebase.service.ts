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

  app: FirebaseApp;
  auth: Auth;
  db: Firestore;

  constructor() {
    // ✅ Firebase inicializuojamas tik vieną kartą
    this.app = initializeApp(firebaseConfig);
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }

  // 🔐 Prisijungimas
  login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  // 🚪 Atsijungimas
  logout(): Promise<void> {
    return signOut(this.auth);
  }

  // 🔍 Gauti naudotojo rolę
  async getUserRole(uid: string): Promise<string | null> {
    try {
      const ref = doc(this.db, 'users', uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        return null;
      }

      return snap.data()['role'] ?? null;

    } catch (error) {
      console.error('Klaida gaunant naudotojo rolę:', error);
      return null;
    }
  }
}
