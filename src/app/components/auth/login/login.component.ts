import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  login() {
    // Aquí iría la lógica de autenticación (llamada a un servicio, por ejemplo)
    // Simulamos una autenticación exitosa
    if (this.loginData.username === 'aczambrano' && this.loginData.password === 'password') {
      this.router.navigate(['/dashboard']); // Navega al dashboard después del login
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }

  register(){
    this.router.navigate(['/register'])
  }
}
