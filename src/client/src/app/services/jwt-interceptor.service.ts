import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Observable, catchError, map, pipe, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService : AuthenticationService, private httpClient : HttpClient) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.userValue;
    const isApiUrl = request.url.startsWith("http://localhost:5228");
    
    if(user != null && isApiUrl) {
      request = request.clone({
        setHeaders: {Authorization: `Bearer ${user.tokenDto.accessToken}`}
      })
    }

    return next.handle(request);
  }
}
