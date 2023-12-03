import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { ImagenProductoService } from 'src/app/Core/imagen-producto.service';
import { ProductoService } from 'src/app/Core/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit{
listPrdocutos:any[]=[]
  constructor(private service:ProductoService,
              private serviceFoto:ImagenProductoService
    ){}

  ngOnInit(): void {
    
  }
  getlist(){
    let productos:any[]=[]
    let fotos:any[]=[]
    forkJoin([
      this.service.getAll(),
      this.serviceFoto.getAll()
    ]).subscribe(
      ([Result, fotoResult]) => {
        productos=Result
        fotos=fotoResult;
        for (let i = 0; i < productos.length; i++) {
          for (let j = 0; j < fotos.length; j++) {
          
          }
        }
        
      },
      error => {
        // Manejo de errores si es necesario
        console.error(error);
      }
    );
  }
}
