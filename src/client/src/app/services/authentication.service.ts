import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDto, SignUpDto, TokenDto, User } from '../dataTransferObjects/Auth';
import { BehaviorSubject, Observable, interval, map, switchMap, timer } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private httpClient: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!) || null);
    this.user = this.userSubject.asObservable();
    timer(100).subscribe(() => this.refreshToken());
    interval(13 * 60 * 1000).subscribe(() => this.refreshToken());
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public signIn(signInDto: SignInDto) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<any>('http://localhost:5228/api/auth/signin',
      JSON.stringify(signInDto), { headers })
      .pipe(map(tokenDto => {
        this.refreshUserInfo(tokenDto);
      }))
  };

  public signUp(signUpDto: SignUpDto) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const signInDto = {
      username: signUpDto.username,
      password: signUpDto.password
    };

    return this.httpClient.post<any>('http://localhost:5228/api/auth/signup',
      JSON.stringify(signUpDto), { headers })
      .pipe(switchMap(() => this.signIn(signInDto)));
  }
  
  public refreshToken() {
    const user = this.userValue;

    if(user != null) {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

      this.httpClient.post<any>('http://localhost:5228/api/auth/refresh',
        JSON.stringify(user.tokenDto), {headers})
        .pipe(map(tokenDto => {
          this.refreshUserInfo(tokenDto);
        })).subscribe();
    }
  }

  public logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('/signin');
  }

  private refreshUserInfo(tokenDto: TokenDto) : void {
    const payload = JSON.parse(atob(tokenDto.accessToken.split('.')[1]));
    const user : User = {
      id : payload.id,
      username : payload.username,
      role: payload.role,
      tokenDto
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }
}
