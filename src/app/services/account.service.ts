import { HttpClient,  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AccountRequest, AccountResponse } from '../interfaces/Account.interface';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl = 'http://localhost:8080/api/v1'; 

  private accountUpdatedSource = new Subject<AccountResponse[]>();

  accountUpdated$ = this.accountUpdatedSource.asObservable();


  constructor(private http: HttpClient, private authService: AuthService) { }

  createAccount(accountData: AccountRequest): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(`${this.apiUrl}/accounts/create`, accountData);
  }

  getAccount(accountNumber: string): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(`${this.apiUrl}/accounts/accountNumber`, { accountNumber });
  }

  getAllAccounts(): Observable<AccountResponse[]> {
    return this.http.get<AccountResponse[]>(`${this.apiUrl}/accounts/getAll`);
  }

  updateAccount(accountData: AccountRequest): Observable<AccountResponse> {
    return this.http.post<AccountResponse>(`${this.apiUrl}/accounts/update`, accountData);
  }

  notifyAccountUpdated(): void {
    this.getAllAccounts().subscribe(accounts => {
      this.accountUpdatedSource.next(accounts);
    });
  }
  
}