import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from 'src/app/core/controllers/services/carrito/carrito.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormPatchModule } from 'ng-zorro-antd/core/form';
import { CheckoutForm } from './checkout.form';
import { APIError } from 'src/app/core/interfaces/api-error.interface';
import { Router } from '@angular/router';
import { ROUTES_URL } from 'src/app/core/constants/routes.constant';
import { ErrorUtil } from 'src/app/core/utils/error.util';
import { TipoAlertaEnum } from 'src/app/core/enums/tipo-alerta.enum';
import { APIService } from 'src/app/core/controllers/services/api/api.service';
import { SERVICES } from 'src/environments/services/services';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { AuthService } from 'src/app/core/controllers/services/auth/auth.service';
import { RoutesUtil } from 'src/app/core/utils/route.util';
import { CheckoutRequest, ProductosCheckout } from 'src/app/core/controllers/services/business/dto/checkout.dto';


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormPatchModule,
    NzInputModule,
    NzFormModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent extends APIService implements OnInit {

  public fw = new CheckoutForm();
  public submitError?: APIError;
  public RoutesType = ROUTES_URL;
  public ventaPublicKey?: string;

  constructor(
    injector: Injector,
    public readonly carritoService: CarritoService,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    super(injector, SERVICES.apiGateway.url, 'checkout');
  }

  ngOnInit(): void {
    const productos: ProductosCheckout[] = this.carritoService.carrito.map((producto) => {
      return {
        cantidad: producto.cantidad,
        precioTotal: producto.precioTotal,
        producto: producto.producto._id,
      };
    });
    this.fw.formulario.controls.productos.setValue(productos);
    this.fw.formulario.controls.cliente.setValue(this.authService.usuario.id);
    this.fw.formulario.controls.envio.setValue(this.carritoService.totalProductos * 10);
  }

  async onSubmit(): Promise<void> {
    this.fw.formulario.controls.fecha.setValue(new Date());

    if (this.fw.enviandoFormulario || !this.fw.validate()) return;

    try {
      this.submitError = undefined;
      this.fw.deshabilitar();

      const request = await this.fw.toRequest();

      const response = await this.post<ResponseAPI<string>, CheckoutRequest>({
        url: `/`,
        request
      });

      this.ventaPublicKey = response.data;

      this.carritoService.vaciarCarrito();

    } catch (error) {
      this.fw.hasErrorFromAPI = true;
      this.fw.errorMessageFromAPI = ErrorUtil.getApiErrorMessage(error);
      this.submitError = {
        tipoAlerta: TipoAlertaEnum.Error,
        descripcion: this.fw.errorMessageFromAPI,
      };
    } finally {
      this.fw.habilitar();
      this.router.navigateByUrl(RoutesUtil.procesarURL({ url: ROUTES_URL.recibo, params: [this.ventaPublicKey!] }));
    }
  }
}
