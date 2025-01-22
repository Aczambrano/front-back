import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Transaction } from '../../../../interfaces/transaction.interface';
import { TransactionService } from '../../../../services/transaction.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-form',
  imports: [FormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss'
})
export class TransactionFormComponent {
  @Input() customerId: string | null = null;
  @Input() accountNumber: string | null = null;
  @Output() close = new EventEmitter<void>();
  errorMessage: string | null = null;
  transactionData: Transaction = {
      customerId: '',
      accountNumber: '',
      amount: 0,
      transactionType: ''
  };
constructor(private transactionService: TransactionService) {}
ngOnChanges(changes: SimpleChanges): void {
      if(changes['customerId'] && this.customerId && changes['accountNumber'] && this.accountNumber){
          this.transactionData = {
              customerId: this.customerId,
              accountNumber: this.accountNumber,
              amount: 0,
              transactionType: ''
          };
        this.errorMessage = null;
      }
}

  submitForm() {
    if(this.transactionData.transactionType === 'BRANCH_DEPOSIT'){
       this.makeDeposit();
    } else {
        this.makeWithdrawal();
    }
  }
  makeDeposit(){
       this.transactionService.createDeposit(this.transactionData).subscribe({
         next: () => {
             this.close.emit()
         },
          error: (error) => {
             this.errorMessage = 'Error al realizar el deposito';
            console.error('Error making deposit:', error);
          }
      })
  }
  makeWithdrawal(){
      this.transactionService.createWithdrawal(this.transactionData).subscribe({
          next: () => {
              this.close.emit()
          },
          error: (error) => {
              this.errorMessage = 'Error al realizar el retiro'
              console.error('Error making withdraw:', error)
          }
      });
  }
}
