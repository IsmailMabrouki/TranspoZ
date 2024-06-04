import { Component, OnInit } from '@angular/core';
import { User } from '../../../../services/models';
import { AdminService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';
import { Router } from '@angular/router';
import { StrictHttpResponse } from '../../../../services/strict-http-response';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss'
})
export class UsersListComponent implements OnInit {

  page: number = 0;
  size: number = 5;
  users: User[] = [];
  isLoading: boolean = false; 


  constructor(
    private  adminService :AdminService,
    private  tokenService : TokenService, 
    private router: Router,
    
  ){
}

  ngOnInit(): void {
    this.findAllUsers();
  }

  displayUserDetails(user : User) {
    this.router.navigate(['dashboard','user-details', user.id]);
  }

  onUserDeleted(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
  }

  private findAllUsers() {
    this.isLoading = true;
    this.adminService.getAllUsers$Response({
        page: this.page,
        size: this.size
        
      }).subscribe({
        next: (UserResponse: StrictHttpResponse<User[]>) => {
          this.users = UserResponse.body;
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
    gotoFirstPage(){}
    gotoPreviousPage(){}
    gotoPage(index: number){}
    gotoNextPage(){}
    gotoLastPage(){}
  
}
