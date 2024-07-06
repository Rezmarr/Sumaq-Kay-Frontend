import { ChangeDetectorRef, Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ChatBot } from 'src/app/core/controllers/services/chat/chat.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ROUTES_URL } from 'src/app/core/constants/routes.constant';

@Component({
  selector: 'app-gemini-chat',
  standalone: true,
  imports: [
    CommonModule,
    NzIconModule,
    NzInputModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './gemini-chat.component.html',
  styleUrls: ['./gemini-chat.component.scss']
})
export class GeminiChatComponent {
  @ViewChildren('scrollTarget')
  scrollTargets!: QueryList<ElementRef>;

  public estaAbierto = false;
  public mensaje: string = '';
  public cantidadMensajes = 0;

  constructor(
    public readonly chatBot: ChatBot,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewChecked() {
    const lastElement = this.scrollTargets.last;
    if (lastElement && this.cantidadMensajes < this.chatBot.mensajes.length) {
      this.scroll(lastElement.nativeElement);
      this.cantidadMensajes = this.chatBot.mensajes.length;
    }
    this.cdr.detectChanges();
  }

  public abrirChat(): void {
    this.estaAbierto = !this.estaAbierto;
    if (this.chatBot.mensajes.length > 0) {
      return;
    }
    this.chatBot.iniciarChat();
  }

  public cerrarChat(): void {
    this.estaAbierto = false;
  }

  public enviarMensaje(): void {
    if (!this.mensaje || this.mensaje === '') {
      return;
    }
    this.chatBot.enviarMensaje(this.mensaje);
    this.mensaje = '';
  }

  public scroll(el: HTMLElement) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
