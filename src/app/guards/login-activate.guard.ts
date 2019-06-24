import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate  {
  constructor(private authService: AuthService,
              private router: Router) { }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): Observable<boolean>|Promise<boolean>|boolean {
      const isLoggedIn = this.authService.isLoggedIn();
      if (!isLoggedIn) {
        this.router.navigate(['/login']);
      }
      return isLoggedIn;
    }
}

