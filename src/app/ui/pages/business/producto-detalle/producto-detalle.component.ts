import { Component, Injector, OnChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { APIService } from 'src/app/core/controllers/services/api/api.service';
import { SERVICES } from 'src/environments/services/services';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { CarritoService } from 'src/app/core/controllers/services/carrito/carrito.service';
import { Producto } from 'src/app/core/controllers/services/business/dto/producto.dto';

@Component({
  selector: 'app-producto-detalle',
  standalone: true,
  imports: [
    CommonModule,
    NzInputNumberModule,
    FormsModule,
    NzButtonModule,
    NzRadioModule,
    ReactiveFormsModule
  ],
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent extends APIService implements OnInit {

  public productoPublicKey!: string;
  public producto!: Producto;

  public productoForm = new FormGroup({
    talla: new FormControl<string | null | undefined>(null),
    cantidad: new FormControl<number | null | undefined>(1),
  });

  constructor(
    injector: Injector,
    private readonly route: ActivatedRoute,
    public readonly carritoService: CarritoService
  ) {
    super(injector, SERVICES.apiGateway.url, 'productos');
    this.productoPublicKey = this.route.snapshot.params['publicKey']
  }

  ngOnInit(): void {
    this.get<ResponseAPI, any>({
      url: `/${this.productoPublicKey}`,
    }).then((res) => {
      this.producto = res.data as Producto;
    });
  }

  public agregarProductoCarrito() {
    const talla = this.productoForm.get('talla')?.value;
    const cantidad = this.productoForm.get('cantidad')?.value;

    if (talla && cantidad) {
      this.carritoService.agregarProducto({
        producto: this.producto,
        talla,
        cantidad,
        precioTotal: this.producto.precio * cantidad,
        publicKey: this.productoPublicKey,
      });
    }
  }
}
