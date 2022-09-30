import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService, private router: Router) {
  }


  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (req.url.startsWith(environment.baseUrl)) {
      if (!this.authService.tokenExpiredSync()) {
        this.authService.navigateSessionExpired();
        return next.handle(req);
      } else {
        const accessToken = this.authService.getAccessToken();
        req = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }
}
