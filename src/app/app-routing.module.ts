import { LoginActivateGuard } from './guards/login-activate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth-forms/login/login.component';
import { SignupComponent } from './pages/auth-forms/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/dashboard/account/account.component';
import { OverviewComponent } from './pages/dashboard/overview/overview.component';
import { ClientFormComponent } from './pages/dashboard/client-form/client-form.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [LoginActivateGuard], children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'account', component: AccountComponent },
      { path: 'overview', component: OverviewComponent },
      { path: 'client-form', component: ClientFormComponent },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
