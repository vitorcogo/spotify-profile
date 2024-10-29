import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { TokenData } from "../models/spotify/token-data.interface";
import { AuthHelper } from "../helpers/auth.helper";
import { Router } from "@angular/router";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private inject: Injector,
    private router: Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const request = this.returnRequestWithAccessToken(req);

    return next.handle(request).pipe(
      catchError(error => this.handleError(error, request, next))
    );
  }

  private handleError(
    error: HttpErrorResponse,
    req: HttpRequest<any>, 
    next: HttpHandler): Observable<any> {
    const authService = this.inject.get(AuthService);
    if (error && error.status === 401) {
      authService.getRefreshToken().subscribe({
        next: (reponse: TokenData) => {
          AuthHelper.clearTokenLocalStorage();
          AuthHelper.setTokenDataLocalStorage(reponse);
          
          return next.handle(req);
        },
        error: (err: any) => {
          AuthHelper.clearTokenLocalStorage();
          this.router.navigate(['login']);
          
          return throwError(() => err);
        }
      });
    }
    return throwError(() => error);
  }

  private returnRequestWithAccessToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = AuthHelper.getAccessToken();
    const requestWithToken = req.clone({
      headers: req.headers.set('Authorization', token ? `Bearer ${token}` : '')
    })

    return requestWithToken;
  }
}
