import { Component, Injector, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APIService } from 'src/app/core/controllers/services/api/api.service';
import { SERVICES } from 'src/environments/services/services';
import { ActivatedRoute } from '@angular/router';
import { ResponseAPI } from 'src/app/core/interfaces/response-api.interface';
import { Recibo } from 'src/app/core/controllers/services/business/dto/recibo.dto';

@Component({
  selector: 'app-recibo',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.scss']
})
export class ReciboComponent extends APIService implements OnInit {

  public reciboPublicKey!: string;
  public recibo!: Recibo;
  public montoProductos!: number;
  public fechaLlegada!: Date;

  constructor(
    injector: Injector,
    private readonly route: ActivatedRoute
  ) {
    super(injector, SERVICES.apiGateway.url, 'checkout');
  }

  ngOnInit(): void {
    this.reciboPublicKey = this.route.snapshot.params['publicKey'];

    this.get<ResponseAPI<Recibo>, string>({
      url: `${this.reciboPublicKey}`
    }).then((response: ResponseAPI<Recibo>) => {
      this.recibo = response.data!;
      this.montoProductos = this.recibo.productos.reduce((acc, producto) => acc + producto.precioTotal, 0);
      const newDate = new Date(this.recibo.fecha);
      newDate.setDate(newDate.getDate() + 3);
      this.fechaLlegada = newDate;
    });
  }
}
