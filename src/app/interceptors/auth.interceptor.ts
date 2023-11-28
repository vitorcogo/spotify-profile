import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { TokenData } from "../models/spotify/token-data.interface";
import { AuthHelper } from "../helpers/auth.helper";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  // TODO: Debuggar interceptor para quando houver erro de autenticação (token expirado)

  constructor(private inject: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => this.handleError(error, req, next))
    );
  }

  private handleError(
    error: HttpErrorResponse,
    req: HttpRequest<any>, 
    next: HttpHandler): Observable<any> {
    const authService = this.inject.get(AuthService);

    if (error && error.status === 401) {
      authService.refreshToken().subscribe({
        next: (reponse: TokenData) => {
          AuthHelper.clearTokenLocalStorage();
          AuthHelper.setTokenDataLocalStorage(reponse);
          
          return next.handle(req);
        },
        error: (err: any) => {
          return throwError(() => err);
        }
      });
    }
    return throwError(() => error);
  }
}
