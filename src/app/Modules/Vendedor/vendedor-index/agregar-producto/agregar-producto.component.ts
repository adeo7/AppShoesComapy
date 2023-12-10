import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { CategoriasService } from 'src/app/Core/categorias.service';
import { ImagenProductoService } from 'src/app/Core/imagen-producto.service';
import { ProductoService } from 'src/app/Core/producto.service';
import { TallasService } from 'src/app/Core/tallas.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  listPrdocutos: any[] = []
  listCategorias: any[] = []
  listTallas: any[] = []
  id=0
  public FrmProducto: FormGroup
  constructor(private service: ProductoService,
    private serviceFoto: ImagenProductoService,
    private serviceCategorias: CategoriasService,
    private serviceTallas: TallasService,
  ) {
    this.FrmProducto = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      precio: new FormControl(null, [Validators.required]),
      marca: new FormControl(null, [Validators.required]),
      genero: new FormControl(null, [Validators.required]),
      talla: new FormControl(null, [Validators.required]),
      disponibles: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      imgProducto: new FormControl(null, [Validators.required])
      // falta para almacenar la imagen
    });
  }

  ngOnInit(): void {
    this.getlist();
  }
  getlist() {
    let productos: any[] = []
    let fotos: any[] = []
    forkJoin([
      this.service.getAll(),
      this.serviceFoto.getAll(),
      this.serviceCategorias.getAll(),
      this.serviceTallas.getAll()
    ]).subscribe(
      ([Result, fotoResult, resultCate, resultTallas]) => {
        productos = Result
        fotos = fotoResult;
        this.listCategorias = resultCate;
        this.listTallas = resultTallas;
        this.listPrdocutos = productos
      },
      error => {
        // Manejo de errores si es necesario
        console.error(error);
      }
    );
  }
  guardar(){
    if (this.FrmProducto.invalid) {
      console.log("falto")
    }
    let data={
      "nombre": this.FrmProducto.controls['nombre'].value,
      "descripcion":this.FrmProducto.controls['descripcion'].value,
      "marca":this.FrmProducto.controls['marca'].value,
      "precio":this.FrmProducto.controls['precio'].value,
      "color": this.FrmProducto.controls['color'].value,
      "genero": this.FrmProducto.controls['genero'].value,
      "disponible": this.FrmProducto.controls['disponibles'].value,
      "categoria_id": this.FrmProducto.controls['categoria'].value,
      "talla_id": this.FrmProducto.controls['talla'].value,
      "local_usuario_id": 1
    }
    console.log(data)
    // this.service.save(data, this.id).subscribe(result=>{
    //   alert('producto guardado')
    //   this.getlist();
    // },
    // error=>{
    //   console.log(error)
    // })
  }
}
