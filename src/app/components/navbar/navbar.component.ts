import { Component, OnInit } from '@angular/core';
import { AuthService}  from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  loggedInUser: string;
  showRegister: boolean;

  constructor(
    private authService : AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.authService.getAuth().subscribe(auth =>{
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;

      } else {
        this.isLoggedIn = false;
      }
    });
  }
  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are now logged out', {
      cssClass: 'alert-success', timeout: 4000
    });
    this.router.navigate(['/login']);
  }

}
