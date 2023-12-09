import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { LocalesService } from 'src/app/Core/locales.service';

@Component({
  selector: 'app-nav-comprador',
  templateUrl: './nav-comprador.component.html',
  styleUrls: ['./nav-comprador.component.css']
})
export class NavCompradorComponent {
  listaLocales: any[] = []
  Usuario:any
  constructor(private service: LocalesService,
    private router: Router,
    private auth :AuthService

  ) { 
   this.Usuario=auth.getUserData()
  }

  ngOnInit(): void {
    this.getList();
    console.log(this.Usuario)
  }

  getList() {
    this.Usuario=this.auth.getUserData()
    this.service.getAll().subscribe(result => {
      this.listaLocales = result;
      console.log(this.listaLocales)

    },
      error => {
        console.log(error)
      });
  }
  verLocal(id: any) {
    this.router.navigateByUrl('/local/' + id)
  }

}
