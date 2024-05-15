import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../Service/Account-Service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    name : new FormControl('',[Validators.required, Validators.pattern("^[a-zA-Z0-9]{8,}$")]), 
    email : new FormControl(""), 
    password : new FormControl(""), 
    confirmPassword: new FormControl(""),
    address: new FormControl(""),
    phone: new FormControl(""),
  });

  constructor(
    public accountservice: AccountService,
    public activatedRoute: ActivatedRoute
  ) {}
  
  get getName(){
    return this.registerForm.controls.name;
  }
  
  get getEmail(){
    return this.registerForm.controls.email;
  }
  
  get getPassword(){
    return this.registerForm.controls.password;
  }
  get getConfirmPassword(){
    return this.registerForm.controls.confirmPassword;
  }
  get getAddress(){
    return this.registerForm.controls.address;
  }
  
  get getPhone(){
    return this.registerForm.controls.phone;
  }

  
  registerHandler(){
    if(this.registerForm.status=="VALID"){
      console.log(this.registerForm.value);
      let obj = {
        "name": this.getName.value,
        "email": this.getEmail.value,
        "password": this.getPassword.value,
        "confirmedPassword": this.getConfirmPassword.value,
        "address": this.getAddress.value,
        "phone": this.getPhone.value,
      } 
      this.accountservice.Register(obj).subscribe({
        next:(data)=>{
          console.log(data);
        },
        error:(e)=>{
          console.log(e);

        }
      });
      // console.log("added successfully");
    }
    
  }
}
