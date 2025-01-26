import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnDestroy{

  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() userRoles: string[] = [];

  isSidebarCollapsed = false; 
  username: string | null = null;
  usernameSubscription: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.usernameSubscription = this.authService.username$.subscribe(username => {
      this.username = username
    })

  }


  accounts() {
    this.router.navigate(['/dashboard/accounts']);
  }

  transactions() {
    this.router.navigate(['/dashboard/transactions']);
  }

  handleToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed; 
    this.toggleSidebar.emit(); 
  }

  ngOnDestroy(): void {
    if(this.usernameSubscription) {
        this.usernameSubscription.unsubscribe()
    }
  }

  isAdmin(): boolean {
    return this.userRoles.includes('ROLE_ADMIN');
  }
  isUser(): boolean {
    return this.userRoles.includes('ROLE_USER');
  }
}
