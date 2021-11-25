import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { Article } from '../../interfaces/interfaces';
import { ArticulosService } from '../../services/articulos.service';
import { ActivatedRoute } from '@angular/router';
import { ModalController} from '@ionic/angular';
import { RespuestaTopHeadlines } from '../../interfaces/interfaces';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  @ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
products: Article[] = [];
  constructor(private articulosService: ArticulosService,
              private modalCtrl: ModalController,
              private cartService: CartService,
              private route: ActivatedRoute,) { }

  ngOnInit(){

    let idp = this.route.snapshot.paramMap.get('idp');
//    console.log(idp);
  this.cargarproductos(idp);


   }

   cargarproductos(idp:string) {

     this.articulosService.getTopHeadlinesCategorypost(idp)
     .subscribe( resp => {
  //     console.log('articulos', resp);
       //this.noticias = resp.articles;
       this.products.push( ...resp.posts );
     } );

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
