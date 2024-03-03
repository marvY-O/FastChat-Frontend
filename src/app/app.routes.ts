import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { inject } from '@angular/core';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
    { path: '', component: WelcomeComponent, canActivate: [() => !inject(AuthService).isAuthenticated()]},
    { path: 'login', component: LoginComponent, canActivate: [() => !inject(AuthService).isAuthenticated()]},
    { path: 'signup', component: SignupComponent, canActivate: [() => !inject(AuthService).isAuthenticated()]},
    { path: 'home', component: HomeComponent, canActivate: [() => inject(AuthService).isAuthenticated()]}
];
