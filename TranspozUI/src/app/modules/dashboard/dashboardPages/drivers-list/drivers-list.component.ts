import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AdminService, ClientService, DriverService } from '../../../../services/services';
import { Router } from '@angular/router';
import { Driver } from '../../../../services/models/driver';
import { StrictHttpResponse } from '../../../../services/strict-http-response';
import { TokenService } from '../../../../services/token/token.service';


@Component({
  selector: 'app-drivers-list',
  templateUrl: './drivers-list.component.html',
  styleUrl: './drivers-list.component.scss'
})
export class DriversListComponent implements OnInit { 
    page: number = 0;
    size: number = 5;
    drivers: Driver[] = [];
    isLoading: boolean = false; 
  

    // onDriverSelected(driver: Driver) {
    //   this.driverSelected.emit(driver);
    //   console.log("driver emited",driver.id);
    // }
      constructor(
        private  adminService :AdminService,
        private  clientService : ClientService,
        private  tokenService : TokenService, 
        private router: Router,
        
      ){
  }

  ngOnInit(): void {
    if (this.hasRole('user')){
    this.findAllDrivers1();
  }
    else if (this.hasRole('admin')){
      this.findAllDrivers2();
    }
  }

  displayDriverDetails(driver : Driver) {
    this.router.navigate(['dashboard','driver-details', driver.id]);
  }

  hasRole(role: string): boolean {
    console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
    
  }


  private findAllDrivers1() {
    this.isLoading = true;
    this.clientService.getAllDrivers$Response({
        page: this.page,
        size: this.size
        
      }).subscribe({
        next: (DriverResponse: StrictHttpResponse<Driver[]>) => {
          this.drivers = DriverResponse.body;
          this.isLoading = false; 
        },
        error: (error) => {
          // Handle errors gracefully (e.g., display an error message to the user)
          console.error('Error fetching drivers:', error);
          // You can also consider emitting an error event or using a toast notification
          this.isLoading = false;
        },
        complete: () => {
          // Optional: Perform actions after the request completes (regardless of success or error)
          console.log('Drivers fetched successfully');
        }
      });
    }
      private findAllDrivers2() {
        this.isLoading = true;
        this.adminService.getAllDrivers2$Response({
            page: this.page,
            size: this.size
            
          }).subscribe({
            next: (DriverResponse: StrictHttpResponse<Driver[]>) => {
              this.drivers = DriverResponse.body;
              this.isLoading = false; 
            },
            error: (error) => {
              // Handle errors gracefully (e.g., display an error message to the user)
              console.error('Error fetching drivers:', error);
              // You can also consider emitting an error event or using a toast notification
              this.isLoading = false;
            },
            complete: () => {
              // Optional: Perform actions after the request completes (regardless of success or error)
              console.log('Drivers fetched successfully');
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


