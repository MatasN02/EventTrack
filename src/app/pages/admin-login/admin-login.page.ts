import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
  imports: [IonicModule, FormsModule, CommonModule]
})
export class AdminLoginPage {

  email: string = '';
  password: string = '';

  loading = false;

  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) { }

  async login() {

    // 🔎 Paprasta validacija
    if (!this.email || !this.password) {
      alert('Įveskite el. paštą ir slaptažodį');
      return;
    }

    this.loading = true;

    try {
      // 🔐 Firebase login
      const cred = await this.firebase.login(this.email, this.password);
      const uid = cred.user.uid;

      // 🔍 Tikrinam rolę
      const role = await this.firebase.getUserRole(uid);

      if (role === 'admin') {
        // ✅ ADMIN
        this.router.navigateByUrl('/admin', { replaceUrl: true });
      } else {
        // ❌ NE ADMIN
        alert('Neturite administratoriaus teisių');
        await this.firebase.logout();
      }

    } catch (error: any) {
      console.error('Admin login klaida:', error);
      alert(error?.message || 'Prisijungimo klaida');
    } finally {
      this.loading = false;
    }
  }
}
