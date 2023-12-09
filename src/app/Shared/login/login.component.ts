import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 public frmLongin:FormGroup;

constructor(private authService:AuthService, private router:Router ){
  this.frmLongin=new FormGroup({
   username:new FormControl(null,[Validators.required]), 
   password:new FormControl(null,[Validators.required]) 
  });
}
ngOnInit(): void {
  
}
login():void{
let credentials={
"username":this.frmLongin.controls['username'].value,
"password":this.frmLongin.controls['password'].value
}
if (this.frmLongin.invalid) {
  alert("no es correcto")
  return
}
this.authService.login(credentials).subscribe(result=>{
  console.log(this.authService.getUserData())
  this.router.navigateByUrl('/Vendedor')
  alert(" es correcto")
},
error=>{
  alert("error")
  console.log(error)
})
}
cerrar(){
  this.authService.logout();
}

}
