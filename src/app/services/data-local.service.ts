import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article, RespuestaTopHeadlines } from '../interfaces/interfaces';
import { NavController, AlertController  } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

export class DataLocalService {
productos: Article[] = [];
cantidad: [] = [];
canti: number;
nid: number;

  constructor( private storage: Storage,
               public alertController: AlertController ) {  }



guardarProducto( producto ) {

const existe = this.productos.find( product => product.nid === producto.nid );
if( !existe ){
  this.productos.push( producto );
  this.storage.set( 'productos', this.productos );
  //this.storage.set( producto.nid, 1 );
  console.log(this.productos[length]["nid"]);
  console.log(this.productos);
  console.log(this.productos["length"]);

}else{

  this.presentAlertproducts();
}


}

async cargarProducto(  ) {


  const productos = await this.storage.get('productos');
  this.productos = productos || [];
  console.log(this.productos);
  return  this.productos;

}


async cargarCantidad(  ) {

  let ultimes = this.productos["length"];
   //console.log(ultimes);

  for (let e = 0; e <= ultimes-1; e++) {

  //console.log(this.productosCarrito[e]["nid"]);
  let idproduct = this.productos[e]["nid"];
  //console.log(idproduct);
  const productoscant = await this.storage.get("cant"+idproduct);
    this.cantidad = productoscant;
    console.log(this.cantidad);
//return  this.cantidad;
  }


}

guardarcantProducto( producto ) {

const existe = this.productos.find( product => product.nid === producto.nid );
if( !existe ){
  this.productos.push( producto );
  this.storage.set( 'productos', this.productos );
  console.log(this.productos[length]["nid"]);
  console.log(this.productos);
  console.log(this.productos["length"]);

}else{

this.presentAlertproducts();
}


}







async presentAlertproducts() {
   const alert = await this.alertController.create({
     cssClass: 'my-custom-class',
     header: 'Este producto ya lo agregaste al carrito',
     subHeader: 'Compra otro producto o ve al carrito para finalizar la compra',

     buttons: ['OK']
   });

   await alert.present();
 }
/*
async cargarProducto(  ) {

const productos = await this.storage.get('productos');

this.productos = productos;


}
*/

}
