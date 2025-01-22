import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) { }

  login() {
    this.authService.login(this.loginData).subscribe({
      next: (data) => {
        this.authService.setToken(data.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    })
  }
  register() {
    this.router.navigate(['/register']);
  }
}
