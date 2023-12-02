import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDto, SignUpDto, User } from '../dataTransferObjects/Auth';
import { BehaviorSubject, Observable, catchError, first, map, switchMap } from 'rxjs';
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

  public signIn(signInDto: SignInDto) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.httpClient.post<any>('http://localhost:5228/api/auth/signin',
      JSON.stringify(signInDto), { headers })
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        console.log(localStorage['user']);
        this.userSubject.next(user);
      }))   // {withCredentials: true} ?
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
}
