import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
export class ProductoComponent implements OnInit{
listPrdocutos:any[]=[]
listCategorias:any[]=[]
listTallas:any[]=[]
public FrmProducto:FormGroup
  constructor(private service:ProductoService,
              private serviceFoto:ImagenProductoService,
              private serviceCategorias:CategoriasService,
              private serviceTallas:TallasService,
    ){
      this.FrmProducto=new FormGroup({
        nombre:new FormControl(null,[Validators.required]),
        precio:new FormControl(null,[Validators.required]),
        marca:new FormControl(null,[Validators.required]),
        genero:new FormControl(null,[Validators.required]),
        talla:new FormControl(null,[Validators.required]),
        disponibles:new FormControl(null,[Validators.required]),
        color:new FormControl(null,[Validators.required])
      });
    }

  ngOnInit(): void {
   this.getlist(); 
  }
  getlist(){
    let productos:any[]=[]
    let fotos:any[]=[]
    forkJoin([
      this.service.getAll(),
      this.serviceFoto.getAll(),
      this.serviceCategorias.getAll(),
      this.serviceTallas.getAll()
    ]).subscribe(
      ([Result, fotoResult, resultCate, resultTallas]) => {
        productos=Result
        fotos=fotoResult;
        this.listCategorias=resultCate;
        this.listTallas=resultTallas;
        // for (let i = 0; i < productos.length; i++) {
        //   for (let j = 0; j < fotos.length; j++) {
            
        //   }
        // }
        this.listPrdocutos=productos
      },
      error => {
        // Manejo de errores si es necesario
        console.error(error);
      }
    );
  }
}
