import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginPage } from './pages/login/login.page';
import { RegisterPage } from './pages/register/register.page';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: LoginPage
  },

  {
    path: 'register',
    component: RegisterPage
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then(m => m.HomePage)
  },

  // ✅ EVENTS per MODULE
  {
    path: 'events',
    loadComponent: () =>
      import('./pages/events/events.page')
        .then(m => m.EventsPage)
  },

  {
    path: 'admin-login',
    loadComponent: () =>
      import('./pages/admin-login/admin-login.page')
        .then(m => m.AdminLoginPage)
  },

  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadComponent: () =>
      import('./pages/admin/admin.page')
        .then(m => m.AdminPage)
  },

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
