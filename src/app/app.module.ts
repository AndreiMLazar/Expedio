import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FooterComponent } from './pages/footer/footer.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { LoginComponent } from './pages/auth-forms/login/login.component';
import { SignupComponent } from './pages/auth-forms/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    OverviewComponent,
    LoginComponent,
    SignupComponent
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
