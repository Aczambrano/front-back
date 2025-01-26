import { Component, OnInit } from '@angular/core';
import { delay, of, Subscription, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AccountResponse } from '../../../../interfaces/Account.interface';
import { AccountService } from '../../../../services/account.service';
import { ModalComponent } from '../../../general/modal/modal.component';
import { TableComponent } from '../../../general/table/table.component';
import { LoaderComponent } from '../../../general/loader/loader.component';

@Component({
  selector: 'app-account-list',
  imports: [LoaderComponent, TableComponent,ModalComponent],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent implements OnInit {
  accounts: AccountResponse[] = [];
  selectedAccount: string | null = null;
  showModal: boolean = false;
  showLoader: boolean = false;



  private accountUpdatedSubscription?: Subscription;
  constructor(private accountService: AccountService, private router: Router,
  ) {

    this.accountUpdatedSubscription = this.accountService.accountUpdated$.pipe(
      switchMap(() => {
        this.showLoader = true;
        return of(null).pipe(delay(1000));
      })
    )
      .subscribe(() => {
        this.showLoader = false;
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

  showDetails(account: AccountResponse) {
    this.selectedAccount = account.accountNumber;
    this.router.navigate(['/dashboard/account-detail', account.accountNumber]); 
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
