import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { catchError, observeOn } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: import('@angular/common/http').HttpRequest<any>,
    next: import('@angular/common/http').HttpHandler
  ): import('rxjs').Observable<import('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        // if (error.status === 401) {
        //   return throwError(error);
        // }
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('application-error');
          if (applicationError) {
            throwError(applicationError);
          }

          const serverError = error.error;
          let modalStateError = '';
          if (serverError && typeof serverError !== 'object') {
            modalStateError = serverError;
          }
          if (serverError && typeof serverError === 'object') {
            if (serverError.status === 401) {
              modalStateError = serverError.title;
            }
          }

          if (serverError.errors && typeof serverError.errors === 'object') {
            modalStateError = '';
            for (const key in serverError.errors) {
              if (serverError.errors[key]) {
                modalStateError += serverError.errors[key] + '\n';
              }
            }
          }
          return throwError(
            modalStateError || applicationError || 'Unexpected Server error'
          );
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
