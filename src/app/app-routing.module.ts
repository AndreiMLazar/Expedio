import { LoginActivateGuard } from './guards/login-activate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth-forms/login/login.component';
import { SignupComponent } from './pages/auth-forms/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/dashboard/account/account.component';
import { OverviewComponent } from './pages/dashboard/overview/overview.component';
import { ClientFormComponent } from './pages/dashboard/client-form/client-form.component';
import { MyCommandsComponent } from './pages/dashboard/my-commands/my-commands.component';
import { ReportsComponent } from './pages/dashboard/reports/reports.component';
import { ContactComponent } from './pages/dashboard/contact/contact.component';
import { ChangePictureComponent } from './pages/dashboard/change-picture/change-picture.component';
import { AllCommandsComponent } from './pages/dashboard/all-commands/all-commands.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [LoginActivateGuard], children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'my-commands', component: MyCommandsComponent },
      { path: 'all-commands', component: AllCommandsComponent },
      { path: 'client-form', component: ClientFormComponent },
      { path: 'reports', component: ReportsComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'account', component: AccountComponent },
      { path: 'change-picture', component: ChangePictureComponent },
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
