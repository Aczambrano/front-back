import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/account.terface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8080/api/v1';  // Reemplaza con tu URL de backend

  constructor(private http: HttpClient, private authService: AuthService) { }


  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createAccount(accountData: Account): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/accounts`, accountData, { headers: this.getHeaders() });
  }

  getAccount(accountNumber: string): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/accounts/accountNumber/${accountNumber}`, { headers: this.getHeaders() });
  }

  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts/getAll`, { headers: this.getHeaders() });
  }

  updateAccount(accountData: Account): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/update`, accountData, { headers: this.getHeaders() });
  }
}
