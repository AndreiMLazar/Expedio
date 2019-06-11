import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './services/auth.service';
import { appAnimation } from './animations/app-animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [appAnimation]
})
export class AppComponent implements OnInit {
  clientHeight: number;

  constructor(private swUpdate: SwUpdate, private authService: AuthService) {
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
  }
}

