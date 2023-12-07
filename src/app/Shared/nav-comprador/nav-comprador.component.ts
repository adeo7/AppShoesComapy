import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { LocalesService } from 'src/app/Core/locales.service';

@Component({
  selector: 'app-nav-comprador',
  templateUrl: './nav-comprador.component.html',
  styleUrls: ['./nav-comprador.component.css']
})
export class NavCompradorComponent {
  listaLocales: any[] = []
  constructor(private service: LocalesService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.getList();

  }

  getList() {
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
