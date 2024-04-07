// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { ErrorResponse, GenericResponse, LoginUser, LoginUserResponse, RegisterUser } from '../../auth.interface';
import { SnackbarService } from '../snackbar/snackbar.service';
import { Router } from '@angular/router';
import { LOCAL_STORAGE_KEYS } from '../../../helper/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = 'http://127.0.0.1:3000/api/user';

  constructor(private http: HttpClient, private snackbarService: SnackbarService, private router: Router) {}

  register(data: RegisterUser): Observable<GenericResponse> {
    return this.http.post<GenericResponse>(this.apiUrl+'/register', data).pipe(
      map((response: GenericResponse) => {
        
        this.snackbarService.open(response.message);
        this.login({
          email: data.email,
          password: data.password
        })
        return response as GenericResponse;
        
      }),
      catchError((error: any) => {
        const msg: ErrorResponse = error.error;
        this.snackbarService.open(msg.error);
        return throwError(msg.error);

      })
    );
  }

  login(credentials: LoginUser): Observable<LoginUserResponse> {
    return this.http.post<LoginUserResponse>(this.apiUrl+'/login', credentials).pipe(
      map((response: LoginUserResponse) => {
        
        this.snackbarService.open("Logged in successfully!");
        this.setToken(response.token);
        this.router.navigate(['/home']);
        return response as LoginUserResponse;
        
      }),
      catchError((error: any) => {
        const msg: ErrorResponse = error.error;
        this.snackbarService.open(msg.error);
        return throwError(msg.error);

      })
    );
  }

  logout(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

    if (!token) {
        return false;
    }

    const decodedToken = JSON.parse(atob(token.split('.')[1]));

    const currentTimestamp = Math.floor(Date.now() / 1000); 
    if (decodedToken.exp && currentTimestamp > decodedToken.exp) {
        localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
        return false;
    }

    return true;
}

  getToken(): string | null {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
  }

  setToken(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, token);
  }
}
