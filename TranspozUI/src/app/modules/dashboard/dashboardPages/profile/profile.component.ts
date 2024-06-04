import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverService, AdminService, ClientService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { User } from '../../../../services/models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
    userId: string | undefined;
    loading: boolean | undefined;
    user : User | undefined;



    constructor(
      private route: ActivatedRoute,
      private tokenService : TokenService,
      private  driverService : DriverService,
      private  clientService : ClientService,
      private  adminService : AdminService
    ) {}


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userId = id === null ? undefined : id;
    console.log("userId", this.userId);
    if (this.userId) {
      const numericUserId = parseInt(this.userId, 10); // Convertir la chaîne de caractères en nombre base 10
  
  if (this.hasRole('admin')){
      this.getAdminProfile(numericUserId);
  }
  else if (this.hasRole('user')){
    this.getClientProfile(numericUserId);
  }
  else if (this.hasRole('driver')){
    this.getDriverProfile(numericUserId);
  }}
}

hasRole(role: string): boolean {
  console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
  let userRole = this.tokenService.userRoles;
  return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
}
getRole(): string {
  console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
  let userRole = this.tokenService.userRoles;
  return userRole[4].replace('ROLE_', '').toLowerCase(); // Replace with your logic to get user role
}

 getAdminProfile(UserId: number) {
  this.adminService.getMyProfile2$Response({ id: UserId}).subscribe(
    (response) => {
      this.user= response.body; // Extract the driver details from the response
      this.loading = false;
      console.log("user : ", this.user);
    },
    (error) => {
      console.error('Error fetching user details:', error);
      this.loading = false;
    }
  );
}


    getClientProfile(UserId: number) {
      this.clientService.getMyProfile$Response({ id: UserId}).subscribe(
        (response) => {
          this.user= response.body; // Extract the driver details from the response
          this.loading = false;
          console.log("user : ", this.user);
        },
        (error) => {
          console.error('Error fetching user details:', error);
          this.loading = false;
        }
      );
    }

    getDriverProfile(UserId: number) {
      this.driverService.getMyProfile1$Response({ id: UserId}).subscribe(
        (response) => {
          this.user= response.body; // Extract the driver details from the response
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
