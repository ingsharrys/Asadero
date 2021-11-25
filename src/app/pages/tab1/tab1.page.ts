import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { ArticulosService } from '../../services/articulos.service';
import { HttpClient } from '@angular/common/http';
import { Article } from '../../interfaces/interfaces';
import { CartService } from '../../services/cart.service';
import { ModalController} from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
@ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  destacados: Article[] = [];

  constructor( private articulosService: ArticulosService,
                private modalCtrl: ModalController,
                private cartService: CartService,
               private route: Router,
               private storage: Storage,
               private http: HttpClient,) {}

  ngOnInit() {

  this.cargarDestacado();



  }


  cargarDestacado(){

    this.articulosService.getTopHeadlinesdestacado().subscribe( respuesta => {
      console.log(respuesta);
    //  this.destacados = respuesta.posts;
      this.destacados.push(...respuesta.posts);
    } );
  }

  cerrarSesion(){

    this.storage.clear();
    this.route.navigateByUrl('/login');
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
