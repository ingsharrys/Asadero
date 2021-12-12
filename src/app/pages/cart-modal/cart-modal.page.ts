import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Article, Usuario, Comentarios, RespuestaTopHeadlines } from '../../interfaces/interfaces';
import { ArticulosService } from '../../services/articulos.service';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {

  cart: Article[] = [];
//  User: Usuario[] = [];
  User: Usuario = { };

  UpdatesUser: Usuario = {
  user_id: '',
  email: '',
  name: '',
  address:'',
  password:''
  };

  registerUser: Usuario = {
      email: '',
      password: '',
      nombre: '',
      address: '',
      addressdos: ''
    };

  constructor(private cartService: CartService,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private storage: Storage,
              private articulosService: ArticulosService,) { }





  ngOnInit() {
    this.cart = this.cartService.getCart();
    console.log(this.cart);

    let iduser = this.storage.get('token').then((result) => {
        console.log('My result', result);
        this.articulosService.getUser(result).subscribe( resp => {
           console.log('articulos', resp);
           this.User = resp.result[0];
      //    this.User = resp.result[0];
          console.log(this.User);

        } );
  });

  }




  async userupdate( fUserupdate: NgForm ) {

    let iduser = this.storage.get('token').then((result) => {
        console.log('My result', result);

        if( result <= 0 ){

         let validos = this.articulosService.registro( this.UpdatesUser );

      }else{

         let valido = this.articulosService.cambiarDatosuser( this.UpdatesUser );
    }
  });

  //    if ( fRegistro.invalid ) { return; }

  //if ( fUserupdate.invalid ) { return; }










    }




  close() {
    this.modalCtrl.dismiss();
  }

  async checkout() {
    // Perfom PayPal or Stripe checkout process

    let alert = await this.alertCtrl.create({
      header: 'Thanks for your Order!',
      message: 'We will deliver your food as soon as possible',
      buttons: ['OK']
    });
    alert.present().then(() => {
      this.modalCtrl.dismiss();
    });
  }
}
