import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { TransactionRequest, TransactionResponse } from '../interfaces/Transaction.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'http://localhost:8080/api/v1';

  private transactionCreatedSource = new Subject<TransactionResponse[]>();

  transactionCreatedSource$ = this.transactionCreatedSource.asObservable();


  constructor(private http: HttpClient, private authService: AuthService) { }

  getTransactions(accountNumber: string): Observable<TransactionResponse[]> {
    return this.http.post<TransactionResponse[]>(`${this.apiUrl}/transactions/accountNumber`, { accountNumber });
  }

  createDeposit(transactionData: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.apiUrl}/transactions/deposit`, transactionData);
  }

  createWithdrawal(transactionData: TransactionRequest): Observable<TransactionResponse> {
    return this.http.post<TransactionResponse>(`${this.apiUrl}/transactions/withdrawal`, transactionData);
  }

  notifyTransactionCreated(accountNumber:string): void {
    this.getTransactions(accountNumber).subscribe(transactions => {
      this.transactionCreatedSource.next(transactions);
    });
  }
}