import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './dashboardPages/main/main.component';
import { DriversListComponent } from './dashboardPages/drivers-list/drivers-list.component';
import { ClientsListComponent } from './dashboardPages/clients-list/clients-list.component';
import { authGuard } from '../../services/guard/auth.guard';
import { DriverDetailsComponent } from './dashboardPages/driver-details/driver-details.component';
import { ClientDetailsComponent } from './dashboardPages/client-details/client-details.component';
import { UsersListComponent } from './dashboardPages/users-list/users-list.component';
import { UserDetailsComponent } from './dashboardPages/user-details/user-details.component';
import { ProfileComponent } from './dashboardPages/profile/profile.component';
import { DeliveriesListComponent } from './dashboardPages/deliveries-list/deliveries-list.component';
import { DeliveryDetailsComponent } from './dashboardPages/delivery-details/delivery-details.component';
import { DeliveryFormComponent } from './dashboardPages/delivery-form/delivery-form.component';

const routes: Routes = [
  { 
    path: '',
    component: MainComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'profile/:id',
        component: ProfileComponent,
        canActivate: [authGuard]

      },
      {
        path: 'drivers-list',
        component: DriversListComponent,
        canActivate: [authGuard]

      },
      {
        path: 'clients-list',
        component: ClientsListComponent,
        canActivate: [authGuard]

      },
      {
        path: 'users-list',
        component: UsersListComponent,
        canActivate: [authGuard]

      },
      {
        path: 'driver-details/:id',
        component: DriverDetailsComponent,
        canActivate: [authGuard],
        canActivateChild: [() => {
          console.log('Driver details route activated');
          return true;
        }]

      },
      {
        path: 'client-details/:id',
        component: ClientDetailsComponent,
        canActivate: [authGuard]

      },
      {
        path: 'user-details/:id',
        component: UserDetailsComponent,
        canActivate: [authGuard]

      },
      {
        path: 'deliveries-list',
        component: DeliveriesListComponent,
        canActivate: [authGuard]

      },
      {
        path: 'delivery/:id',
        component: DeliveryDetailsComponent,
        canActivate: [authGuard]

      },
      {
        path: 'delivery-form/:id',
        component: DeliveryFormComponent,
        canActivate: [authGuard]

      },
    ]
  }
 
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
