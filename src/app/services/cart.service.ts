import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ArticulosService } from '../services/articulos.service';
import { Article, RespuestaTopHeadlines } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
/*  data: Product[] = [
      { id: 0, name: 'Pizza Salami', price: 8.99, amount: 0 },
      { id: 1, name: 'Pizza Classic', price: 5.49, amount: 0 },
      { id: 2, name: 'Sliced Bread', price: 4.99, amount: 0 },
      { id: 3, name: 'Salad', price: 6.99, amount: 0 }
    ];
   */
   private cart: Article[] = [];
   private cartItemCount = new BehaviorSubject(0);

   private carts: Article[] = [];
   private cartItemCounts = new BehaviorSubject(0);

 data: Article[] = [];


  constructor(private articulosService: ArticulosService,
               private http: HttpClient,) { }



  getProducts() {
  return this.articulosService.getTopHeadlines();
  //  return this.data;
    }



getCart() {
return this.cart;
}

getCartItemCount() {
return this.cartItemCount;
}

addProduct(product) {
let added = false;
for (let p of this.cart) {
  if (p.nid === product.nid) {
    p.amount += 1;
    console.log(product);
    added = true;
    break;
  }
}
if (!added) {
  product.amount = 1;
  this.cart.push(product);
  console.log(product);
}
this.cartItemCount.next(this.cartItemCount.value + 1);
}

decreaseProduct(product) {

for (let [index, p] of this.cart.entries()) {
  if (p.nid === product.nid) {
    p.amount -= 1;
    if (p.amount == 0) {
      this.cart.splice(index, 1);
    }
  }
}
this.cartItemCount.next(this.cartItemCount.value - 1);
}

removeProduct(product) {
for (let [index, p] of this.cart.entries()) {
  if (p.nid === product.nid) {
    this.cartItemCount.next(this.cartItemCount.value - p.amount);
    this.cart.splice(index, 1);
  }
}
}


removeTotal(product) {


  for (let [index, p] of this.cart.entries()) {
  //  console.log(product[p]["nid"] );
  //  if (p.nid === product.nid) {
      this.cartItemCount.next(this.cartItemCount.value - p.amount);
      this.cart.splice(index, 1);

  //  }
  }

  for (let [index, p] of this.cart.entries()) {
  //  console.log(product[p]["nid"] );
  //  if (p.nid === product.nid) {
      this.cartItemCount.next(this.cartItemCount.value - p.amount);

      this.cart.splice(index);
  //  }
  }


}


resetShoppingCart () {
  this.cart = [];
  this.carts = [];

  this.cartItemCount.next(0);
  this.cartItemCounts.next(0);

}




}
