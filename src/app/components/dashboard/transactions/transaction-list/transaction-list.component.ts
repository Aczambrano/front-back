import { Component } from '@angular/core';
import { Transaction } from '../../../../interfaces/transaction.interface';
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
  transactions: Transaction[] = [];
  selectedAccountNumber: string = '';
  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.filterTransactions();
  }
  filterTransactions() {
    this.transactionService.getTransactions(this.selectedAccountNumber).subscribe({
      next: (transactions) => {
        this.transactions = transactions;
      },
      error: (error) => {
        console.error('Error loading transactions:', error);
      }
    })
  }
} 
