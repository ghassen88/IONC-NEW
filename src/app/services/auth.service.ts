import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JwtModule, JwtHelperService } from "@auth0/angular-jwt";
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  host:string="https://secbackendtestafid.herokuapp.com/"
  jwt:string;
  username:string;
  roles:Array<string>;
  constructor( private http:HttpClient, private router:Router) { }

 login(data){

return this.http.post(this.host+"login",data,{observe:'response'})

 }

 saveToken(jwt){
   
  localStorage.setItem('token',jwt);
  console.log("ok");
  this.jwt=jwt;
  this.parseJWT();

 }
 parseJWT(){
   let jwtHelper = new JwtHelperService();
   let objJWT=jwtHelper.decodeToken(this.jwt)
   this.username= objJWT.obj;
   this.roles =objJWT.roles;
 }

 isAdmin(){
   return this.roles.indexOf('ADMIN')>=0;
 }
 isUser(){
  return this.roles.indexOf('USER')>=0;
}
isAuthenticated(){
  return this.roles && (this.isAdmin() || this.isUser())
}

loadToken(){
  this.jwt = localStorage.getItem('token');
  this.parseJWT();
}

 logout(){
  localStorage.removeItem('token');
 }
}
