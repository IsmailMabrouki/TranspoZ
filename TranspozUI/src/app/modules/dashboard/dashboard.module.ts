import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MainComponent } from './dashboardPages/main/main.component';
import { MenuComponent } from './dashboardComponents/menu/menu.component';
import { DriversListComponent } from './dashboardPages/drivers-list/drivers-list.component';
import { DriverCardComponent } from './dashboardComponents/driver-card/driver-card.component';
import { ClientsListComponent } from './dashboardPages/clients-list/clients-list.component';
import { ClientCardComponent } from './dashboardComponents/client-card/client-card.component';
import { DriverDetailsComponent } from './dashboardPages/driver-details/driver-details.component';
import { ClientDetailsComponent } from './dashboardPages/client-details/client-details.component';
import { UsersListComponent } from './dashboardPages/users-list/users-list.component';
import { UserDetailsComponent } from './dashboardPages/user-details/user-details.component';
import { UserCardComponent } from './dashboardComponents/user-card/user-card.component';
import { UpdateUserComponent } from './dashboardPages/update-user/update-user.component';
import { ProfileComponent } from './dashboardPages/profile/profile.component';
import { DeliveriesListComponent } from './dashboardPages/deliveries-list/deliveries-list.component';
import { DeliveryCardComponent } from './dashboardComponents/delivery-card/delivery-card.component';
import { DeliveryDetailsComponent } from './dashboardPages/delivery-details/delivery-details.component';
import { DeliveryFormComponent } from './dashboardPages/delivery-form/delivery-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './dashboardComponents/footer/footer.component';
import { AboutUsComponent } from './dashboardComponents/about-us/about-us.component';
import { ContactUsComponent } from './dashboardComponents/contact-us/contact-us.component';
import { TestimonialsComponent } from './dashboardComponents/testimonials/testimonials.component';
import { HeroSectionComponent } from './dashboardComponents/hero-section/hero-section.component';


@NgModule({
  declarations: [
    MainComponent,
    MenuComponent,
    DriversListComponent,
    DriverCardComponent,
    ClientsListComponent,
    ClientCardComponent,
    DriverDetailsComponent,
    ClientDetailsComponent,
    UsersListComponent,
    UserDetailsComponent,
    UserCardComponent,
    UpdateUserComponent,
    ProfileComponent,
    DeliveriesListComponent,
    DeliveryCardComponent,
    DeliveryDetailsComponent,
    DeliveryFormComponent,
    FooterComponent,
    AboutUsComponent,
    ContactUsComponent,
    TestimonialsComponent,
    HeroSectionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
