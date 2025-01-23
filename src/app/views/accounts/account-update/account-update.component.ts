import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { TransactionModalComponent } from "../../modals/transaction-modal/transaction-modal.component";
import { AccountModalComponent } from "../../modals/account-modal/account-modal.component";
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountResponse } from '../../../interfaces/Account.interface';
import { AccountService } from '../../../services/account.service';
import { TransactionService } from '../../../services/transaction.service';
import { TransactionResponse } from '../../../interfaces/transaction.interface';


@Component({
  selector: 'app-account-update',
  imports: [TransactionModalComponent, AccountModalComponent, DatePipe, ReactiveFormsModule],
  templateUrl: './account-update.component.html',
  styleUrl: './account-update.component.scss'
})
export class AccountDetailsComponent implements OnChanges, OnDestroy {
  @Input() accountNumber: string | null = null;
  accountForm: FormGroup;
  account: AccountResponse | null = null;
  transactions: TransactionResponse[] = [];
  showTransactionModal: boolean = false;
  showUpdateModal: boolean = false;
  private accountUpdatedSubscription?: Subscription;

  constructor(private accountService: AccountService, private transactionService: TransactionService, private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      accountNumber: ['', Validators.required],
      owner: ['', Validators.required],
      balance: [{ value: '', disabled: true }],
      customerId: [{ value: '', disabled: true }]
    })
  }
  ngOnDestroy(): void {
    if (this.accountUpdatedSubscription) {
      this.accountUpdatedSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountNumber'] && this.accountNumber) {
      this.loadAccountDetails();
      this.loadTransactions();
    }
  }

  loadAccountDetails() {
    this.accountService.getAccount(this.accountNumber!).subscribe({
      next: (accountResponse) => {
        this.account = accountResponse
        this.accountForm.patchValue({
          accountNumber: this.account.accountNumber,
          owner: this.account.owner,
          balance: this.account.balance,
          customerId: this.account.customerId
        })
      },
      error: (error) => {
        console.error('Error loading account details:', error);
      }
    })
    this.accountUpdatedSubscription = this.accountService.accountUpdated$.subscribe(() => {
      this.loadAccountDetails();
    })
  }

  loadTransactions() {
    this.transactionService.getTransactions(this.accountNumber!).subscribe({
      next: (transactionResponses) => {
        this.transactions = transactionResponses.map(transactionResponse => transactionResponse);
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    });
  }
  openTransactionModal() {
    this.showTransactionModal = true;
  }
  closeTransactionModal() {
    this.showTransactionModal = false;
    this.loadTransactions();
  }
  openUpdateModal() {
    this.showUpdateModal = true
  }
  closeUpdateModal() {
    this.showUpdateModal = false;
    this.loadAccountDetails();
  }
}