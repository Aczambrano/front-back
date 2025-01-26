import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { NavComponent } from "../nav/nav.component";
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent, NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isSidebarCollapsed: boolean = false;
  userRoles: string[] = [];

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.setUserRoles();
  }
  setUserRoles() {
    const token = this.authService.getToken()
    if (token) {
      this.userRoles = this.authService.decodeTokenAndGetRoles(token);
    }

  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
