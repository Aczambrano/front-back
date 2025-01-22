import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../layouts/sidebar/sidebar.component';
import { NavComponent } from "../nav/nav.component";
import { filter, map, mergeMap, of, tap } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, SidebarComponent, NavComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isSidebarCollapsed: boolean = false;

    toggleSidebar(){
        this.isSidebarCollapsed = !this.isSidebarCollapsed;
    }
}
