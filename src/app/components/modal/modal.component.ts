import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TransactionFormComponent } from "../../views/transactions/transaction-form/transaction-form.component";
import { AccountFormComponent } from "../../views/accounts/account-form/account-form.component";

@Component({
  selector: 'app-modal',
  imports: [TransactionFormComponent, AccountFormComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() accountNumber: string | null = null;
  @Input() balance: number | null = null;

  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

}
