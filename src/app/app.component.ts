import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { UserService } from './shared/services/user.service';
import { CommonModule } from '@angular/common';
import { CONSTANTS } from './utils/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MaterialModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showTitlebar = false;

  constructor(private userService: UserService) {
    if (localStorage.getItem(CONSTANTS.auth.AUTH_TOKEN)) {
      this.showTitlebar = true;
    }

    this.userService.isLogged.subscribe(value => {
      this.showTitlebar = value;
    })
  }
}
