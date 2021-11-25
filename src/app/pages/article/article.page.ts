import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { DataLocalService } from '../../services/data-local.service';
import { ArticulosService } from '../../services/articulos.service';
import { CartService } from '../../services/cart.service';
import { HttpClient } from '@angular/common/http';
import { Articles, Comentarios, RespuestaTopHeadlines } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage';
//import { RespuestaTopHeadlines } from '../../interfaces/interfaces';
import { NavController, AlertController, ModalController  } from '@ionic/angular';
import { NgForm } from '@angular/forms';


import { CartModalPage } from '../cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  cart = [];
//  products = [];
  cartItemCount: BehaviorSubject<number>;
//  cartItemCount: BehaviorSubject<number>;
  productos: Articles[] = [];
  comentario: Comentarios[] = [];
  idproduc: '';
  commentUser = {
  messaged: ''
  };
//  message : this.message;

  constructor( private route: ActivatedRoute,
               private articulosService: ArticulosService,
               private http: HttpClient,
               private navCtrl: NavController,
               public alertController: AlertController,
               private storage: Storage,
               private cartService: CartService,
               private modalCtrl: ModalController
               //public dataLocal: DataLocalService
             ) { }

  ngOnInit() {

    let id = this.route.snapshot.paramMap.get('id');
     this.cargarpost(id);
    // this.products = this.cartService.getProducts(id);


    // this.cargarcomment(id);

  //this.products = this.cartService.getProducts();
   //this.cart = this.cartService.getCart();
   //this.cartItemCount = this.cartService.getCartItemCount();




  // this.products = this.cartService.getProducts();
       this.cart = this.cartService.getCart();
       this.cartItemCount = this.cartService.getCartItemCount();






  }




  cargarpost(id:string){
  //  console.log(id);
    this.articulosService.getArtHeadlines(id).subscribe( respuesta => {
  //    console.log(respuesta);
      this.productos = respuesta.post;
//      console.log(this.productos);
  //    this.productos.push(...respuesta.post);
    } );
  }



  addToCart(product) {
//    console.log(product);
    this.cartService.addProduct(product);
    this.presentAlertagregas();
//    this.animateCSS('tada');
  }

  async openCart() {
  //  this.animateCSS('bounceOutLeft', true);

    let modal = await this.modalCtrl.create({
      component: CartModalPage,
      cssClass: 'cart-modal'
    });
    modal.onWillDismiss().then(() => {
      this.fab.nativeElement.classList.remove('animated', 'bounceOutLeft')
    //  this.animateCSS('bounceInLeft');
    });
    modal.present();
  }
/*
  animateCSS(animationName, keepAnimated = false) {
    const node = this.fab.nativeElement;
    node.classList.add('animated', animationName)

    //https://github.com/daneden/animate.css
    function handleAnimationEnd() {
      if (!keepAnimated) {
        node.classList.remove('animated', animationName);
      }
      node.removeEventListener('animationend', handleAnimationEnd)
    }
    node.addEventListener('animationend', handleAnimationEnd)
  }
*/
/*
  carrito(){

  this.dataLocal.guardarProducto(this.productos);

  }

  addToCart(product) {
    this.cartService.addProduct(product);

  }
*/
/*
  cargarcomment(id:string){
  console.log(id);
  let iduser = this.storage.get('token').then((result) => {
      console.log('My result', result);
return this.http.get<RespuestaTopHeadlines>(`https://sharrys.com/admin/api/get_comments/?api_key=cda11rbycGLDVae49pzBCI0QuY5RsHFONkxMUvKwZ7SWXA8gfq&nid=${id}&user_id=${result}`).subscribe( resp => {
//      console.log(resp)

this.comentario.push( ...resp.comments );


    });

    });

  }

*/
  async presentAlertcomment() {
     const alert = await this.alertController.create({
       cssClass: 'my-custom-class',
       header: 'Datos guardados',
       subHeader: '',

       buttons: ['OK']
     });

     await alert.present();
   }


   async presentAlertagregas() {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'Producto agregado',
        subHeader: 'Ve a tu carrito para comprar',

        buttons: ['OK']
      });

      await alert.present();
    }
    sendComment(fComment: NgForm){


            this.presentAlertcomment();


          }

/*
  sendComment(fComment: NgForm){

     let iduser = this.storage.get('token').then((result) => {
         console.log('My result', result);

     let id = this.route.snapshot.paramMap.get('id');

          console.log(this.commentUser.messaged);
          console.log(id);
          console.log(result);




          this.http.get(`https://sharrys.com/admin/api/subir_comment/?api_key=cda11rbycGLDVae49pzBCI0QuY5RsHFONkxMUvKwZ7SWXA8gfq&nid=${id}&user_id=${result}&content=${this.commentUser.messaged}`).subscribe(snap => {
               console.log(snap);
          //     this.listado = snap;
        //  this.navCtrl.navigateRoot( '/article/id' );
          this.presentAlertcomment();
             });
            });

        }

*/


}
