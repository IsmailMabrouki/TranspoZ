import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Delivery } from '../../../../services/models';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-delivery-card',
  templateUrl: './delivery-card.component.html',
  styleUrl: './delivery-card.component.scss'
})
export class DeliveryCardComponent {

  private _delivery!: Delivery;
  isDriver: boolean = false;

  
  constructor( 
    private tokenService : TokenService,
  ){}

  get delivery(){
    return this._delivery;
  }
 
  @Input()
  set delivery(value: Delivery){
    this._delivery = value;
  }
 

  @Output() private details: EventEmitter<Delivery> = new EventEmitter<Delivery>();
  @Output() private status: EventEmitter<Delivery> = new EventEmitter<Delivery>();

  onShowDetails(): void{
    this.details.emit(this._delivery);
  }

  changeStatus(): void {
    this.status.emit(this._delivery);
    }

  hasRole(role: string): boolean {
    console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
    
  }

}
