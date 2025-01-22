import { Component } from '@angular/core';
import { AccountService } from '../../../../services/account.service';
import { Account } from '../../../../interfaces/account.terface';
import { AccountModalComponent } from "../../modals/account-modal/account-modal.component";

@Component({
  selector: 'app-account-list',
  imports: [AccountModalComponent],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent {
  accounts: Account[] = [];
  selectedAccount: string | null = null;
  showModal: boolean = false;

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts() {
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts;
      },
      error: (error) => {
        console.error('Error loading accounts:', error);
      }
    });
  }
  showDetails(accountNumber: string) {
    this.selectedAccount = accountNumber;
    this.showModal = true;
  }

  openCreateModal() {
    this.selectedAccount = null;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.loadAccounts();
    this.selectedAccount = null
  }
}
