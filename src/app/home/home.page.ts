import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule]
})
export class HomePage {

  constructor(
    private firebase: FirebaseService,
    private router: Router
  ) { }

  async logout() {
    try {
      await this.firebase.logout();

      // 🔑 LABAI SVARBU
      this.router.navigateByUrl('/login', { replaceUrl: true });

      console.log('✅ Atsijungta');
    } catch (err) {
      console.error('❌ Logout error', err);
    }
  }
}
