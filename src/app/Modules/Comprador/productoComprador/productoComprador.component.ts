import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';
import { CarritoDetallesService } from 'src/app/Core/carrito-detalles.service';
import { GetProductosService } from 'src/app/Core/get-productos.service';
import { ProductoService } from 'src/app/Core/producto.service';

@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoCompradorComponent implements OnInit{
  carrito:any[]=[]
  producto:any;
  Usuario:any
  id:any;
  disponible:number=0
  cantidad=0
  precio=0
  constructor(private service:ProductoService,
              private activeRouter:ActivatedRoute,
              private getProducto: GetProductosService,
              private carritoDservice:CarritoDetallesService,
              private aunthService: AuthService
    ){
      this.id=activeRouter.snapshot.params['id'];
  }
  ngOnInit(): void {
   this.getList(); 
  }

  getList(){
    if (this.aunthService.isLoggedIn()) {
      this.service.getById(this.id).subscribe(result=>{
        this.producto=result
        this.disponible=result.disponible
      },
      error=>{
        console.log(error) 
      }
      );
    } else {
      this.getProducto.getById(this.id).subscribe(result=>{
        this.producto=result
        this.disponible=result.disponible
      },
      error=>{
        console.log(error) 
      }
      );
    }

  }
  //aca se guarda el producto del carrito
  agregarCarrito(id:any){
    let data={
      "cantidad ":this.cantidad,
     " precio ": this.precio, 
      "impuesto":0,
     " total":this.cantidad*this.precio,
      "producto_id": id,
      "usuario_id ": this.Usuario.id
    }
    this.carritoDservice.save(data).subscribe(result=>{
      console.log("carrito agregado")
    },
    error=>{
      console.log(error)
    });
  }

}
