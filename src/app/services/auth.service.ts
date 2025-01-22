import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/v1';  
    private tokenKey = 'authToken';
    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/user/authenticate`, credentials);
    }
  
    register(userData: any): Observable<any> {
      return this.http.post(`${this.apiUrl}/user/create`, userData);
    }
    
    setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }
    
    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
    
    removeToken(): void {
      localStorage.removeItem(this.tokenKey)
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }
}
