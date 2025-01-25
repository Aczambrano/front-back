import { Component, Input } from '@angular/core';
import { TransactionType } from '../../interfaces/transaction-type.enum';
import { TransactionResponse } from '../../interfaces/transaction.interface';
import { DatePipe } from '@angular/common';

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
