import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDto, SignUpDto, TokenDto, User } from '../dataTransferObjects/Auth';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
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
  }

  public get userValue() {
    return this.userSubject.value;
  }

  public signIn(signInDto: SignInDto) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<any>('http://localhost:5228/api/auth/signin',
      JSON.stringify(signInDto), { headers })
      .pipe(map(tokenDto => {
        const user = this.getUserInfo(tokenDto);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage['user']);
        this.userSubject.next(user);
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

  public logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigateByUrl('/signin');
  }

  private getUserInfo(tokenDto: TokenDto) : User {
    const payload = JSON.parse(atob(tokenDto.accessToken.split('.')[1]));
    console.log(payload);
    const user : User = {
      id : payload.Id,
      username : payload.Username,
      role: payload.Role,
      accessToken: tokenDto.accessToken,
      refreshToken: tokenDto.refreshToken
    }

    return user;
  }
}
