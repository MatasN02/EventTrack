import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule   // 🔥 LABAI SVARBU
  ]
})
export class LoginPage {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.router.navigateByUrl('/home');
      })
      .catch(err => {
        alert(err.message);
      });
  }
}
