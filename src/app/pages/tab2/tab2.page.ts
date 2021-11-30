import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ArticulosService } from '../../services/articulos.service';
import { Categoria } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { ModalController} from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page implements OnInit{

@ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  categorias: Categoria[] = [];

  cart = [];
//  products = [];
  cartItemCount: BehaviorSubject<number>;

  constructor( private articulosService: ArticulosService,
               private modalCtrl: ModalController,
               private cartService: CartService, ) {}

ngOnInit(){
this.articulosService.getTopHeadlinesCategory()
.subscribe( resp => {
  console.log('articulos', resp);
  //this.noticias = resp.articles;
  this.categorias.push( ...resp.categories );
} );

this.cart = this.cartService.getCart();
this.cartItemCount = this.cartService.getCartItemCount();

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

}
