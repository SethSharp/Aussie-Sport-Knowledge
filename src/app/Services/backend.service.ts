import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {
  uri = "http://localhost:4000"
  constructor(private http: HttpClient) { }



  checkUsername(username: String) {
    return this.http.get(`${this.uri}/userExists/${username}`)
  }
  createNewUser(u:String) {
    return this.http.post(`${this.uri}/createUser`, {name:u, password:"123"});
  }
}
