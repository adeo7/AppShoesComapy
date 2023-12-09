import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { UsuarioService } from 'src/app/Core/usuario.service';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  public registroForm: FormGroup;
  documentTypes = ['Tipo 1', 'Tipo 2', 'Tipo 3'];

  constructor(private serviceUsuario: UsuarioService, private router: Router) {
    this.registroForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      username: new FormControl(null, [Validators.required]),
      lastName: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.pattern("^((\\+57-?)|0)?[0-9]{10}$")]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      documentType: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
      birthDate: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
      terms: new FormControl(false, [Validators.pattern('true')])
    });
  }


  ngOnInit() {

  }
  registro(): void {
    let datos = {
    "firstName":this.registroForm.controls['firstName'].value,
    "lastName":this.registroForm.controls['lastName'].value,
    "username":this.registroForm.controls['username'].value,
    "address":this.registroForm.controls['address'].value,
    "phone":this.registroForm.controls['phone'].value,
    "email":this.registroForm.controls['email'].value,
    "documentType":this.registroForm.controls['documentType'].value,
    "documentNumber":this.registroForm.controls['documentNumber'].value,
    "birthDate":this.registroForm.controls['birthDate'].value,
    "password":this.registroForm.controls['password'].value,
    "confirmPassword":this.registroForm.controls['confirmPassword'].value,
    "terms":this.registroForm.controls['terms'].value
    }
    if (this.registroForm.invalid) {
      return
    }
    this.serviceUsuario.save(datos).subscribe(result=>{
      alert("Registrado")
    },
    error=>{
      console.log(error)
    })
  }

  // checkPasswords(group: FormGroup) {
  //   let pass = group.controls.password.value;
  //   let confirmPass = group.controls.confirmPassword.value;

  //   return pass === confirmPass ? null : { notSame: true }
  // }

  // onSubmit() {
  //   console.log(this.registroForm.value);
  // }
}