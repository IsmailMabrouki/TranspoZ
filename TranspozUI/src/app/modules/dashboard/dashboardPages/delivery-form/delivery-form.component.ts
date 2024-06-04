import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeliveryRequest, Driver } from '../../../../services/models';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../../services/services';
import { TokenService } from '../../../../services/token/token.service';

@Component({
  selector: 'app-delivery-form',
  templateUrl: './delivery-form.component.html',
  styleUrls: ['./delivery-form.component.scss']
})
export class DeliveryFormComponent  implements OnInit{
  @Input() driver: Driver | undefined;
  @Output() formSubmitted = new EventEmitter<any>();
  deliveryForm: FormGroup = this.initializeForm() ;
  private driverId: number | null | undefined;
  private userId: number = -1 ;
  isDriver: boolean = false;

  ngOnInit(): void {
    const StrdriverId = this.route.snapshot.paramMap.get('id');
    console.log("Str driver Id : ", StrdriverId);
if (StrdriverId) {
  this.driverId = parseInt(StrdriverId, 10); // Convertir la chaîne de caractères en nombre base 10
  console.log("this.driver Id : ", this.driverId);
  }
  const StruserId =  localStorage.getItem('id') as string;
  this.userId = parseInt(StruserId, 10); // Convertir la chaîne de caractères en nombre base 10
  
  this.initializeForm();

  this.isDriver = this.hasRole('driver');
  if (this.isDriver) {
    this.deliveryForm.get('customerName')?.disable();
    this.deliveryForm.get('assignedDriverId')?.disable();
    this.deliveryForm.get('items')?.disable();
    this.deliveryForm.get('pickupLocation')?.disable();
    this.deliveryForm.get('deliveryLocation')?.disable();
    this.deliveryForm.get('estimatedDeliveryTime')?.disable();
  }

  }
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private  clientService : ClientService,
    private tokenService : TokenService

  ) {}


  private initializeForm(): any {
    this.deliveryForm = this.fb.group({
      customerName: [this.fullUserName],
      assignedDriverId: [this.driverId],
      items: ['', Validators.required],
      pickupLocation: ['', Validators.required],
      deliveryLocation: ['', Validators.required],
      status: ['PENDING'],
      estimatedDeliveryTime: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }
  


  hasRole(role: string): boolean {
    let userRole = this.tokenService.userRoles;
    return userRole.some(r => r.replace('ROLE_', '').toLowerCase() === role);
  }
 

  get fullUserName():string{
    console.log("username:" ,this.tokenService.userFullName)
    return this.tokenService.userFullName.toString();
  }
  onSubmit() {
    if (this.deliveryForm.valid) {
      console.log('Form Submitted', this.deliveryForm.value);
  
      // Create a DeliveryRequest object from the form values
      const deliveryRequest: DeliveryRequest = {
        assignedDriverId: this.deliveryForm.value.assignedDriverId,
        customerName: this.deliveryForm.value.customerName,
        deliveryLocation: this.deliveryForm.value.deliveryLocation,
        estimatedDeliveryTime: this.deliveryForm.value.estimatedDeliveryTime,
        items: this.deliveryForm.value.items,
        pickupLocation: this.deliveryForm.value.pickupLocation,
        status: this.deliveryForm.value.status
      };
  
      // Call your service method to create the delivery
      this.clientService.createDelivery$Response({id: this.userId, body : deliveryRequest  }).subscribe(
        (response) => {
          // Handle success response
          console.log('Delivery created:', response.body);
          // Optionally, you can reset the form here
          this.deliveryForm.reset();
          this.router.navigate(['dashboard/deliveries-list']);
          
        },
        (error) => {
          // Handle error response
          console.error('Error creating delivery:', error);
        }
      );
    } else {
      console.log('Form Invalid');
    }
  }
}

