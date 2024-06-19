import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItems } from '../../shared/menu-items';
import { CONSTANTS } from '../../utils/constants';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../core/services/user.service';
import { Store } from '@ngrx/store';
import { AuthFeature } from '../../pages/auth/store/auth.reducer';
import * as AuthActions from '../../pages/auth/store/auth.actions';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  token: string = this.userService.getLoginToken()!;
  tokenPayload: any;
  isLoggedIn = false;
  @ViewChild('sidenav') sidenav: any;

  constructor(public menuItems: MenuItems, private userService: UserService, private store: Store) {

    this.store.select(AuthFeature.selectIsAuthenticated).subscribe(value => {
      this.isLoggedIn = value;
    })

    if (userService.getLoginToken()) {
      this.isLoggedIn = true;
    }

    // this.userService.isLogged.subscribe(value => {
    //   this.isLoggedIn = value;
    // })

    if (this.isLoggedIn) {
      this.tokenPayload = jwtDecode(this.token);
      this.userService.toggleSidebar.subscribe(value => {
        this.sidenav.toggle();
      })
    }
  }
}
