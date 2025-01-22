import { Component } from '@angular/core';
import { TransactionResponse } from '../../../../interfaces/transaction.interface';
import { TransactionService } from '../../../../services/transaction.service';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transaction-list',
  imports: [FormsModule, DatePipe],
  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss'
})
export class TransactionListComponent {
  transactions: TransactionResponse[] = [];
  selectedAccountNumber: string = '';


  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.filterTransactions();
  }


  filterTransactions() {
    if (this.selectedAccountNumber) {
      this.transactionService.getTransactions(this.selectedAccountNumber).subscribe({
        next: (transactionResponses) => {
          if (transactionResponses && transactionResponses.length > 0) {
            this.transactions = Array.isArray(transactionResponses[0])
              ? transactionResponses[0]
              : transactionResponses;
          } else {
            this.transactions = [];
          }
        },
        error: (error) => {
          console.error('Error loading transactions:', error);
        }
      });
    } else {
      this.transactions = [];
    }
  }
} 
