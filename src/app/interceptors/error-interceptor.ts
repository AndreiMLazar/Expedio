import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { ErrorService } from '../services/error.service';
import { ErrorComponent } from '../pages/error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorService: ErrorService, private snackBar: MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error.message) {
          errorMessage = error.error.message;
        }
        this.snackBar.openFromComponent(ErrorComponent, { data: { message: errorMessage }, duration: 3000 });
        return throwError(error);
      })
    );
  }
}
