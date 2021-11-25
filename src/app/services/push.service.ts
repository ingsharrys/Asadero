import { Injectable } from '@angular/core';
//import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PushService {

  mensajes: any[] = [];

  constructor(
              //private oneSignal: OneSignal,
              private route: Router,) { }


configuracionInicial(){
/*
  this.oneSignal.startInit('0a62c96c-191a-475a-9a40-b2404c884cf9', '946544629992');

  this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

  this.oneSignal.handleNotificationReceived().subscribe(( noti ) => {
   // do something when notification is received
   console.log('Notificacion recibida', noti);

  });

  this.oneSignal.handleNotificationOpened().subscribe(( noti ) => {
    // do something when a notification is opened
    console.log('Notificacion abierta', noti);
    this.route.navigateByUrl('/main/tabs/tab3');
  });

  this.oneSignal.endInit();
  */
}

}
