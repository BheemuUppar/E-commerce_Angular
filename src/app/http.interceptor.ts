import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { UserService } from './services/user.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let loaderService  = inject(LoaderService);
    let userService  = inject(UserService);
loaderService.show()
    return next.handle(request).pipe(
      catchError((err: any) => {
      
        if (err instanceof HttpErrorResponse) {
          console.log(err)
          if (err.error.message == 'Missing token' || err.error.message == 'Invalid token') {
            this.router.navigateByUrl('/auth/login');
            console.log(err.error.message);
          } else if (err.error.message == 'Token has expired') {
            alert('session expired');
            userService.auth.next(false)
            this.router.navigateByUrl('/');
            localStorage.clear();
          }
        }
        throw Error;
      }),
      finalize(() => {
        // Hide loader when request is complete (successful or failed)
       loaderService.hide();
      })
    );
  }
}
