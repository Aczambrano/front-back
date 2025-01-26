import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/views/auth/login/login.component';
import { RegisterComponent } from './components/views/auth/register/register.component';
import { DashboardComponent } from './components/layouts/dashboard/dashboard.component';
import { AccountListComponent } from './components/views/accounts/account-list/account-list.component';
import { AccountDetailComponent } from './components/views/accounts/account-detail/account-detail.component';
import { TransactionListComponent } from './components/views/transactions/transaction-list/transaction-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },

    {
        path: 'dashboard', component: DashboardComponent, canActivate: [authGuard],
        children: [
            { path: 'accounts', component: AccountListComponent },
            { path: 'account-detail/:accountNumber', component: AccountDetailComponent }, 
            { path: 'transactions', component: TransactionListComponent }
        ]
    },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login' }

];
