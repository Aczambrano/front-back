import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AccountListComponent } from './components/dashboard/accounts/account-list/account-list.component';
import { TransactionListComponent } from './components/dashboard/transactions/transaction-list/transaction-list.component';
import { authGuard } from './guards/auth.guard';

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
