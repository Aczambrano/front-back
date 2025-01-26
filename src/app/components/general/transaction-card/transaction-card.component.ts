import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TransactionResponse } from '../../../interfaces/Transaction.interface';
import { TransactionType } from '../../../interfaces/transaction-type.enum';

@Component({
  selector: 'app-transaction-card',
  imports: [DatePipe],
  templateUrl: './transaction-card.component.html',
  styleUrl: './transaction-card.component.scss'
})
export class TransactionCardComponent {
  @Input() transaction!: TransactionResponse;
  @Input() accountNumber!: string;
  @Input() transactionNumber!: number;
  TransactionType = TransactionType;
}
