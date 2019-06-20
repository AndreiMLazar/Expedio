
import { filter, map, mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './services/auth.service';
import { appAnimation } from './animations/app-animation';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [appAnimation]
})
export class AppComponent implements OnInit {
  clientHeight: number;

  constructor(private swUpdate: SwUpdate,
              private authService: AuthService,
              private titleService: Title,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.clientHeight = window.innerHeight;
  }

  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New version available for the Expedio App. Do you want to update?')) {
          window.location.reload();
        }
      });
    }

    this.authService.autoAuthUser();

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map((route) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter((route) => route.outlet === 'primary'),
      mergeMap((route) => route.data))
      .subscribe((event) => this.titleService.setTitle('Expedio | ' + event.title));
  }
}

