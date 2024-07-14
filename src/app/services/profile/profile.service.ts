import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, of, tap } from 'rxjs';
import { UserInfo } from '../../interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private readonly authServiceUrl = 'http://127.0.0.1:3000';
  private headers: HttpHeaders;
  private cache: Map<string, UserInfo> = new Map();

  constructor(private http: HttpClient, private authService: AuthService) {
    const authToken = this.authService.getToken();
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
  }

  getUserInfo(update: boolean = false, user_id: string = 'self'): Observable<UserInfo> {
    if (!update && this.cache.has(user_id)){
      return of(this.cache.get(user_id)!);
    }
    return this.http.get<UserInfo>(`${this.authServiceUrl}/api/user/info`, { headers: this.headers }).pipe(
      tap((response: UserInfo) => {
        this.cache.set(user_id, response)
      })
    );
  }

  getFriendInfo(id: string = "", email: string = ""): Observable<UserInfo> {
    if (this.cache.has(id)){
      return of(this.cache.get(id)!);
    } else if (this.cache.has(email)) {
      return of(this.cache.get(email)!);
    }
    return this.http.get<UserInfo>(`${this.authServiceUrl}/api/user/user_info`, { headers: this.headers, params: {id, email} }).pipe(
      tap((response: UserInfo) => {
        if (id == "") this.cache.set(email, response)
        else this.cache.set(id, response);
      })
    );;
  }
}
