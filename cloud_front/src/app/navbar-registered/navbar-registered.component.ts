import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar-registered',
  templateUrl: './navbar-registered.component.html',
  styleUrls: ['./navbar-registered.component.css']
})
export class NavbarRegisteredComponent {
  logout() {
    localStorage.removeItem("user");
  }

}
