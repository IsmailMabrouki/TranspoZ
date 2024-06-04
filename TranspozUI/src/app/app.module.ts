import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import {HttpTokenInterceptor} from './services/interceptor/http-token.interceptor';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import {CodeInputModule} from 'angular-code-input';
import { AboutUsComponent } from './modules/dashboard/dashboardComponents/about-us/about-us.component';
import { ContactUsComponent } from './modules/dashboard/dashboardComponents/contact-us/contact-us.component';
import { FooterComponent } from './modules/dashboard/dashboardComponents/footer/footer.component';
import { MainComponent } from './modules/dashboard/dashboardPages/main/main.component';
import { MenuComponent } from './modules/dashboard/dashboardComponents/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ActivateAccountComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CodeInputModule,
    ReactiveFormsModule

  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
