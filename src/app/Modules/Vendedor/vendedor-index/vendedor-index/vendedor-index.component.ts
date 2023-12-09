import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/auth.service';

@Component({
  selector: 'app-vendedor-index',
  templateUrl: './vendedor-index.component.html',
  styleUrls: ['./vendedor-index.component.css']
})
export class VendedorIndexComponent implements OnInit{

  constructor(private service: AuthService, private router: Router){}

  ngOnInit(): void {
    
  }
  cerrar(){
this.service.logout();
this.router.navigateByUrl('');
  }
}
