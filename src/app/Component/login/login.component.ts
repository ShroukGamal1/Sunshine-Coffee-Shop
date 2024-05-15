import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../Service/Account-Service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  token:string='';

  constructor(public loginservice:AccountService, public router: Router,
    public activatedRoute: ActivatedRoute) {
    
  }
  LoginForm=new FormGroup({
    email :new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    rememberMe:new FormControl(false)
  });

  get GetEmail() {
    return this.LoginForm.controls['email'];
  }
  get GetPassword() {
    return this.LoginForm.controls['password'];
  }
  get GetRemember() {
    return this.LoginForm.controls['rememberMe'];
  }
 Login(){
  this.loginservice.Login(this.LoginForm.value).subscribe({
    next: (data) => {
      this.token=data.token;
      localStorage.setItem("token",this.token);
      console.log(data.token);
      this.router.navigate(['/Product/:id/edit']);
    },
  });
   
  }

   
 }
  