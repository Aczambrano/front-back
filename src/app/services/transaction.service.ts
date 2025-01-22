import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../interfaces/transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8080/api/v1';  // Reemplaza con tu URL de backend

  constructor(private http: HttpClient) { }

  getTransactions(accountNumber: string): Observable<Transaction[]> {
      return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/accountNumber${accountNumber}`);
  }
  createDeposit(transactionData: Transaction): Observable<Transaction> {
      return this.http.post<Transaction>(`${this.apiUrl}/transactions/deposit`, transactionData);
  }
  createWithdrawal(transactionData: Transaction): Observable<Transaction> {
      return this.http.post<Transaction>(`${this.apiUrl}/transactions/withdrawal`, transactionData);
  }
}
