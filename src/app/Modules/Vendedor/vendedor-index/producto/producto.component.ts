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
  public FrmProducto: FormGroup
  constructor(private service: ProductoService,
    private serviceFoto: ImagenProductoService,
    private serviceCategorias: CategoriasService,
    private serviceTallas: TallasService,
    private router:Router
  ) {
    this.FrmProducto = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      marca: new FormControl(null, [Validators.required]),
      genero: new FormControl(null, [Validators.required]),
      talla: new FormControl(null, [Validators.required]),
      disponibles: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      categoria: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getlist()
    this.getlist()
    this.getlist()
    this.getlist()
   
  }

  getlist() {
    this.service.getAll().subscribe(result=>{
      this.listPrdocutos=result
    });
    this.serviceCategorias.getAll().subscribe(result=>{
      this.listCategorias=result
    });
    this.serviceTallas.getAll().subscribe(result=>{
      this.listTallas=result
    });
  }
  edit(id:any){
    this.id=id
    
    this.service.getById(id).subscribe(result=>{
      console.log(result.id)
      this.FrmProducto.controls['nombre'].setValue(result.nombre)
      this.FrmProducto.controls['precio'].setValue(result.precio)
      this.FrmProducto.controls['marca'].setValue(result.marca)
      this.FrmProducto.controls['genero'].setValue(result.genero)
      this.FrmProducto.controls['talla'].setValue(result.talla)
      this.FrmProducto.controls['color'].setValue(result.nombre)
      this.FrmProducto.controls['disponibles'].setValue(result.nombre)
    })
  }
  agregar(){
    this.router.navigateByUrl('vendedor/agregar')
  }
}
