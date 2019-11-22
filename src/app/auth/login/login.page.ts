import { Component, OnInit ,OnChanges} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit{
  postData = {
    username: '',
    password: ''
  };
  constructor(private router: Router,
    private authService: AuthService, private toastController: ToastController, private storage:Storage
  ) { }
 ngOnInit(){
  if (localStorage.getItem('token')!=null){
    
     this.router.navigateByUrl('/')
   }
 
 } 
 async presentToast() {
  const toast = await this.toastController.create({
    message: 'Vous êtes connecté avec succès !!',
    duration: 2000,
    color:"success"
  });
  toast.present();
}
  onLogin(data) {
   this.authService.login(data)
      .subscribe(resp => {
      console.log(resp.headers.get('Authorization'))
        let jwt = resp.headers.get('Authorization');
        this.authService.saveToken(jwt);
        this.router.navigateByUrl('/') 
        this.presentToast();

      }, err => {
        console.log(err);
      })

 
  }
 


}

