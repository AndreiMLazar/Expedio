import { ChangePictureComponent } from './change-picture/change-picture.component';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment as env } from '../../../environments/environment';
import { dashboardAnimation } from 'src/app/animations/dashboard-animation';
import { MatDialog } from '@angular/material';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [dashboardAnimation]
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  state = 'none';
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  public env = env.imagesURL + 'avatars/';


  constructor(public authService: AuthService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.isLoggedIn();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  openChangePicture(): void {
    this.dialog.open(ChangePictureComponent, {
      width: 'auto',
      data: { userId: this.authService.currentUser.userId }
    });
  }

  ngAfterViewInit() {
    this.state = 'maximum';
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
