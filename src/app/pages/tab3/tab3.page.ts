import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CartService } from '../../services/cart.service';
import { ModalController} from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
@ViewChild('cart', {static: false, read: ElementRef})fab: ElementRef;
  constructor(
    private modalCtrl: ModalController,
    private cartService: CartService,

  ) {}

  ngOnInit(){



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
