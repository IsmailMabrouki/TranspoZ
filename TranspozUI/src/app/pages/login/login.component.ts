import { Component } from '@angular/core';
import {Router} from '@angular/router';
import { AuthenticationRequest } from '../../services/models';
import {AuthenticationService} from '../../services/services/authentication.service';
import {TokenService} from '../../services/token/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authRequest : AuthenticationRequest = {email: '', password: ''};
  errorMsg: String[] = [];
  isLoading: boolean = false; // Flag to indicate login in progress

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  login() {
    this.errorMsg = [];
    this.isLoading = true;

    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res) => {
        const token = res?.token as string;
        const userId =  res?.userId as string;
         // Check for presence of 'token' property in response
      if (userId){
        localStorage.setItem('id', userId);
      }
      if (token) {
        this.tokenService.token = token;
        console.log('Authentication successful and token received:', token);
        // this.tokenService.token = res.token as string;
        this.router.navigate(['dashboard']);
        this.isLoading = false; // Reset loading flag
      }
      },
      error: (err) => {
        console.log("Error login @Ismail :", err);
        this.isLoading = false; // Reset loading flag after error

        // Extract error message from response (modify as needed)
        const errorMessage = err.error?.businessErrorDescription || err.error?.error?.message || err.error?.errorMsg || 'An unexpected error occurred.';
        this.errorMsg.push(errorMessage); // Push extracted error message
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}

