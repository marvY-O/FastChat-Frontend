import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ErrorResponse, GenericResponse, RegisterUser } from '../../auth.interface';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { ToolbarComponent } from '../../toolbar/toolbar.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, NgIf, RouterLink, ToolbarComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  

  constructor(private fb: FormBuilder, private authService: AuthService, private snackbarService: SnackbarService) {
    this.signupForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getErrorMessage(field: string){
    if (this.signupForm.get(field)?.hasError('required')){
      return 'Field cannot be left blank!';
    }
    else if (this.signupForm.get(field)?.hasError('email')){
      return 'Invalid email!';
    }
    else if (this.signupForm.get(field)?.hasError('minlength')){
      return 'Password must be at least 6 characters long.'
    }
    return 'error';
  }

  onSubmit(){
    if (this.signupForm.invalid){
      return
    }
    
    let registerUser: RegisterUser;
    registerUser = {
      first_name: this.signupForm.get('first_name')?.value,
      last_name: this.signupForm.get('last_name')?.value,
      email: this.signupForm.get('email')?.value,
      password: this.signupForm.get('password')?.value
    }

    this.authService.register(registerUser).subscribe(
      (response: GenericResponse|ErrorResponse)=>{
        if ('error' in response){
          this.snackbarService.open(response.error);
        }
        else{
          this.snackbarService.open(response.message);
        }
      }
    );
  }
}
