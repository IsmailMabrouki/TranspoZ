import { Component, OnInit } from '@angular/core';
import { User } from '../../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from '../../../../services/token/token.service';
import { AdminService } from '../../../../services/services';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent  implements OnInit  {
  user: User | undefined;
  loading: boolean | undefined;
  private userId: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private tokenService : TokenService,
    private adminService : AdminService
  ) {}


  ngOnInit(): void {
       // Fetch user details using the userId
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log("user id : ", this.userId);
if (this.userId) {
  const numericId = parseInt(this.userId, 10); // Convertir la chaîne de caractères en nombre base 10
    this.fetchUserDetails(numericId);

  }
}

hasRole(role: string): boolean {
  console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
  let userRole = this.tokenService.userRoles;
  return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  
}

fetchUserDetails(userId: number) {
  this.adminService.getUserById$Response({ id: userId }).subscribe(
    (response) => {
      this.user = response.body; // Extract the driver details from the response
      this.loading = false;
      console.log("user : ", this.user);
    },
    (error) => {
      console.error('Error fetching user details:', error);
      this.loading = false;
    }
  );
}

}