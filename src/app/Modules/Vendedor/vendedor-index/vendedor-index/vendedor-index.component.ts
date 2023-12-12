import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-vendedor-index',
  templateUrl: './vendedor-index.component.html',
  styleUrls: ['./vendedor-index.component.css']
})
export class VendedorIndexComponent implements OnInit{

  usuario:any;

  constructor(private service: AuthService, private router: Router){}

  ngOnInit(): void {
    let usu=localStorage.getItem('usuario')
    if (usu) {
      this.usuario=JSON.parse(usu)
    }
  }
  cerrar(){
this.service.logout();
this.router.navigateByUrl('login');
  }
}
