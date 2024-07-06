import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ROUTES_URL } from 'src/app/core/constants/routes.constant';
import { RoutesUtil } from 'src/app/core/utils/route.util';
import { RouterLink } from '@angular/router';
import { Producto } from 'src/app/core/controllers/services/business/dto/producto.dto';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    NzButtonModule,
    RouterLink
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input()
  producto!: Producto;

  public ROUTES = ROUTES_URL;
  public urlProcesado!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.urlProcesado = RoutesUtil.procesarURL({ url: ROUTES_URL.productos.detalle, params: [this.producto.publicKey] });
  }
}
