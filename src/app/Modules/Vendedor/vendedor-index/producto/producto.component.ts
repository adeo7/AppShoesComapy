import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CategoriasService } from 'src/app/Core/categorias.service';
import { ImagenProductoService } from 'src/app/Core/imagen-producto.service';
import { ProductoService } from 'src/app/Core/producto.service';
import { TallasService } from 'src/app/Core/tallas.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  listPrdocutos: any[] = []
  listCategorias: any[] = []
  listTallas: any[] = []
  id:any=0
  local:any
  constructor(private service: ProductoService,
    private serviceFoto: ImagenProductoService,
    private serviceCategorias: CategoriasService,
    private serviceTallas: TallasService,
    private router:Router
  ) {}

  ngOnInit(): void {
    let lol =localStorage.getItem('local')
    if (lol) {
      this.local=JSON.parse(lol);
    }
    this.getlist()
  }

  getlist() {
    let productos:any[]=[]
    this.service.getAll().subscribe(result=>{
    productos=result
    productos.forEach(element => {
      if (element.local==this.local.id) {
        this.listPrdocutos.push(element);
      }
    });
    });
  }
  edit(id:any){
    this.router.navigateByUrl('vendedor/editar/'+id)
  }
  agregar(){
    this.router.navigateByUrl('vendedor/agregar')
  }
  eliminar(id:any){
    alert('estas eliminado el producto')
    this.service.delete(id).subscribe(result=>{
      console.log("elimando")
      this.getlist();
    });
  }
}
