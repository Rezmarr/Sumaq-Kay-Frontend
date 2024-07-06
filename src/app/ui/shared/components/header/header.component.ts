import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { CarritoService, ProductoCarrito } from 'src/app/core/controllers/services/carrito/carrito.service';
import { ROUTES_URL } from 'src/app/core/constants/routes.constant';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzButtonModule,
    NzIconModule,
    NzDrawerModule,
    NzPopoverModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public carritoAbierto = false;
  public estaAbiertoCerrarSesion: boolean = false;
  public RUTAS = ROUTES_URL;

  handleOcultarCerrarSesion(): void {
    this.authService.cerrarSesion();
    this.estaAbiertoCerrarSesion = false;
  }

  constructor(
    public readonly authService: AuthService,
    public readonly carritoService: CarritoService
  ) {
  }

  ngOnInit(): void {
  }

  abrirCarrito(): void {
    this.carritoAbierto = true;
  }

  cerrarCarrito(): void {
    this.carritoAbierto = false;
  }
}
