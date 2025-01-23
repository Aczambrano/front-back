import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AccountResponse } from '../../../interfaces/Account.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { TransactionResponse } from '../../../interfaces/transaction.interface';

@Component({
  selector: 'app-account-detail',
  imports: [],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss'
})
export class AccountDetailComponent  implements OnInit , OnDestroy{
  accountNumber: string | null = null;
    account: AccountResponse | null = null;
    transactions: TransactionResponse[] = [];
    currentPage = 1;
    itemsPerPage = 6; // Display 6 cards per page
    displayedTransactions: TransactionResponse[] = [];
    totalPages: number = 1;
    constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.accountNumber = params['accountNumber'];
            if(this.accountNumber){
                this.loadAccountDetails()
            }else {
                this.router.navigate(['/dashboard/accounts']);
            }
        });
    }
    ngOnDestroy(): void {
    }
    loadAccountDetails() {
        if (this.accountNumber) {
            this.accountService.getAccount(this.accountNumber).subscribe({
                next: (accountResponse) => {
                    this.account = accountResponse;
                    // Mock invoice data for example
                    this.transactions = this.generateMockTransactions(15);
                    this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
                    this.updateDisplayedTransactions();
                },
                error: (error) => {
                    console.error('Error loading account details:', error);
                }
            });
        }
    }
    generateMockTransactions(count: number): TransactionResponse[] {
        const transactions: TransactionResponse[] = [];
        for (let i = 1; i <= count; i++) {
            transactions.push({
                transactionId: `TXN${i}`,
                accountId: this.accountNumber || 'N/A',
                transactionCost: (Math.random() * 5).toFixed(2),
                amount: Math.floor(Math.random() * 100),
                date: `January ${20 + i}, 2025`,
                transactionType: (i % 2 === 0) ? "credit" : "debit"
            });
        }
        return transactions;
    }

    updateDisplayedTransactions() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        this.displayedTransactions = this.transactions.slice(startIndex, startIndex + this.itemsPerPage);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updateDisplayedTransactions();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updateDisplayedTransactions();
        }
    }


}
