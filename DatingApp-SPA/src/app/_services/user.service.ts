import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';

const httpOptions = {
  header: new HttpHeaders({
    Authorization: 'Bearer ' + localStorage.getItem('token')
  })
};

const token = localStorage.getItem('token');
const header = new HttpHeaders({ Authorization: `Bearer ${token}` });
const options = {
       headers: header,
    };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers()
  {
    return this.http.get<User[]>(this.baseUrl + 'user' );
  }

  getUser(id): Observable<User>{
    return this.http.get<User>(this.baseUrl + 'user/' + id );
  }
}
