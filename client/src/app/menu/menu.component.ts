import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { menu } from './menuItems';

@Component({
  selector: 'app-menu',
  template: `
    <mat-toolbar color="primary" class="toolbar">
      <mat-icon class="click" (click)="snav.toggle()">menu</mat-icon>
      <h1 class="app-name">Responsive App</h1>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container"
                           [style.marginTop.px]="mobileQuery.matches ? 56 : 0">
      <mat-sidenav #snav [mode]="mobileQuery.matches ? 'over' : 'side'"
                   [fixedInViewport]="mobileQuery.matches" fixedTopGap="56">
        <mat-list>
          <div>
            <mat-list-item class="click" mat-menu-item [routerLink]="nav.path" *ngFor="let nav of menu">
              {{nav.text}}
            </mat-list-item>
            <mat-divider></mat-divider>
          </div>
        </mat-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  mobileQuery: MediaQueryList;
  menu = menu;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = [/(^|\.)plnkr\.co$/, /(^|\.)stackblitz\.io$/].some(h => h.test(window.location.host));
}
