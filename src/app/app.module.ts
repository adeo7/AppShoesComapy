import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VendedorIndexComponent } from './Modules/Vendedor/vendedor-index/vendedor-index/vendedor-index.component';
import { ProductoComponent } from './Modules/Vendedor/vendedor-index/producto/producto.component';
import { CategoriaComponent } from './Modules/Vendedor/vendedor-index/categoria/categoria.component';
import { PedidosComponent } from './Modules/Vendedor/vendedor-index/pedidos/pedidos.component';
import { OfertasComponent } from './Modules/Vendedor/vendedor-index/ofertas/ofertas.component';
import { PQRSComponent } from './Modules/Vendedor/vendedor-index/pqrs/pqrs.component';
import { CompradorIndexComponent } from './Modules/Comprador/comprador-index/comprador-index.component';
import { CompradorProductosComponent } from './Modules/Comprador/comprador-productos/comprador-productos.component';
import { CarritoComponent } from './Modules/Comprador/carrito/carrito.component';
import { CompradorLocalesComponent } from './Modules/Comprador/comprador-locales/comprador-locales.component';
import { CompradorInfoComponent } from './Modules/Comprador/comprador-informacion/comprador-info-index/comprador-info.component';
import { FooterComponent } from './Shared/footer.index/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { NavCompradorComponent } from './Shared/nav-comprador/nav-comprador.component';
import { NavVendedorComponent } from './Shared/nav-vendedor/nav-vendedor.component';
import { InformacionCompradorComponent } from './Modules/Comprador/comprador-informacion/informacion-comprador/informacion-comprador.component';
import { CambiarPasswordComponent } from './Modules/Comprador/comprador-informacion/cambiar-password/cambiar-password.component';
import { LoginComponent } from './Shared/login/login.component';
import { RegistrarseComponent } from './Shared/registrarse/registrarse.component';
import { LocalVendedorComponent } from './Modules/Comprador/local-vendedor/local-vendedor.component';
import { ProductoCompradorComponent } from './Modules/Comprador/productoComprador/productoComprador.component';
import { FormGroup } from '@angular/forms';
import { RecuperarPasswordComponent } from './Shared/recuperar-password/recuperar-password.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Core/token.interceptor';
import { FooterTerYCondComponent } from './Shared/footer.index/footer-ter-y-cond/footer-ter-y-cond.component';
import { BannerComponent } from './Shared/banner/banner.component';


@NgModule({
  declarations: [
    AppComponent,
    VendedorIndexComponent,
    ProductoComponent,
    CategoriaComponent,
    PedidosComponent,
    OfertasComponent,
    PQRSComponent,
    CompradorIndexComponent,
    CompradorProductosComponent,
    CarritoComponent,
    CompradorLocalesComponent,
    CompradorInfoComponent,
    FooterComponent,
    NavCompradorComponent,
    NavVendedorComponent,
    InformacionCompradorComponent,
    CambiarPasswordComponent,
    LoginComponent,
    RegistrarseComponent,
    LocalVendedorComponent,
    ProductoCompradorComponent,
    RecuperarPasswordComponent,
    FooterTerYCondComponent,
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
