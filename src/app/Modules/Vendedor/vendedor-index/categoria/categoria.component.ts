import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/Core/categorias.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  listCategorias:any[]=[];
  frmCategoria:FormGroup;

  constructor(private service: CategoriasService,
              
    ){
      this.frmCategoria=new FormGroup({
        nombre:new FormControl(null,[Validators.required])
      });
    }

  ngOnInit(): void {
    this.getList();
    this.getList();
  }
  getList(){
    this.service.getAll().subscribe(result=>{
      this.listCategorias = result;
    })
  }

}
