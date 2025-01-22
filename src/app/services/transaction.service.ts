import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8080/api/v1'; 

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getTransactions(accountNumber: string): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(`${this.apiUrl}/transactions/accountNumber${accountNumber}`, { headers: this.getHeaders() });
  }

  createDeposit(transactionData: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions/deposit`, transactionData, { headers: this.getHeaders() });
  }

  createWithdrawal(transactionData: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(`${this.apiUrl}/transactions/withdrawal`, transactionData, { headers: this.getHeaders() });
  }
}
