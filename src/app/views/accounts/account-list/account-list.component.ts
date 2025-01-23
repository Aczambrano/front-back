import { Component, OnInit } from '@angular/core';
import { AccountModalComponent } from "../../modals/account-modal/account-modal.component";
import { delay, of, Subscription, switchMap } from 'rxjs';
import { AccountService } from '../../../services/account.service';
import { AccountResponse } from '../../../interfaces/Account.interface';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-account-list',
  imports: [AccountModalComponent],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent implements OnInit {
  accounts: AccountResponse[] = [];
  selectedAccount: string | null = null;
  showModal: boolean = false;
  private accountUpdatedSubscription?: Subscription;
  constructor(private accountService: AccountService, private router: Router) {

    this.accountUpdatedSubscription = this.accountService.accountUpdated$.pipe(
      switchMap(() => of(null).pipe(delay(1000)))
    ).subscribe(() => {
      this.loadAccounts();
    });
  }

  ngOnInit(): void {
    this.loadAccounts();
  }

  ngOnDestroy(): void {
    if (this.accountUpdatedSubscription) {
      this.accountUpdatedSubscription.unsubscribe();
    }
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }


  showDetails(accountNumber: string) {
    this.selectedAccount = accountNumber;
    this.router.navigate(['/dashboard/account-detail'], { queryParams: { accountNumber: accountNumber } });
  }

  openCreateModal() {
    this.selectedAccount = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.loadAccounts();
    this.selectedAccount = null
  }
}
