import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Core/auth.service';
import { CarritoDetallesService } from 'src/app/Core/carrito-detalles.service';
import { ProductoService } from 'src/app/Core/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit{
  total=0
  cantidad=0
  descuento=0
  subtotal=0
  Usuario:any
  carrito:any[]=[]
  ListProductos:any[]=[]
  
  // funcionamiento de los botones
  myNumber: number = 0;

  constructor(private service: CarritoDetallesService,
              private authService: AuthService
    ){
      this.Usuario=authService.getUserData();
    }

  ngOnInit(): void {
 
    this.getCarrito()
  }
  increment() {
    this.myNumber++;
  }

  decrement() {
    if (this.myNumber > 0) {
      this.myNumber--;
    }
  }
  getCarrito(){
    let producto:any
    this.service.getAll().subscribe(result=>{
    producto=result
    this.ListProductos=Object.values(producto)
      console.log(result)
    },
    error=>{
      console.log(error)
    })
  }
}
