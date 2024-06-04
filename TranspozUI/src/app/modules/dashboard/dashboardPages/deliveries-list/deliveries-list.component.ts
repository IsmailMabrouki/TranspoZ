import { Component, OnInit } from '@angular/core';
import { Client, Delivery } from '../../../../services/models';
import { AdminService, ClientService, DriverService } from '../../../../services/services';
import { Router } from '@angular/router';
import { StrictHttpResponse } from '../../../../services/strict-http-response';
import { TokenService } from '../../../../services/token/token.service';
import { GetMyDeliveries$Params } from '../../../../services/fn/client/get-my-deliveries';

@Component({
  selector: 'app-deliveries-list',
  templateUrl: './deliveries-list.component.html',
  styleUrl: './deliveries-list.component.scss'
})
export class DeliveriesListComponent implements OnInit {

  page: number = 0;
  size: number = 5;
  deliveries: Delivery[] = [];
  isLoading: boolean = false; 
  userId: number = 0;
  
  

    constructor(
      private  adminService : AdminService,
      private  driverService : DriverService,
      private  clientService : ClientService,
      private  tokenService : TokenService,
      private router: Router,
      
    ){

  

}

ngOnInit(): void {
  this.userId =  parseInt(localStorage.getItem('id') as string,10);
  if (this.hasRole('user')){
    this.findAllDeliveries1();
    }
  if (this.hasRole('driver')){
  this.findAllDeliveries2();
  }
}

hasRole(role: string): boolean {
  console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
  let userRole = this.tokenService.userRoles;
  return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  
}

displayDeliveryDetails(delivery: Delivery) {
  this.router.navigate(['dashboard','delivery-details', delivery.id]);
}

ChangeDeliveryStatus(delivery: Delivery) {
  this.router.navigate(['dashboard','delivery-form', delivery.id]);
  }

private findAllDeliveries1() {
  this.isLoading = true;
  this.clientService.getMyDeliveries$Response({
    id : this.userId
    }).subscribe({
      next: (DeliveryResponse: StrictHttpResponse<Delivery[]>) => {
        this.deliveries = DeliveryResponse.body;
        this.isLoading = false; 
      },
      error: (error) => {
        // Handle errors gracefully (e.g., display an error message to the user)
        console.error('Error fetching deliveries:', error);
        // You can also consider emitting an error event or using a toast notification
        this.isLoading = false;
      },
      complete: () => {
        // Optional: Perform actions after the request completes (regardless of success or error)
        console.log('Deliveries fetched successfully');
      }
    });
  }
private findAllDeliveries2() {
      this.isLoading = true;
      const params: GetMyDeliveries$Params = {
        // userId or other required parameters
        id: this.userId
      };
      this.driverService.getAssignedDeliveries$Response(params).subscribe({
          next: (DeliveryResponse: StrictHttpResponse<Delivery[]>) => {
            this.deliveries = DeliveryResponse.body;
            this.isLoading = false; 
          },
          error: (error) => {
            // Handle errors gracefully (e.g., display an error message to the user)
            console.error('Error fetching deliveries:', error);
            // You can also consider emitting an error event or using a toast notification
            this.isLoading = false;
          },
          complete: () => {
            // Optional: Perform actions after the request completes (regardless of success or error)
            console.log('Deliveries fetched successfully');
          }
        });

    // goToDriverDetails(driver: Driver) {
    //   // Implement navigation logic to driver details page using the router
    //   // This example assumes a route named 'driver-details' with a driver ID parameter
    //   this.router.navigate(['/driver-details', driver.id]);
    // }
}

// get isLastPage(): boolean{
//     return this.page == (this.DriverResponse.len as number -1);
// }
gotoFirstPage(){}
gotoPreviousPage(){}
gotoPage(index: number){}
gotoNextPage(){}
gotoLastPage(){}


}
