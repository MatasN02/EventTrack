import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    RouterModule   // 🔥 LABAI SVARBU
  ]
})
export class RegisterPage {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  register() {
    this.authService.register(this.email, this.password)
      .then(() => {
        alert('Registracija sėkminga');
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        alert(err.message);
      });
  }
}
