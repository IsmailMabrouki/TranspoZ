import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private jwtHelper = new JwtHelperService();

  set token(token: string) {
    localStorage.setItem('token', token);
  }

  get token(): string {
    return localStorage.getItem('token') as string;
  }

  set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') as string;
  }

  clearTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  }

  isTokenValid(): boolean {
    const token = this.token;
    if (!token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }

  get userRoles(): string[] {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.authorities || [];
    }
    return [];
  }

  get userFullName(): string {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.fullName || '';
    }
    return '';
  }

  get userEmail(): string {
    const token = this.token;
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken.sub || '';
    }
    return '';
  }
}
