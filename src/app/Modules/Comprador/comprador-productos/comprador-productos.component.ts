import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ImagenProductoService } from 'src/app/Core/imagen-producto.service';
import { ProductoService } from 'src/app/Core/producto.service';

@Component({
  selector: 'app-comprador-productos',
  templateUrl: './comprador-productos.component.html',
  styleUrls: ['./comprador-productos.component.css']
})
export class CompradorProductosComponent implements OnInit{
  listProductos:any[]=[]
constructor(private service: ProductoService,
            private serviceFoto:ImagenProductoService,
            private router:Router      
){}

ngOnInit(): void {
 this.getList(); 
 console.log(this.listProductos)
}

getList(){
  let listFotoProductos: any[] = [];
  let listFotosP: any[] = [];
  let productos: any[] = [];

  forkJoin([
    this.service.getAll(),
    this.serviceFoto.getAll()
  ]).subscribe(
    ([productosResult, fotosResult]) => {
      productos = productosResult;
      listFotoProductos = fotosResult;
      
      console.log(productos);
      console.log(listFotoProductos);

      for (let i = 0; i < productos.length; i++) {
        for (let j = 0; j < listFotoProductos.length; j++) {
          if (productos[i].id == listFotoProductos[j].producto) {
            listFotosP.push(listFotoProductos[j].image_path);
          }
        }
        let producto = {
          "id": productos[i].id,
          "nombre": productos[i].nombre,
          "precio": productos[i].precio,
          "color": productos[i].color,
          "marca": productos[i].marca,
          "genero": productos[i].genero,
          "disponibles": productos[i].disponible,
          "fotos": listFotosP
        };
        this.listProductos.push(producto);
        listFotosP = []; // Reinicia la lista para el próximo producto
      }
    },
    error => {
      // Manejo de errores si es necesario
      console.error(error);
    }
  );
}
verProducto(id:any){
this.router.navigateByUrl('producto/'+id)
}
}
