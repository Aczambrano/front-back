import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AccountFormComponent } from '../../accounts/account-form/account-form.component';

@Component({
  selector: 'app-account-modal',
  imports: [AccountFormComponent],
  templateUrl: './account-modal.component.html',
  styleUrl: './account-modal.component.scss'
})
export class AccountModalComponent {
  @Input() accountNumber: string | null = null;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}
