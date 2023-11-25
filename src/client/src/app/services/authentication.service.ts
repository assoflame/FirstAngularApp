import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDto, SignUpDto } from '../DataTransferObjects/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  signIn(signInDto: SignInDto): {

  }

  signUp(signUpDto: SignUpDto): {
    
  }
}
