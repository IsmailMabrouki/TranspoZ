import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Client } from '../../../../services/models';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrl: './client-card.component.scss'
})
export class ClientCardComponent {
 
      private _clientCover: String | undefined;
      private _client!: Client;
      private _address : String ="";
   
  constructor(
    private tokenService : TokenService,
  ){}
    
    
      get client(){
        return this._client;
      }
    
      get address(){
        if (this._client.address?.streetAddress){
        return this._client.address?.streetAddress;
        }else return "No Address";
      }
    
   
      @Input()
      set client(value: Client){
        this._client = value;
      }
      get clientCover(){
        return 'https://st3.depositphotos.com/6672868/13701/v/950/depositphotos_137014128-stock-illustration-user-profile-icon.jpg';
      }

      @Output() private details: EventEmitter<Client> = new EventEmitter<Client>();

      onShowDetails(): void{
        this.details.emit(this._client);
      } 

      hasRole(role: string): boolean {
        console.log("role:" ,this.tokenService.userRoles[4].replace('ROLE_', '').toLowerCase());
        let userRole = this.tokenService.userRoles;
        return userRole[4].replace('ROLE_', '').toLowerCase() === role; // Replace with your logic to get user role
        
      }

      hasEmail(email: string | undefined): boolean {
        let userEmail = this.tokenService.userEmail;
        console.log("email: ",email);
        console.log("Useremail: ",userEmail);

        return userEmail === email;

      }
      // onShowDetails(): void{
    
      // }
    
}
    
