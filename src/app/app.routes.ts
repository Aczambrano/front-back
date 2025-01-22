import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { AccountListComponent } from './views/accounts/account-list/account-list.component';
import { TransactionListComponent } from './views/transactions/transaction-list/transaction-list.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],
        children: [
            {path:'accounts', component: AccountListComponent},
            {path: 'transactions', component: TransactionListComponent}
        ]
    },    

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }

];
