import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'src/app/models/cart-item.model';
import { ProduitResponseDTO } from 'src/app/models/produit.model';

const CART_KEY = 'sp_cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  private loadCart(): CartItem[] {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  }

  private saveCart(cart: CartItem[]) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  getCart(): CartItem[] {
    return this.cartSubject.value;
  }

  addToCart(produit: ProduitResponseDTO) {
    const cart = this.getCart();
    const existing = cart.find(i => i.produit.idProduit === produit.idProduit);

    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ produit, quantity: 1 });
    }

    this.saveCart(cart);
  }

  updateQuantity(idProduit: number, quantity: number) {
    const cart = this.getCart().map(item =>
      item.produit.idProduit === idProduit
        ? { ...item, quantity: quantity }
        : item
    );
    this.saveCart(cart);
  }

  remove(idProduit: number) {
    const cart = this.getCart().filter(i => i.produit.idProduit !== idProduit);
    this.saveCart(cart);
  }

  clear() {
    this.saveCart([]);
  }

  getTotal(): number {
    return this.getCart()
      .reduce((total, item) =>
        total + item.produit.normalPrix * item.quantity,
        0
      );
  }

  getTotalItems(): number {
    return this.getCart()
      .reduce((total, item) => total + item.quantity, 0);
  }
}
