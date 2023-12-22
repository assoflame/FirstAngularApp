import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { User } from '../dataTransferObjects/Auth';
import { Observable } from 'rxjs';
import { UserUpdateDto } from '../dataTransferObjects/UserUpdateDto';
import { MeetData } from '../dataTransferObjects/MeetData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient,
    private authService: AuthenticationService) { }

  public getUsers() : Observable<User[]> {
    const headers = new HttpHeaders({"Content-Type" : "application/json"});

    return this.httpClient.get<User[]>("http://localhost:5228/api/users", {headers});
  }

  public getUser(id : number) : Observable<User> {
    const headers = new HttpHeaders({"Content-Type" : "application/json"});
    
    return this.httpClient.get<User>(`http://localhost:5228/api/users/${id}`, {headers});
  }

  public updateUser(userId: number, userUpdateDto : UserUpdateDto) : Observable<any> {
    const headers = new HttpHeaders({"Content-Type" : "application/json"});

    return this.httpClient.put<any>(`http://localhost:5228/api/users/${userId}`,
      JSON.stringify(userUpdateDto), {headers});
  }

  public getStatistics() : Observable<Array<MeetData>> {
    const headers = new HttpHeaders({"Content-Type" : "application/json"});

    return this.httpClient.get<any>(`http://localhost:5228/api/meets`, {headers});
  }
}
