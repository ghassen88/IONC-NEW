import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private authService:AuthService) {}

  isAuthenticated(){
    return this.authService.isAuthenticated();
  }
 

  isAdmin() {
    return this.authService.isAdmin();
  }
  logout(){
    return this.authService.logout();
  }

  isUser() {
    return this.authService.isUser();
  }
}
