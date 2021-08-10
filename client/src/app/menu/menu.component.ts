import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { menu } from './menuItems';

@Component({
  selector: 'app-menu',
  template: `
  <div>
    <mat-toolbar color="primary" class="example-toolbar">
      <button mat-icon-button (click)="snav.toggle()"><mat-icon>menu</mat-icon></button>
      <h1 class="example-app-name">Responsive App</h1>
    </mat-toolbar>

    <mat-sidenav-container class="example-sidenav-container"
                           [style.marginTop.px]="mobileQuery.matches ? 56 : 0">
      <mat-sidenav #snav [mode]="mobileQuery.matches ? 'over' : 'side'"
                   [fixedInViewport]="mobileQuery.matches" fixedTopGap="56">
        <mat-list>
          <a mat-list-item [routerLink]="nav.path" *ngFor="let nav of menu">{{nav.text}}</a>
        </mat-list>
      </mat-sidenav>

      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  </div>
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
