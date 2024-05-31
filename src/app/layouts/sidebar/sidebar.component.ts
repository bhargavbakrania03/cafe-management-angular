import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/modules/material.module';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuItems } from '../../shared/menu-items';
import { CONSTANTS } from '../../utils/constants';
import { jwtDecode } from 'jwt-decode';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MaterialModule, CommonModule, RouterLink, RouterOutlet, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  token: string = localStorage.getItem(CONSTANTS.AUTH_TOKEN)!;
  tokenPayload: any;
  isLoggedIn = false;
  @ViewChild('sidenav') sidenav: any;

  constructor(public menuItems: MenuItems, private userService: UserService,) {

    if (localStorage.getItem(CONSTANTS.AUTH_TOKEN)) {
      this.isLoggedIn = true;
    }

    this.userService.isLogged.subscribe(value => {
      this.isLoggedIn = value;
    })

    if (this.isLoggedIn) {
      this.tokenPayload = jwtDecode(this.token);
      this.userService.toggleSidebar.subscribe(value => {
        this.sidenav.toggle();
      })
    }
  }
}
