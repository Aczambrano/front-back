import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TransactionService } from '../../../services/transaction.service';
import { TransactionRequest } from '../../../interfaces/transaction.interface';
import { TransactionType } from '../../../interfaces/transaction-type.enum';

@Component({
  selector: 'app-transaction-form',
  imports: [FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {
  @Input() accountNumber: string | null = null;
  @Output() close = new EventEmitter<void>();
  errorMessage: string | null = null;
  
  selectedType = TransactionType.ATM_DEPOSIT;
  transactionOptions = [
    { value: TransactionType.BRANCH_DEPOSIT, label: 'Depósito en Sucursal' },
    { value: TransactionType.ATM_DEPOSIT, label: 'Depósito en Cajero Automático' },
    { value: TransactionType.OTHER_ACCOUNT_DEPOSIT, label: 'Depósito a Otra Cuenta' },
    { value: TransactionType.PHYSICAL_PURCHASE, label: 'Compra Física' },
    { value: TransactionType.ONLINE_PURCHASE, label: 'Compra en Línea' },
    { value: TransactionType.ATM_WITHDRAWAL, label: 'Retiro en Cajero Automático' },
];


  transactionData: TransactionRequest = {
    accountNumber: '',
    amount: 0,
    transactionType: ''
  };

  constructor(private transactionService: TransactionService) { 
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    if (changes['accountNumber']) {
      if (this.accountNumber) {
        this.transactionData = {
          accountNumber: this.accountNumber,
          amount: 0,
          transactionType: ''
        };
        this.errorMessage = null;
      }
    }
  }
  submitForm() {
    if (this.transactionData.transactionType === (TransactionType.ATM_DEPOSIT || TransactionType.BRANCH_DEPOSIT || TransactionType.OTHER_ACCOUNT_DEPOSIT)) {
      this.makeDeposit();
    } else {
      this.makeWithdrawal();
    }
  }

  makeDeposit() {
    this.transactionService.createDeposit(this.transactionData).subscribe({
      next: () => {
        this.transactionService.notifyTransactionCreated(this.transactionData.accountNumber);
        this.close.emit()
        
      },
      error: (error) => {
        this.errorMessage = 'Error al realizar el deposito';
        console.error('Error making deposit:', error);
      }
    })
  }

  makeWithdrawal() {
    this.transactionService.createWithdrawal(this.transactionData).subscribe({
      next: () => {
        this.transactionService.notifyTransactionCreated(this.transactionData.accountNumber);

        this.close.emit()
      },
      error: (error) => {
        this.errorMessage = 'Error al realizar el retiro'
        console.error('Error making withdraw:', error)
      }
    });
  }
}