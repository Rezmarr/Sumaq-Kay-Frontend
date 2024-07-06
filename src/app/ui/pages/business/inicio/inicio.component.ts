import { Component, Injector } from '@angular/core';
import { APIService } from 'src/app/core/controllers/services/api/api.service';
import { Producto } from 'src/app/core/controllers/services/business/dto/producto.dto';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { SERVICES } from 'src/environments/services/services';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent extends APIService {

  public productos: Producto[] = [];

  constructor(injector: Injector) {
    super(injector, SERVICES.apiGateway.url, 'productos');
  }

  ngOnInit(): void {
    this.get<ResponseAPI, any>({
      url: '/',
    }).then((res) => {
      this.productos = res.data as Producto[];
    });
  }

}
