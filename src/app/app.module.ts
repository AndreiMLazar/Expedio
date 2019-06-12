import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './pages/footer/footer.component';
import { OverviewComponent } from './pages/dashboard/overview/overview.component';
import { LoginComponent } from './pages/auth-forms/login/login.component';
import { SignupComponent } from './pages/auth-forms/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ErrorComponent } from './pages/error/error.component';
import { ErrorInterceptor } from './interceptors/error-interceptor';
import { AccountComponent } from './pages/dashboard/account/account.component';
import { ClientFormComponent } from './pages/dashboard/client-form/client-form.component';
import { MyCommandsComponent } from './pages/dashboard/my-commands/my-commands.component';
import { ContactComponent } from './pages/dashboard/contact/contact.component';
import { ReportsComponent } from './pages/dashboard/reports/reports.component';
import { ChangePictureComponent } from './pages/dashboard/change-picture/change-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    OverviewComponent,
    LoginComponent,
    SignupComponent,
    ErrorComponent,
    AccountComponent,
    ClientFormComponent,
    MyCommandsComponent,
    ContactComponent,
    ReportsComponent,
    ChangePictureComponent
  ],
  imports: [
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: true })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
