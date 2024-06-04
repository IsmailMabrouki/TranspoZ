import {Component, OnInit} from '@angular/core';
import { TokenService } from '../../../../services/token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private  tokenService : TokenService, 
    private router: Router,

  ){}
    ngOnInit(): void {
      const linkColor = document.querySelectorAll('.nav-link');
      linkColor.forEach(link => {
        if (window.location.href.endsWith(link.getAttribute('href') || '')) {
          link.classList.add('active');
        }
        link.addEventListener('click', () => {
          linkColor.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        });
      });
    }

    getProfile() {
      const userId =  localStorage.getItem('id') as string;
      this.router.navigate(['dashboard','profile', userId]);
    }

    hasRole(role: string): boolean {
      console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
      let userRole = this.tokenService.userRoles;
      return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
      
    }

    get fullUserName():string{
      console.log("username:" ,this.tokenService.userFullName)
      return this.tokenService.userFullName.toString();
    }

  logout() {
    localStorage.removeItem('token');
    window.location.reload();
  }
}
