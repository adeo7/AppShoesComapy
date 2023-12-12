import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Core/auth.service';
import { LocalesService } from 'src/app/Core/locales.service';
import { PqrsService } from 'src/app/Core/pqrs.service';

@Component({
  selector: 'app-pqrs-form',
  templateUrl: './pqrs-form.component.html',
  styleUrls: ['./pqrs-form.component.css']
})
export class PqrsFormComponent implements OnInit{
  listLocales:any[]=[]
  formPqr:FormGroup
  usuario:any
  id=0
  constructor(private service:PqrsService,
              private serviceLocales:LocalesService,
              private auth:AuthService,
              private toars:ToastrService
      ){
        this.formPqr=new FormGroup({
          local:new FormControl(null,[Validators.required]),
          descripcion:new FormControl(null,[Validators.required])
        })
      }

  ngOnInit(): void {
    let usu=localStorage.getItem('usuario')
    if (usu) {
      this.usuario=JSON.parse(usu)
    }
    this.getList();
  }

  getList(){
    this.serviceLocales.getAll().subscribe(result=>{
      this.listLocales=result;
    })
  }
  enviarPqr(){
    let  data={  
       "num_radicado": 3636,
       "peticion_pqr_id": 1,
       "descripcion": this.formPqr.controls['descripcion'].value,
       "local_id": this.formPqr.controls['local'].value,
       "usuario_id": this.usuario.id
   } 
   console.log(data)
  //  this.service.save(data, this.id).subscribe(result=>{
  //    this.toars.success(this.usuario.username+' tu peticion fue enviada correctamente', 'ShoesCompay')
  //  })
   }
}
