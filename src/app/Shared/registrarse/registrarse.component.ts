import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { PhoneNumberUtil } from 'google-libphonenumber';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { UsuarioService } from 'src/app/Core/usuario.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent implements OnInit {
  separateDialCode = false;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];


  mostrarContrasenaConfirmar = false;

  toggleMostrarContrasenaConfirmar() {
    this.mostrarContrasenaConfirmar = !this.mostrarContrasenaConfirmar;
  }
  mostrarContrasena = false;

  toggleMostrarContrasena() {
    this.mostrarContrasena = !this.mostrarContrasena;
  }
  // ---

  public registroForm: FormGroup;
  documentTypes = ['CC', 'TI', 'CE'];

  constructor(private serviceUsuario: UsuarioService, private router: Router, private authService: AuthService,
              private toars:ToastrService
    ) {
    this.registroForm = new FormGroup({
      firstName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      username: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]),
      lastName: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      address: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      documentType: new FormControl(null, [Validators.required]),
      documentNumber: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9._*]*')]),
      confirmPassword: new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z0-9._*]*')]),
      terms: new FormControl(false, [Validators.pattern('true')])
    });
  }


  ngOnInit() {

  }

  registro(): void {
    if (this.registroForm.invalid) {
      alert("completa los campos")
      return
    } else {

      let pas = this.registroForm.controls['password'].value
      let confiPas = this.registroForm.controls['confirmPassword'].value
      if (pas!=confiPas) {
       this.toars.error('Ingresa tu contraseña bien')
      }
       else {
        let phoneNumber = this.registroForm.controls['phone'].value;
        let formattedPhoneNumber = phoneNumber.internationalNumber;
        console.log(formattedPhoneNumber)
        let data = {
          "password": this.registroForm.controls['password'].value,
          "username": this.registroForm.controls['username'].value,
          "name": this.registroForm.controls['firstName'].value,
          "last_name": this.registroForm.controls['lastName'].value,
          "email": this.registroForm.controls['email'].value,
          "direccion": this.registroForm.controls['address'].value,
          "telefono": formattedPhoneNumber,
          "tipo_documento": this.registroForm.controls['documentType'].value,
          "documento": this.registroForm.controls['documentNumber'].value,
          "roles_id": null,  
        }
        this.serviceUsuario.save(data).subscribe(result => {
          alert("Registrado")
          let credentials = {
            "username": this.registroForm.controls['username'].value,
            "password": this.registroForm.controls['password'].value
          }
          this.authService.login(credentials).subscribe(result => {
            console.log(this.authService.getUserData())
            this.router.navigateByUrl('')
          },
            error => {
              console.log(error)
            });
        },
          error => {
            console.log(error)
          })
      }
    }
  }
}