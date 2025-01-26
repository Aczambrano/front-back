import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TransactionService } from '../../../services/transaction.service';
import { TransactionRequest } from '../../../interfaces/Transaction.interface';
import { TransactionType } from '../../../interfaces/transaction-type.enum';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class TransactionFormComponent implements OnChanges {
  @Input() accountNumber: string | null = null;
  @Input() balance: number | null = null;
  @Output() close = new EventEmitter<void>();

  transactionForm: FormGroup;
  errorMessage: string | null = null;
  showConfirmationDialog = false;
  transactionCost = 0;

  transactionOptions = [
    { value: TransactionType.BRANCH_DEPOSIT, label: 'Depósito en Sucursal (0$)' },
    { value: TransactionType.ATM_DEPOSIT, label: 'Depósito en Cajero Automático (2$)' },
    { value: TransactionType.OTHER_ACCOUNT_DEPOSIT, label: 'Depósito a Otra Cuenta (1.5$)' },
    { value: TransactionType.PHYSICAL_PURCHASE, label: 'Compra Física (0$)' },
    { value: TransactionType.ONLINE_PURCHASE, label: 'Compra en Línea (5$)' },
    { value: TransactionType.ATM_WITHDRAWAL, label: 'Retiro en Cajero Automático (1$)' },
  ];

  constructor(
    private fb: FormBuilder, 
    private transactionService: TransactionService
  ) {
    this.transactionForm = this.fb.group({
      accountNumber: [{value: '', disabled: true}, Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      transactionType: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountNumber'] && this.accountNumber) {
      this.transactionForm.patchValue({
        accountNumber: this.accountNumber
      });
      this.errorMessage = null;
    }

    if (changes['balance']) {
      this.balance = changes['balance'].currentValue;
    }
  }

  calculateTransactionCost() {
    const transactionType = this.transactionForm.get('transactionType')?.value;
    
    switch (transactionType) {
      case TransactionType.ATM_DEPOSIT:
        this.transactionCost = 2;
        break;
      case TransactionType.OTHER_ACCOUNT_DEPOSIT:
        this.transactionCost = 1.5;
        break;
      case TransactionType.ONLINE_PURCHASE:
        this.transactionCost = 5;
        break;
      case TransactionType.ATM_WITHDRAWAL:
        this.transactionCost = 1;
        break;
      default:
        this.transactionCost = 0;
    }
  }

  submitForm() {
    if (this.transactionForm.valid) {
      this.showConfirmationDialog = true;
    }
  }

  confirmTransaction(confirmed: boolean) {
    this.showConfirmationDialog = false;
    if (confirmed) {
      const transactionType = this.transactionForm.get('transactionType')?.value;
      
      if ([TransactionType.ATM_DEPOSIT, TransactionType.BRANCH_DEPOSIT, TransactionType.OTHER_ACCOUNT_DEPOSIT].includes(transactionType)) {
        this.makeDeposit();
      } else {
        this.makeWithdrawal();
      }
    }
  }

  makeDeposit() {
    if (this.balance === null || this.balance === undefined) {
      this.errorMessage = 'No se pudo obtener el balance de la cuenta';
      return;
    }

    const amount = this.transactionForm.get('amount')?.value;
    const balanceWithAmount = this.balance + amount;

    if (this.transactionCost > balanceWithAmount) {
      this.errorMessage = 'La transacción más el costo debe ser mayor al balance';
      return;
    }

    const transactionData: TransactionRequest = {
      accountNumber: this.transactionForm.get('accountNumber')?.value,
      amount: amount,
      transactionType: this.transactionForm.get('transactionType')?.value
    };

    this.transactionService.createDeposit(transactionData).subscribe({
      next: () => {
        this.transactionService.notifyTransactionCreated(transactionData.accountNumber);
        this.close.emit();
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Ocurrió un error inesperado';
      }
    });
  }

  makeWithdrawal() {
    const amount = this.transactionForm.get('amount')?.value;
    const amountWithCost = amount + this.transactionCost;

    if (this.balance === null || this.balance === undefined) {
      this.errorMessage = 'No se pudo obtener el balance de la cuenta';
      return;
    }

    if (amountWithCost > this.balance) {
      this.errorMessage = 'La transacción más el costo debe ser mayor al balance';
      return;
    }

    const transactionData: TransactionRequest = {
      accountNumber: this.transactionForm.get('accountNumber')?.value,
      amount: amount,
      transactionType: this.transactionForm.get('transactionType')?.value
    };

    this.transactionService.createWithdrawal(transactionData).subscribe({
      next: () => {
        this.transactionService.notifyTransactionCreated(transactionData.accountNumber);
        this.close.emit();
      },
      error: (error: any) => {
        this.errorMessage = error.error?.message || 'Ocurrió un error inesperado';
      }
    });
  }

  get isFormInvalid(): boolean {
    return this.transactionForm.invalid;
  }
}