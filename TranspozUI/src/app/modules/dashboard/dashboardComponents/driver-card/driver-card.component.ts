import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Driver } from '../../../../services/models';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.scss'
})
export class DriverCardComponent {

  private _driverCover: String | undefined;
  private _driver!: Driver;
  private _address : String ="";
  private _vehicleModel:  String ="";
  private _available: String ="";

  constructor(
    private tokenService: TokenService,
  ){}
  get available(){
    if (this._driver.available){
      return "Available"
    }else return "Not available";
  }

  get driver(){
    return this._driver;
  }

  get address(){
    if (this._driver.currentLocation?.address){
    return this._driver.currentLocation?.address;
    }else return "No Address";
  }

  get vehicleModel (){
      return this._driver.vehicle?.model;
  }


 
  @Input()
  set driver(value: Driver){
    this._driver = value;
  }
  get driverCover(){
    return 'https://st3.depositphotos.com/6672868/13701/v/950/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
  }

  @Output() private details: EventEmitter<Driver> = new EventEmitter<Driver>();

  onShowDetails(): void{
    this.details.emit(this._driver);
  }

  hasRole(role: string): boolean {
    console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
    let userRole = this.tokenService.userRoles;
    return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
    
  }


  
  // constructor(private router: Router) {}
  // handleClick(driver: any) {
  //   console.log('Card clicked:', driver.id);
  //   this.goToDriverDetails(driver); // Assuming this is called here
  // }
  // goToDriverDetails(driver: any) {
  //   console.log('Navigating to driver details:', driver.id);
  //   this.router.navigate(['drivers-list', driver.id]);
  // }
   

}
