import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage: string | null = null;

    constructor(private router: Router, private authService: AuthService) {
        this.loginForm = new FormGroup({
            username: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
        });
    }

    ngOnInit(): void {
    }

    login() {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: (data) => {
                    this.authService.setToken(data.token);
                    const username = this.authService.decodeTokenAndGetUsername(data.token);
                    if(username) {
                      this.authService.setUsername(username);
                      this.router.navigate(['/dashboard/accounts']);
                    } else {
                      this.errorMessage = 'No se pudo obtener el nombre de usuario del token.';
                    }
                },
                error: (error) => {
                    this.errorMessage = 'Credenciales incorrectas';
                }
            });
        } else {
            this.errorMessage = 'Por favor, completa el formulario correctamente';
        }
    }

    register() {
        this.router.navigate(['/register']);
    }
  
    get usernameControl() {
        return this.loginForm.get('username');
    }
      
      get passwordControl() {
        return this.loginForm.get('password');
      }
}