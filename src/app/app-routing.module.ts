import { LoginActivateGuard } from './guards/login-activate.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/auth-forms/login/login.component';
import { SignupComponent } from './pages/auth-forms/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AccountComponent } from './pages/dashboard/account/account.component';
import { OverviewComponent } from './pages/dashboard/overview/overview.component';
import { ClientFormComponent } from './pages/dashboard/create-order/client/client-form/client-form.component';
import { MyOrdersComponent } from './pages/dashboard/my-orders/my-orders.component';
import { ReportsComponent } from './pages/dashboard/reports/reports.component';
import { ContactComponent } from './pages/dashboard/contact/contact.component';
import { ChangePictureComponent } from './pages/dashboard/change-picture/change-picture.component';
import { AllOrdersComponent } from './pages/dashboard/all-orders/all-orders.component';
import { PdfExportComponent } from './pages/pdf-export/pdf-export.component';
import { RoleGuard } from './guards/role.guard';
import { AgentFormComponent } from './pages/dashboard/create-order/agent/agent-form/agent-form.component';
import { CompanyFormComponent } from './pages/dashboard/create-order/company/company-form/company-form.component';
import { OrderReviewComponent } from './pages/dashboard/order-review/order-review.component';
import { CreateAgentComponent } from './pages/dashboard/create-user/create-user.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/dashboard/overview', pathMatch: 'full'
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [LoginActivateGuard], children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      {
        path: 'overview', component: OverviewComponent,
        data: { title: 'Overview' }
      },
      {
        path: 'my-orders', component: MyOrdersComponent,
        data: { title: 'My Orders' }
      },
      {
        path: 'all-orders', component: AllOrdersComponent,
        data: { title: 'All Orders' }
      },
      {
        path: 'client-form', component: ClientFormComponent, canActivate: [RoleGuard],
        data: { roles: ['admin', 'client'], title: 'Create Order' }
      },
      {
        path: 'agent-form', component: AgentFormComponent, canActivate: [RoleGuard],
        data: { roles: ['admin', 'agent'], title: 'Create Order' }
      },
      {
        path: 'company-form', component: CompanyFormComponent, canActivate: [RoleGuard],
        data: { roles: ['admin', 'company'], title: 'Create Order' }
      },
      {
        path: 'reports', component: ReportsComponent, canActivate: [RoleGuard],
        data: { roles: ['admin'], title: 'Admin Reports' }
      },
      {
        path: 'order-review', component: OrderReviewComponent, canActivate: [RoleGuard],
        data: { roles: ['admin', 'agent'], title: 'Order Review' }
      },
      {
        path: 'create-user', component: CreateAgentComponent, canActivate: [RoleGuard],
        data: { roles: ['admin'], title: 'Create User' }
      },
      {
        path: 'contact', component: ContactComponent,
        data: { title: 'Contact' }
      },
      {
        path: 'account', component: AccountComponent,
        data: { title: 'My Account' }
      },
      { path: '**', redirectTo: 'overview', pathMatch: 'full' }
    ]
  },
  {
    path: 'login', component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'signup', component: SignupComponent,
    data: { title: 'Signup' }
  },
  {
    path: 'pdf-export/:awb', component: PdfExportComponent,
    data: { title: 'PDF Export' }
  },
  {
    path: 'change-picture', component: ChangePictureComponent,
    data: { title: 'Change Picture' }
  },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
