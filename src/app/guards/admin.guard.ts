import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { FirebaseService } from '../services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) { }

  async canActivate(): Promise<boolean> {
    return new Promise((resolve) => {

      const auth = getAuth();

      const unsubscribe = onAuthStateChanged(auth, async (user: User | null) => {
        unsubscribe();

        // ❌ Neprisijungęs
        if (!user) {
          this.router.navigateByUrl('/admin-login');
          resolve(false);
          return;
        }

        // 🔍 Tikriname rolę
        const role = await this.firebase.getUserRole(user.uid);

        if (role === 'admin') {
          resolve(true);
        } else {
          await this.firebase.logout();
          this.router.navigateByUrl('/login');
          resolve(false);
        }
      });
    });
  }
}
