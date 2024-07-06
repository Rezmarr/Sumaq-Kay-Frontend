import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
import { InicioRoutingModule } from './inicio-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProductCardComponent } from 'src/app/ui/shared/components/product-card/product-card.component';
import { GeminiChatComponent } from 'src/app/ui/shared/components/gemini-chat/gemini-chat.component';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    NzButtonModule,
    ProductCardComponent,
    GeminiChatComponent
  ]
})
export class InicioModule { }
