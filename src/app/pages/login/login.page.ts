import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ArticulosService } from '../../services/articulos.service';
import { Usuario } from '../../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slidePrincipal') slides: IonSlides;

loginUser = {
email: '',
password: ''
};

registerUser: Usuario = {
    email: '',
    password: '',
    nombre: '',
    address: '',
    addressdos: ''
  };
  constructor( private articulosService: ArticulosService,
               private navCtrl: NavController,
               private storage: Storage  ) { }

  ngOnInit() {
    this.validarinicio();

}


login( fLogin: NgForm ){
if( fLogin.invalid ) { return; }
this.articulosService.login( this.loginUser.email, this.loginUser.password );
console.log(fLogin.valid);

console.log(this.loginUser);
  //console.log(fLogin.valid);
}


validarinicio() {
let iduser = this.storage.get('token').then((result) => {
    console.log('My result', result);
if(result==null) {

//    this.slides.lockSwipes( true );
}else {
this.navCtrl.navigateRoot( '/main/tabs/tab1' );
}

});
}

async registro( fRegistro: NgForm ) {

    if ( fRegistro.invalid ) { return; }

    const valido = await this.articulosService.registro( this.registerUser );


  }


mostrarRegistro() {
   this.slides.lockSwipes(false);
   this.slides.slideTo(0);
   this.slides.lockSwipes(true);
 }

 mostrarLogin() {
   this.slides.lockSwipes(false);
   this.slides.slideTo(1);
   this.slides.lockSwipes(true);
 }


}
