import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { PqrsRespuestaService } from 'src/app/Core/pqrs-respuesta.service';
import { PqrsService } from 'src/app/Core/pqrs.service';
import { PqrstipoService } from 'src/app/Core/pqrstipo.service';

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css']
})
export class PQRSComponent implements OnInit {

  // listPqrs: any[] = []
  // listPqrsRespuesta: any[] = []
  // listPqrstipo: any[] = []
  // frmPqr: FormGroup;
  // constructor(private service: PqrsService,
  //   private serviceRespuesta: PqrsRespuestaService,
  //   private serviceTipo: PqrstipoService
  // ) {
  //   this.frmPqr = new FormGroup({
  //     numero_radicado: new FormControl(null, [Validators.required]),
  //     tipo_peticion: new FormControl(null, [Validators.required]),
  //     descripcion: new FormControl(null, [Validators.required]),
  //     fecha_respuesta: new FormControl(null, [Validators.required]),
  //     local_peticion: new FormControl(null, [Validators.required]),
  //     nit_local: new FormControl(null, [Validators.required]),
  //     nombre_usuario: new FormControl(null, [Validators.required]),
  //     apellidos_usuario: new FormControl(null, [Validators.required]),
  //     direccion_usuario: new FormControl(null, [Validators.required]),
  //     tipo_documento: new FormControl(null, [Validators.required]),
  //     documento: new FormControl(null, [Validators.required]),
  //     telefono_usuario: new FormControl(null, [Validators.required])
  //   })
  // }

  // ngOnInit(): void {
  //   this.getlist();
  // }
  // getlist() {
  //   forkJoin([
  //     this.service.getAll(),
  //     this.serviceRespuesta.getAll(),
  //     this.serviceTipo.getAll(),
  //   ]).subscribe(
  //     ([result, respuestaResult, tipoResult]) => {
  //       this.listPqrs = result;
  //       this.listPqrsRespuesta = respuestaResult;
  //       this.listPqrstipo = tipoResult;
  //       console.log("pqr: "+result)
  //     },
  //     error => {
  //       console.error(error);
  //     });
  // }
  listPqrs: any[] = [];
  listPqrsRespuesta: any[] = [];
  listPqrstipo: any[] = [];
  frmPqr: FormGroup;
  selectedPqr: any;
  responderParams: any;

  @ViewChild('responderModal', { static: false }) responderModal?: ElementRef;

  constructor(
    private service: PqrsService,
    private serviceRespuesta: PqrsRespuestaService,
    private serviceTipo: PqrstipoService,
  ) {
    this.frmPqr = new FormGroup({
      numero_radicado: new FormControl(null, [Validators.required]),
      tipo_peticion: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      fecha_respuesta: new FormControl(null, [Validators.required]),
      local_peticion: new FormControl(null, [Validators.required]),
      nit_local: new FormControl(null, [Validators.required]),
      nombre_usuario: new FormControl(null, [Validators.required]),
      apellidos_usuario: new FormControl(null, [Validators.required]),
      direccion_usuario: new FormControl(null, [Validators.required]),
      tipo_documento: new FormControl(null, [Validators.required]),
      documento: new FormControl(null, [Validators.required]),
      telefono_usuario: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.getlist();
  }

  mostrarDetalles(pqr: any) {
    this.selectedPqr = pqr;
  }

  abrirModalResponder(pqr: any) {
    this.responderParams = {
      id: pqr.id,
      numero_radicado: pqr.numero_radicado,
      tipo_peticion: pqr.tipo_peticion,
      descripcion: pqr.descripcion,
      fecha_respuesta: pqr.fecha_respuesta,
      local_peticion: pqr.local_peticion,
      nit_local: pqr.nit_local,
      nombre_usuario: pqr.nombre_usuario,
      apellidos_usuario: pqr.apellidos_usuario,
      direccion_usuario: pqr.direccion_usuario,
      tipo_documento: pqr.tipo_documento,
      documento: pqr.documento,
      telefono_usuario: pqr.telefono_usuario
    };
    this.responderModal?.nativeElement.show();
  }

  getlist() {
    forkJoin([
      this.service.getAll(),
      this.serviceRespuesta.getAll(),
      this.serviceTipo.getAll(),
    ]).subscribe(
      ([result, respuestaResult, tipoResult]) => {
        this.listPqrs = result;
        this.listPqrsRespuesta = respuestaResult;
        this.listPqrstipo = tipoResult;
      },
      error => {
        console.error(error);
      });
  }

  responderpqrs() {
    if (this.frmPqr.valid) {
      const data = this.frmPqr.value;
      this.serviceRespuesta.responder(data).subscribe(
        (respuesta) => {
          console.log('Respuesta a la PQRS enviada con éxito', respuesta);
          this.frmPqr.reset();
        },
        (error) => {
          console.error('Error al responder a la PQRS', error);
        }
      );
    } else {
      console.log('Formulario no válido. Realiza las validaciones necesarias.');
    }
  }
}
