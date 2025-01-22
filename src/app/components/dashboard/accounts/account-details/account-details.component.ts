import { Component, Input, SimpleChanges } from '@angular/core';
import { TransactionModalComponent } from "../../modals/transaction-modal/transaction-modal.component";
import { AccountModalComponent } from "../../modals/account-modal/account-modal.component";
import { AccountResponse } from '../../../../interfaces/Account.interface';
import { TransactionResponse } from '../../../../interfaces/transaction.interface';
import { AccountService } from '../../../../services/account.service';
import { TransactionService } from '../../../../services/transaction.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-account-details',
  imports: [TransactionModalComponent, AccountModalComponent, DatePipe],
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent {
  @Input() accountNumber: string | null = null;
    account: AccountResponse | null = null;
    transactions: TransactionResponse[] = [];
    showTransactionModal: boolean = false;
    showUpdateModal: boolean = false;

    constructor(private accountService: AccountService, private transactionService: TransactionService) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['accountNumber'] && this.accountNumber) {
            this.loadAccountDetails();
            this.loadTransactions();
        }
    }

    loadAccountDetails() {
      this.accountService.getAccount(this.accountNumber!).subscribe({
         next: (account) => {
          console.log(account+ "accounts")
           this.account = account;
         },
          error: (error) => {
              console.error('Error loading account details:', error);
        }
      })
    }

    loadTransactions() {
        this.transactionService.getTransactions(this.accountNumber!).subscribe({
            next: (transactions) => {
                this.transactions = transactions;
            },
            error: (error) => {
                console.error('Error loading transactions:', error);
            }
        });
    }
    openTransactionModal(){
      this.showTransactionModal = true;
    }
    closeTransactionModal(){
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
