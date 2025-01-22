import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  constructor( private router: Router) {}

  accounts(){
    this.router.navigate(['/dashboard/accounts']);
  }
  
  transactions(){
    this.router.navigate(['/dashboard/transactions']);
  }
}
