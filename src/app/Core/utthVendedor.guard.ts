import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardVendedor implements CanActivate {
    usuario:any
  constructor(private authService: AuthService, private router: Router) {
    this.usuario=authService.getUserData;
  }

  canActivate(): boolean {
    if (this.authService.isLoggedIn() && this.usuario.roles_id==2) {
      return true; // Si el usuario está autenticado, permite el acceso a la ruta
    } else {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión si no está autenticado
      return false;
    }
  }
}