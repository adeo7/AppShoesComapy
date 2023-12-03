import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/Core/producto.service';

@Component({
  selector: 'producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoCompradorComponent implements OnInit{
  producto:any;
  id:any;
  constructor(private service:ProductoService,
              private activeRouter:ActivatedRoute
    ){
      this.id=activeRouter.snapshot.params['id'];
  }
  ngOnInit(): void {
   this.getList(); 
  }
  getList(){
    this.service.getById(this.id).subscribe(result=>{
      this.producto=result
      console.log(result)
    },
    error=>{
      console.log(error) 
    }
    );
  }
  agregarCarrito(){
    
  }

}
