import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { authGuard } from './services/guard/auth.guard';
import { AboutUsComponent } from './modules/dashboard/dashboardComponents/about-us/about-us.component';
import { ContactUsComponent } from './modules/dashboard/dashboardComponents/contact-us/contact-us.component';
import { MainComponent } from './modules/dashboard/dashboardPages/main/main.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeComponent
  }, 
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
