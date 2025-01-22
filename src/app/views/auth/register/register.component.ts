import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule], 
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerData = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  errorMessage: string | null = null;

  constructor(private router: Router) { }

  register() {
    // Aquí iría la lógica de registro (llamada a un servicio, por ejemplo)
    // Simulamos un registro exitoso
    if (this.registerData.name && this.registerData.email && this.registerData.password && this.registerData.role) {
      this.router.navigate(['/login']); // Navega al login después del registro
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }

  login(){
    this.router.navigate(['/login'])
  }
}
