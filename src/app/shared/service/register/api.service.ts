import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterUser } from 'src/app/models/register.model';
import { LoginResponse, ResponseUser } from 'src/app/models/response.model';
import { Response } from 'src/app/models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  private base = environment.apiUrl;

  register(user:RegisterUser): Observable<Response<LoginResponse>> {
    console.log(this.base)
    return this.http.post<Response<LoginResponse>>(`${this.base}/manager/register`, user);
  }


  login(login:string): Observable<Response<ResponseUser>> {
    return this.http.get<Response<ResponseUser>>(`${this.base}/manager/login/${login}`)
  }
}
