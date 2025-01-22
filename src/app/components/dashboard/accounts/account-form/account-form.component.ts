import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { Account } from '../../../../interfaces/account.terface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-form',
  imports: [FormsModule],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent {
  @Input() accountNumber: string | null = null;
  @Output() close = new EventEmitter<void>();

  accountData: Account = {
    accountNumber: '',
    initialBalance: 0,
    owner: ''
  };
  errorMessage: string | null = null;
  constructor(private accountService: AccountService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountNumber'] && this.accountNumber) {
      this.getAccountDetails();
    } else {
      this.accountData = {
        accountNumber: '',
        initialBalance: 0,
        owner: ''
      };
      this.errorMessage = null;
    }
  }
  getAccountDetails() {
    this.accountService.getAccount(this.accountNumber!).subscribe({
      next: (account) => {
        this.accountData = account;
      },
      error: (error) => {
        this.errorMessage = 'Error obteniendo los datos de la cuenta'
        console.error('Error getting account details:', error);
      }
    })
  }
  submitForm() {
    if (this.accountNumber) {
      this.updateAccount()
    } else {
      this.createAccount()
    }
  }
  createAccount() {
    this.accountService.createAccount(this.accountData).subscribe({
      next: () => {
        this.close.emit();
      },
      error: (error) => {
        this.errorMessage = 'Error al crear la cuenta'
        console.error('Error creating account:', error);
      }
    });
  }
  updateAccount() {
    this.accountService.updateAccount(this.accountData).subscribe({
      next: () => {
        this.close.emit();
      },
      error: (error) => {
        this.errorMessage = 'Error al actualizar la cuenta'
        console.error('Error updating account:', error);
      }
    });
  }
}
