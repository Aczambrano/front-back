import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../interfaces/account.terface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8080/api/v1';  // Reemplaza con tu URL de backend

  constructor(private http: HttpClient) { }

  createAccount(accountData: Account): Observable<Account> {
      return this.http.post<Account>(`${this.apiUrl}/accounts`, accountData);
  }

  getAccount(accountNumber: string): Observable<Account> {
      return this.http.get<Account>(`${this.apiUrl}/accounts/accountNumber${accountNumber}`);
  }
  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts/getAll`);
  }
   updateAccount(accountData: Account): Observable<Account> {
      return this.http.put<Account>(`${this.apiUrl}/update`, accountData);
  }
}
