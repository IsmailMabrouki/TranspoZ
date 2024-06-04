import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../../../services/models';
import { AdminService } from '../../../../services/services';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss'
})
export class UserCardComponent {
  
  private _user!: User;

  constructor(
    private adminService : AdminService,
  ){}

  get user(){
    return this._user;
  }

  @Input()
  set user(value: User){
    this._user = value;
  }

  get userCover(){
    return 'https://st3.depositphotos.com/6672868/13701/v/950/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  }

  @Output() private details: EventEmitter<User> = new EventEmitter<User>();
  @Output() private edit: EventEmitter<User> = new EventEmitter<User>();
  @Output() private userDeleted: EventEmitter<number> = new EventEmitter<number>();


  onShowDetails(): void {
    this.details.emit(this._user);
  } 

  onEdit() {
    this.edit.emit(this._user);
    }

    onDeleteUser(): void {
      if (confirm(`Are you sure you want to delete user ${this.user.fullName}?`)) {
        this.adminService.deleteUser({ id: this.user.id! }).subscribe(
          _response => {
            console.log('User deleted successfully');
            this.userDeleted.emit(this.user.id!);
          },
          error => {
            console.error('Error deleting user', error);
          }
        );
      }
    }
}
