import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaTopHeadlines, Usuario } from '../interfaces/interfaces';
import { NavController, AlertController, ModalController  } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { Article, Pedidos } from '../interfaces/interfaces';
//import { CartService } from './cart.service';
const apikey = environment.apikey;
const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class ArticulosService {
cart: Article[] = [];
pedido: Pedidos[] = [];
token: string = null;
cuentos: Article[] = [];
todosproductos:{ };
  constructor( private http: HttpClient,
               private storage: Storage,
               private navCtrl: NavController,
               private modalCtrl: ModalController,
              // private cartService: CartService,
               public alertController: AlertController ) { }


getTopHeadlines(){
 //return this.ejecutarQuery(`/get_recent_posts`);
 return this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/get_recent_posts/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o`);
}

getTopHeadlinesCategory(){
 //return this.ejecutarQuery(`/get_recent_posts`);
 return this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/get_category_index/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o`);
}

getTopHeadlinesCategorypost(idp:string){
 //return this.ejecutarQuery(`/get_recent_posts`);
 return this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/get_category_posts/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o&id=${idp}&count=30`);
}

getTopHeadlinesdestacado(){
 //return this.ejecutarQuery(`/get_recent_posts`);
 return this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/get_dest_post/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o&count=1`);
}

getArtHeadlines( id:string ){
 return this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/get_post_detail/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o&id=${id}`);
}

getCommentHeadlines( id:string ){

  let iduser = this.storage.get('token').then((result) => {
 return this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/get_comments/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o&nid=${id}&user_id=${iduser}`);

   });
}

hacerPedido(pedido, cart){

console.log(pedido['envio']);
console.log(pedido['pago']);
console.log(cart['length']);
let idusers = this.storage.get('token').then((result) => {
  console.log(result);


  for(let i = 0; i <= cart['length']-1; i++){


        this.todosproductos = cart[i]["news_title"];
        console.log(this.todosproductos);

/*
recuperar
     this.http.get<RespuestaTopHeadlines>(`https://sharrys.com/admin/api/get_user_pedido/?api_key=cda11rbycGLDVae49pzBCI0QuY5RsHFONkxMUvKwZ7SWXA8gfq&id=${result}&productos=${cart[i]["news_title"]}&idprod=${cart[i]["nid"]}&cantidad=${cart[i]["amount"]}&precio=${cart[i]["tienda_price"]}&entrega=${pedido['envio']}&metodopago=${pedido['pago']}&code=${cart['length']}&idprod=${pedido["especi"]}`)
        .subscribe( resp => {
        console.log(resp);


       });
*/
  }

 });



}



async hacerPedidocode(pedido, cart):Promise<any>{


console.log(pedido['envio']);
console.log(pedido['pago']);
console.log(cart['length']);
console.log(cart);

const result = await this.storage.get('token')
const resulta = await this.storage.get('observemos')
console.log(result);

let todosproductos = [];
console.log(todosproductos);
for (let i = 0; i <= cart['length']-1; i++) {
     todosproductos.push(cart[i]['news_title']);
}

let preciosproductos = [];
console.log(preciosproductos);
for (let i = 0; i <= cart['length']-1; i++) {
     preciosproductos.push(cart[i]['tienda_price']);
}

let cantproductos = [];
console.log(cantproductos);
for (let i = 0; i <= cart['length']-1; i++) {
     cantproductos.push(cart[i]['amount']);
}

const bodyRequest = {
     code: todosproductos,
     price: preciosproductos,
     buc: cart['length'],
     canrprod: cantproductos,
     metdopagos: pedido['pago'],
     metenvio: pedido['envio'],
     observa: pedido['especi'],
     id: result,
}
console.log(bodyRequest.metdopagos);
console.log(bodyRequest.observa);
console.log(bodyRequest.metenvio);

return this.http.post<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/get_user_pedidocode_test/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o`, bodyRequest, {
     }).toPromise();







}




getUser( result ){
console.log(result);
 return this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/get_user_profile/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o&id=${result}`);

}


login( email: string, password: string ){
//const data = { email, password };
this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/get_user_login/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o&email=${email}&password=${password}`)
.subscribe( resp => {
//console.log(resp);

//console.log(resp['result']['0']['name']);
console.log(resp['result']['0']['user_id']);
console.log(resp);

if( resp['result']['0']['user_id'] >= 1 ){
   this.storage.set('token', resp['result']['0']['user_id']);
  this.navCtrl.navigateRoot( '/main/tabs/tab1' );

}else{

this.presentAlertMultipleButtons();
}

});

 }

 async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Usuario o Contraseña incorrecta',
      subHeader: 'Pruebe de nuevo',

      buttons: ['OK']
    });

    await alert.present();
  }



  cambiarDatosuser( usuario: Usuario ) {

  console.log( usuario['email'] );

  this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/update_user_data/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o&id=${usuario['user_id']}&email=${usuario['email']}&name=${usuario['nombre']}&direccion=${usuario['address']}&password=${usuario['password']}`)
  .subscribe( resp => {
  console.log(resp['result']['0']['user_id']);


});

this.modalCtrl.dismiss();
  }






registro( usuario: Usuario ) {

console.log( usuario['email'] );
const direccionesdos = usuario['address'];
console.log(direccionesdos.replace(/[^a-zA-Z0-9 ]/g, " "));

this.http.get<RespuestaTopHeadlines>(`https://restauranteelasadero.com/admin/api/user_register/?api_key=cda11JcQEtGUzk5ZM3pTXyIHKwADgf4qh7Pam2YOeu0FsjBW6o&email=${usuario['email']}&name=${usuario['nombre']}&direccion=${direccionesdos.replace(/[^a-zA-Z0-9 ]/g, " ")}&password=${usuario['password']}`)
.subscribe( resp => {
console.log(resp['result']['0']['user_id']);
 this.storage.set('token', resp['result']['0']['user_id']);
//console.log(resp['result']['0']['name']);
console.log(resp['result']['0']['user_id']);
console.log(resp);

if( resp['result']['0']['ok'] == 'true' ){
  this.navCtrl.navigateRoot( '/main/tabs/tab1' );

}else{

this.presentAlertRegisterButtons();
}

});
}


async presentAlertRegisterButtons() {
   const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Usuario ya existe',
     subHeader: 'Pruebe iniciar sesión o regsitrarse con otro email y número de teléfono',

     buttons: ['OK']
   });

   await alert.present();
 }


/*
  async guardarToken( user_id: string ) {

this.token = user_id;
await this.storage.set('token', user_id);
 }
*/
}
