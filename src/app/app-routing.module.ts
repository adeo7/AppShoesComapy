import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendedorIndexComponent } from './Modules/Vendedor/vendedor-index/vendedor-index/vendedor-index.component';
import { ProductoComponent } from './Modules/Vendedor/vendedor-index/producto/producto.component';
import { PedidosComponent } from './Modules/Vendedor/vendedor-index/pedidos/pedidos.component';
import { OfertasComponent } from './Modules/Vendedor/vendedor-index/ofertas/ofertas.component';
import { CategoriaComponent } from './Modules/Vendedor/vendedor-index/categoria/categoria.component';
import { PQRSComponent } from './Modules/Vendedor/vendedor-index/pqrs/pqrs.component';
import { CompradorIndexComponent } from './Modules/Comprador/comprador-index/comprador-index.component';
import { CompradorProductosComponent } from './Modules/Comprador/comprador-productos/comprador-productos.component';
import { CompradorLocalesComponent } from './Modules/Comprador/comprador-locales/comprador-locales.component';
import { CompradorInfoComponent } from './Modules/Comprador/comprador-informacion/comprador-info-index/comprador-info.component';
import { InformacionCompradorComponent } from './Modules/Comprador/comprador-informacion/informacion-comprador/informacion-comprador.component';
import { CambiarPasswordComponent } from './Modules/Comprador/comprador-informacion/cambiar-password/cambiar-password.component';
import { CarritoComponent } from './Modules/Comprador/carrito/carrito.component';
import { LoginComponent } from './Shared/login/login.component';
import { RegistrarseComponent } from './Shared/registrarse/registrarse.component';
import { LocalVendedorComponent } from './Modules/Comprador/local-vendedor/local-vendedor.component';
import { ProductoCompradorComponent } from './Modules/Comprador/productoComprador/productoComprador.component';
import { AuthGuard } from './Core/auth.guard';
import { FooterTerYCondComponent } from './Shared/footer.index/footer-ter-y-cond/footer-ter-y-cond.component';

const routes: Routes = [
  {path:'Vendedor', component: VendedorIndexComponent, canActivate:[AuthGuard],
  children:[
    {path:'Productos', component: ProductoComponent},
    {path:'Pedidos', component: PedidosComponent},
    {path:'Ofertas', component: OfertasComponent},
    {path:'Categorias', component: CategoriaComponent},
    {path:'PQRS', component: PQRSComponent},
  ]
},
{path:'', component:CompradorIndexComponent,
children:[
  {path:'', component:CompradorProductosComponent},
 

]
},
// compradores
{path:'info', component:CompradorInfoComponent, canActivate:[AuthGuard],
children:[
  {path:'', component:InformacionCompradorComponent},
  {path:'informacion',component:InformacionCompradorComponent},
  {path:'cambiar', component:CambiarPasswordComponent}
]
},
{path:'carrito', component:CarritoComponent},
{path:'login', component: LoginComponent},
{path:'registro', component: RegistrarseComponent},
{path:'local/:id', component: LocalVendedorComponent},
{path:'producto/:id', component:ProductoCompradorComponent},
{path:'ter-y-con', component: FooterTerYCondComponent},
{path:'locales', component: CompradorLocalesComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
 
}
