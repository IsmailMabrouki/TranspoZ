import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../services/models';
import { AdminService, ClientService, DriverService } from '../../../../services/services';
import { Router } from '@angular/router';
import { StrictHttpResponse } from '../../../../services/strict-http-response';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss'
})
export class ClientsListComponent implements OnInit {
  page: number = 0;
  size: number = 5;
  clients: Client[] = [];
  isLoading: boolean = false; 
  
  

    constructor(
      private  adminService : AdminService,
      private  driverService : DriverService,
      private  tokenService : TokenService,
      private router: Router,
      
    ){

  

}

ngOnInit(): void {
  if (this.hasRole('driver')){
  this.findAllClients1();
  }
  else if (this.hasRole('admin')){
  this.findAllClients2();
  }
}

hasRole(role: string): boolean {
  console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
  let userRole = this.tokenService.userRoles;
  return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
  
}

displayClientDetails(client: Client) {
  this.router.navigate(['dashboard','client-details', client.id]);
}

private findAllClients1() {
  this.isLoading = true;
  this.driverService.getAllClients1$Response({
      page: this.page,
      size: this.size
      
    }).subscribe({
      next: (ClientResponse: StrictHttpResponse<Client[]>) => {
        this.clients = ClientResponse.body;
        this.isLoading = false; 
      },
      error: (error) => {
        // Handle errors gracefully (e.g., display an error message to the user)
        console.error('Error fetching clients:', error);
        // You can also consider emitting an error event or using a toast notification
        this.isLoading = false;
      },
      complete: () => {
        // Optional: Perform actions after the request completes (regardless of success or error)
        console.log('Clients fetched successfully');
      }
    });
  }
private findAllClients2() {
      this.isLoading = true;
      this.adminService.getAllClients2$Response({
          page: this.page,
          size: this.size
          
        }).subscribe({
          next: (ClientResponse: StrictHttpResponse<Client[]>) => {
            this.clients = ClientResponse.body;
            this.isLoading = false; 
          },
          error: (error) => {
            // Handle errors gracefully (e.g., display an error message to the user)
            console.error('Error fetching clients:', error);
            // You can also consider emitting an error event or using a toast notification
            this.isLoading = false;
          },
          complete: () => {
            // Optional: Perform actions after the request completes (regardless of success or error)
            console.log('Clients fetched successfully');
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
