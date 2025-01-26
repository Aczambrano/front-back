import { Component, Input, OnDestroy, OnInit, Pipe } from '@angular/core';
import { AccountResponse } from '../../../interfaces/Account.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { TransactionResponse } from '../../../interfaces/transaction.interface';
import { TransactionModalComponent } from "../../modals/transaction-modal/transaction-modal.component";
import { AccountModalComponent } from "../../modals/account-modal/account-modal.component";
import { delay, of, Subscription, switchMap } from 'rxjs';
import { LoaderComponent } from "../../../components/loader/loader.component";
import { TransactionService } from '../../../services/transaction.service';
import { DatePipe } from '@angular/common';
import { TransactionType } from '../../../interfaces/transaction-type.enum';
import { SumaryCardComponent } from "../../../components/sumary-card/sumary-card.component";
import { TransactionCardComponent } from "../../../components/transaction-card/transaction-card.component";
import { AccountInfoComponent } from "../../../components/account-info/account-info.component";


@Component({
  selector: 'app-account-detail',
  imports: [TransactionModalComponent, AccountModalComponent, LoaderComponent, DatePipe, SumaryCardComponent, TransactionCardComponent, AccountInfoComponent],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss'
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  accountNumber: string | null = null;
  balance: number | null = null;
  account: AccountResponse | null = null;
  transactions: TransactionResponse[] = [];
  currentPage = 1;
  itemsPerPage = 6; // Display 6 cards per page
  displayedTransactions: TransactionResponse[] = [];
  totalPages: number = 1;
  showTransactionForm: boolean = false;
  showEditModal: boolean = false;
  showLoader: boolean = false;
  private accountUpdatedSubscription?: Subscription;
  private transactionCreatedSubscription?: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private transactionService: TransactionService) {
    this.transactionCreatedSubscription = this.transactionService.transactionCreatedSource$
      .pipe(
        switchMap(() => {
          this.showLoader = true;
          return of(null).pipe(delay(1000));
        })
      )
      .subscribe(() => {
        this.refreshAccountAndTransactions();
      });

    this.accountUpdatedSubscription = this.accountService.accountUpdated$
      .pipe(
        switchMap(() => {
          this.showLoader = true;
          return of(null).pipe(delay(1500));
        })
      )
      .subscribe(() => {
        this.refreshAccountAndTransactions();
      });
  }

  TransactionType = TransactionType;

  private refreshAccountAndTransactions(): void {
    this.loadAccountDetails();
    this.loadTransactions();
    this.showLoader = false;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.accountNumber = params['accountNumber'];
      if (this.accountNumber) {
        this.loadAccountDetails();
        this.loadTransactions();
      } else {
        this.router.navigate(['/dashboard/accounts']);
      }
    });
  }

  ngOnDestroy(): void {
  }

  loadAccountDetails() {
    if (this.accountNumber) {
      this.accountService.getAccount(this.accountNumber).subscribe({
        next: (accountResponse) => {
          this.account = accountResponse;
          this.balance = accountResponse.balance
        },
        error: (error) => {
          console.error('Error loading account details:', error);
        }
      });
    }
  }

  loadTransactions() {
    if (this.accountNumber) {
      this.transactionService.getTransactions(this.accountNumber).subscribe({
        next: (transactionResponses) => {

          if (transactionResponses && transactionResponses.length > 0) {
            this.transactions = Array.isArray(transactionResponses[0])
              ? transactionResponses[0]
              : transactionResponses;
          } else {
            this.transactions = [];
          }
          this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
          this.updateDisplayedTransactions();
        },
        error: (error) => {
          console.error('Error loading account details:', error);
        }
      })
    }
  }


  updateDisplayedTransactions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.displayedTransactions = this.transactions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedTransactions();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedTransactions();
    }
  }

  openTransactionForm() {
    this.showTransactionForm = true;
  }

  closeTransactionForm() {
    this.showTransactionForm = false;
  }

  openEditModal() {
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.loadAccountDetails();
    this.loadTransactions();
  }
}