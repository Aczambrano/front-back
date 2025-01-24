import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { LoaderComponent } from "../../../components/loader/loader.component";

@Component({
  selector: 'app-account-form',
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss'
})
export class AccountFormComponent implements OnChanges {
  @Input() accountNumber: string | null = null;
  @Output() close = new EventEmitter<void>();

  accountForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private accountService: AccountService, private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      accountNumber: ['', Validators.required],
      initialBalance: ['', Validators.required],
      owner: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['accountNumber'] && this.accountNumber) {
      this.getAccountDetails();
    } else {
      this.accountForm.reset()
      this.accountForm.get('accountNumber')?.enable()
      this.errorMessage = null;
    }
  }
  getAccountDetails() {
    this.accountService.getAccount(this.accountNumber!).subscribe({
      next: (accountResponse) => {
        this.accountForm.patchValue({
          accountNumber: accountResponse.accountNumber,
          initialBalance: accountResponse.balance,
          owner: accountResponse.owner,
        })
      },
      error: (error) => {
        this.errorMessage = 'Error obteniendo los datos de la cuenta'
      }
    })
  }

  submitForm() {
    if (this.accountForm.valid) {
      if (this.accountNumber) {
        this.updateAccount();
      } else {
        this.createAccount();
      }
    }
  }
  createAccount() {
    this.accountService.createAccount(this.accountForm.value).subscribe({
      next: () => {
        this.accountService.notifyAccountUpdated();
        this.close.emit();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }

  updateAccount() {
    const accountNumberControl = this.accountForm.get('accountNumber');
    if (accountNumberControl) {
      this.accountForm.patchValue({ accountNumber: accountNumberControl.value })
    }

    this.accountService.updateAccount(this.accountForm.value).subscribe({
      next: () => {
        this.accountService.notifyAccountUpdated();
        this.close.emit();
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      }
    });
  }
}