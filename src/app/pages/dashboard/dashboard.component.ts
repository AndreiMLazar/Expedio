import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { environment as env } from '../../../environments/environment';
import { dashboardAnimation } from 'src/app/animations/dashboard-animation';
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


  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.userIsAuthenticated = this.authService.isLoggedIn();
    this.authListenerSubs = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
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
