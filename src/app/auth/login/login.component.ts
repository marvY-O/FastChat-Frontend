import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ErrorResponse, GenericResponse, LoginUser, LoginUserResponse } from '../../auth.interface';
import { AuthService } from '../../services/auth/auth.service';
import { ToolbarComponent } from '../../toolbar/toolbar.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, NgIf, RouterLink, ToolbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getErrorMessage(field: string){
    if (this.loginForm.get(field)?.hasError('required')){
      return 'Field cannot be left blank!';
    }
    else if (this.loginForm.get(field)?.hasError('email')){
      return 'Invalid email!';
    }
    else if (this.loginForm.get(field)?.hasError('minlength')){
      return 'Password must be at least 6 characters long.'
    }
    return 'error';
  }

  onSubmit(){
    if (this.loginForm.invalid){
      return
    }
    
    let loginUser: LoginUser;
    loginUser = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    }

    this.authService.login(loginUser).subscribe(
      (response: LoginUserResponse | GenericResponse)=>{
        console.log(response);
      }
    );
  }
}
