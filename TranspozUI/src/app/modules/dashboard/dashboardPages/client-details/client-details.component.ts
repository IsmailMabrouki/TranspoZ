import { Component } from '@angular/core';
import { Client } from '../../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { AdminService, DriverService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss'
})
export class ClientDetailsComponent {
  client: Client | undefined;
  loading: boolean | undefined;
  private clientId: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private tokenService : TokenService,
    private  driverService : DriverService,
    private adminService : AdminService
  ) {}

  ngOnInit() {
    // Fetch driver details using the driverId
    // This is just a placeholder. Replace it with actual data fetching logic.
    this.clientId = this.route.snapshot.paramMap.get('id');
    console.log("client id : ", this.clientId);
if (this.clientId) {
  const numericId = parseInt(this.clientId, 10); // Convertir la chaîne de caractères en nombre base 10
  if (this.hasRole('driver')){
  this.fetchClientDetails1(numericId);
} else if (this.hasRole('admin')){
  this.fetchClientDetails2(numericId);
}
}

}

hasRole(role: string): boolean {
  console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
  let userRole = this.tokenService.userRoles;
  return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  
}

fetchClientDetails1(clientId: number) {
  this.driverService.getClientById1$Response({ id: clientId }).subscribe(
    (response) => {
      this.client = response.body; // Extract the driver details from the response
      this.loading = false;
      console.log("client : ", this.client);
    },
    (error) => {
      console.error('Error fetching driver details:', error);
      this.loading = false;
    }
  );
}

fetchClientDetails2(clientId: number) {
  this.adminService.getUserById$Response({ id: clientId }).subscribe(
    (response) => {
      this.client = response.body; // Extract the driver details from the response
      this.loading = false;
      console.log("client : ", this.client);
    },
    (error) => {
      console.error('Error fetching driver details:', error);
      this.loading = false;
    }
  );

}


}
