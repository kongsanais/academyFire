import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  registerForm: FormGroup;
  loginForm : FormGroup;


  @ViewChild('flipcontainer', { static: false }) flipcontainer: ElementRef;

  constructor(private fb: FormBuilder, private authService: AuthService, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private alertCtrl: AlertController, private router: Router) { }
   
  ngOnInit() {
    
    /* register form */
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', Validators.required],
      role: ['BUYER', Validators.required]
    });

    /* login form */ 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }


  navigateByRole(role){
     if(role == 'BUYER'){

     }else if(role == "SELLER"){

     }
  }


  async login() {
    let loading = await this.loadingCtrl.create({
      message: 'Loading...'
    });
    await loading.present();
    this.authService.signIn(this.loginForm.value).subscribe(user => {
      loading.dismiss();
      console.log('after login: ', user);
      //this.navigateByRole(user['role']);
    },
    async err => {
      loading.dismiss();

      let alert = await this.alertCtrl.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    })
  }



  async register(){

    let loading = await this.loadingCtrl.create({
      message : 'Loading...'
    })

    await loading.present();
    this.authService.signUp(this.registerForm.value).then(async res => {
    await loading.dismiss();

    let toast = await this.toastCtrl.create({
        duration: 3000,
        message: 'Successfully created new Account!'
    });

      toast.present();
      console.log('finished :', res);
    },
    
    async err => {
      await loading.dismiss();
      let alert = await this.alertCtrl.create({
        header: 'Error',
        message: err.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }


  toggleRegister() {
    this.flipcontainer.nativeElement.classList.toggle('flip');
  }





}
