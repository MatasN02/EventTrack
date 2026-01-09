import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [

  // 🔹 Pradinis puslapis
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  // 🔹 Naudotojo prisijungimas
  {
    path: 'login',
    component: LoginPage
  },

  // 🔹 Naudotojo registracija
  {
    path: 'register',
    component: RegisterPage
  },

  // 🔹 Naudotojo pagrindinis langas
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage)
  },

  // 🔹 Kamera / nuotraukų darymas
  {
    path: 'scan',
    loadComponent: () =>
      import('./pages/scan/scan.page').then(m => m.ScanPage)
  },

  // 🔹 ADMIN prisijungimas
  {
    path: 'admin-login',
    loadComponent: () =>
      import('./pages/admin-login/admin-login.page')
        .then(m => m.AdminLoginPage)
  },

  // 🔹 ADMIN panelė (APSAUGOTA GUARD)
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./pages/admin/admin.page')
        .then(m => m.AdminPage)
  },

  // 🔹 Netinkamas adresas
  {
    path: '**',
    redirectTo: 'login'
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
