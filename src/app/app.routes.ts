import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { guestGuard } from './auth/guards/guest.guard';
import { userGuard } from './auth/guards/user.guard';

export const routes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [guestGuard]},
    { path: 'login', component: LoginComponent, canActivate: [guestGuard]},
    { path: 'signup', component: SignupComponent, canActivate: [guestGuard]},
    { path: 'home', component: HomeComponent, canActivate: [userGuard]}
];
