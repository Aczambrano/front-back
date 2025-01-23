import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AccountResponse } from '../../../interfaces/Account.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';

@Component({
  selector: 'app-account-detail',
  imports: [],
  templateUrl: './account-detail.component.html',
  styleUrl: './account-detail.component.scss'
})
export class AccountDetailComponent  implements OnInit , OnDestroy{
  accountNumber: string | null = null;
  account: AccountResponse | null = null;
  constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) { }

ngOnInit(): void {
     this.route.queryParams.subscribe(params => {
          this.accountNumber = params['accountNumber'];
          if(this.accountNumber){
            this.loadAccountDetails()
          }else {
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
          },
          error: (error) => {
            console.error('Error loading account details:', error);
          }
        });
      }
    }

}
