import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err)
          if (err.error.message == 'Missing token' || err.error.message == 'Invalid token') {
            this.router.navigateByUrl('/auth/login');
            console.log(err.error.message);
          } else if (err.error.message == 'Token has expired') {
            alert('session expired');
            this.router.navigateByUrl('/');
            localStorage.clear();
          }
        }
        throw Error;
      })
    );
  }
}
