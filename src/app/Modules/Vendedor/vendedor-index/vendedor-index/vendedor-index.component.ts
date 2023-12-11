import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { LocalesService } from 'src/app/Core/locales.service';

@Component({
  selector: 'app-vendedor-index',
  templateUrl: './vendedor-index.component.html',
  styleUrls: ['./vendedor-index.component.css']
})
export class VendedorIndexComponent implements OnInit{
  local:any
  usuario:any;

  constructor(private service: AuthService, private router: Router, private serviceLocal:LocalesService){}

  ngOnInit(): void {
    let usu=localStorage.getItem('usuario')
    if (usu) {
      this.usuario=JSON.parse(usu)
    }
    this.obtenerInfo();
  }
  cerrar(){
this.service.logout();
this.router.navigateByUrl('login');
localStorage.removeItem('usuario')
  }
  obtenerInfo(){
    this.serviceLocal.getById(this.usuario.id).subscribe(result=>{
      let dato=result
      localStorage.setItem('local',JSON.stringify(dato))
    });
  }
}
