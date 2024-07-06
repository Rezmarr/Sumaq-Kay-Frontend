import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {
  public cargandoRuta = true;
  public subs: Subscription[] = [];

  constructor(
    private readonly router: Router,
  ) {
    this.subs.push(
      this.router.events
        .pipe(
          filter(
            (evento) =>
              evento instanceof NavigationStart ||
              evento instanceof NavigationEnd
          )
        )
        .subscribe((evento) => {
          this.cargandoRuta = evento instanceof NavigationStart;
        })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
