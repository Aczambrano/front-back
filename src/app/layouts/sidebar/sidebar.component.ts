import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Output() toggleSidebar = new EventEmitter<void>();

  isSidebarCollapsed = false; // Nueva propiedad para controlar el estado del sidebar

  constructor( private router: Router) {}

  accounts(){
    this.router.navigate(['/dashboard/accounts']);
  }
  
  transactions(){
    this.router.navigate(['/dashboard/transactions']);
  }
  
  handleToggleSidebar(){
      this.isSidebarCollapsed = !this.isSidebarCollapsed; // Cambia el estado del sidebar
      this.toggleSidebar.emit(); // Emite el evento (si lo necesitas para otras partes de la app)
  }
}
