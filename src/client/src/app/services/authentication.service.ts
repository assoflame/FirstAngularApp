import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDto, SignUpDto, User } from '../dataTransferObjects/Auth';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;

  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('user')!) || null);
    this.user = this.userSubject.asObservable();
  }

  public signIn(signInDto: SignInDto) {
    return this.httpClient.post<any>('http://localhost:5228/api/auth/signin',
      JSON.stringify(signInDto))
      .pipe(map(user => {
        if(!user['token']) {
          this.userSubject.next(null);
        } else {
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
        }
      }))   // {withCredentials: true} ?
  };

  public signUp(signUpDto: SignUpDto) {

  }
}
