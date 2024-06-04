import { Component, OnInit } from '@angular/core';
import { Driver } from '../../../../services/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService, ClientService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrl: './driver-details.component.scss'
})
export class DriverDetailsComponent implements OnInit {

  driver: Driver | undefined;
  loading: boolean | undefined;
  private driverId: string | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private tokenService : TokenService,
    private  clientService : ClientService,
    private adminService : AdminService,
    private router: Router,
  ) {}

  ngOnInit() {
    // Fetch driver details using the driverId
    // This is just a placeholder. Replace it with actual data fetching logic.
    this.driverId = this.route.snapshot.paramMap.get('id');
    console.log("driver id : ", this.driverId);
if (this.driverId) {
  const numericId = parseInt(this.driverId, 10); // Convertir la chaîne de caractères en nombre base 10
  if (this.hasRole('user')){
    this.fetchDriverDetails1(numericId);
}
  else if (this.hasRole('admin')){
    this.fetchDriverDetails2(numericId);
  }
}
}

onCreateDelivery(driver : Driver) {
  this.router.navigate(['dashboard','delivery-form', driver.id]);
}



hasRole(role: string): boolean {
  console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
  let userRole = this.tokenService.userRoles;
  return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
}

fetchDriverDetails1(driverId: number) {
  this.clientService.findDriverById$Response({ id: driverId }).subscribe(
    (response) => {
      this.driver = response.body; // Extract the driver details from the response
      this.loading = false;
      console.log("driver : ", this.driver);
    },
    (error) => {
      console.error('Error fetching driver details:', error);
      this.loading = false;
    }
  );
}

fetchDriverDetails2(driverId: number) {
  this.adminService.getUserById$Response({ id: driverId }).subscribe(
    (response) => {
      this.driver = response.body; // Extract the driver details from the response
      this.loading = false;
      console.log("driver : ", this.driver);
    },
    (error) => {
      console.error('Error fetching driver details:', error);
      this.loading = false;
    }
  );

}
}