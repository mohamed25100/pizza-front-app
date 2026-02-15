import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';
import { CartItem } from 'src/app/models/cart-item.model';
import { ProduitResponseDTO } from 'src/app/models/produit.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private authService: AuthService) {
    // Charger panier au démarrage (guest ou user si déjà connecté)
    this.loadUserCart();

    // À chaque login/logout => recharger le bon panier
    this.authService.user$.subscribe(() => {
      this.mergeGuestCartIntoUserIfNeeded();
      this.loadUserCart();
    });
  }

  // ---------------------------
  // Helpers localStorage key
  // ---------------------------
  private getCartKey(): string {
    const user = this.authService.getCurrentUser();
    return user ? `sp_cart_${user.idUser}` : 'sp_cart_guest';
  }

  // ---------------------------
  // Load / Save
  // ---------------------------
  private loadUserCart(): void {
    const raw = localStorage.getItem(this.getCartKey());
    const cart = raw ? (JSON.parse(raw) as CartItem[]) : [];
    this.cartSubject.next(cart);
  }

  private save(cart: CartItem[]): void {
    localStorage.setItem(this.getCartKey(), JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  private get cart(): CartItem[] {
    return this.cartSubject.value;
  }

  /**
   * Fusion panier guest -> panier user au moment du login
   * - si user a déjà un panier, on fusionne les quantités
   * - puis on supprime le panier guest
   */
  private mergeGuestCartIntoUserIfNeeded(): void {
    const user = this.authService.getCurrentUser();
    if (!user) return; // pas connecté => pas de fusion

    const guestKey = 'sp_cart_guest';
    const userKey = `sp_cart_${user.idUser}`;

    const guestRaw = localStorage.getItem(guestKey);
    if (!guestRaw) return;

    const guestCart: CartItem[] = JSON.parse(guestRaw);

    const userRaw = localStorage.getItem(userKey);
    const userCart: CartItem[] = userRaw ? JSON.parse(userRaw) : [];

    // Fusion par idProduit
    const merged = [...userCart];

    for (const g of guestCart) {
      const found = merged.find(x => x.produit.idProduit === g.produit.idProduit);
      if (found) {
        found.quantity += g.quantity;
      } else {
        merged.push({ produit: g.produit, quantity: g.quantity });
      }
    }

    localStorage.setItem(userKey, JSON.stringify(merged));
    localStorage.removeItem(guestKey);
  }

  // ---------------------------
  // Public API
  // ---------------------------
  getCart(): CartItem[] {
    return this.cart;
  }

  addToCart(produit: ProduitResponseDTO): void {
    const cart = [...this.cart];
    const existing = cart.find(i => i.produit.idProduit === produit.idProduit);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ produit, quantity: 1 });
    }

    this.save(cart);
  }

  updateQuantity(idProduit: number, quantity: number): void {
    const q = Number(quantity);

    // Si quantité <= 0 => on supprime (US4)
    if (q <= 0) {
      this.remove(idProduit);
      return;
    }

    const cart = this.cart.map(item =>
      item.produit.idProduit === idProduit
        ? { ...item, quantity: q }
        : item
    );

    this.save(cart);
  }

  remove(idProduit: number): void {
    const cart = this.cart.filter(i => i.produit.idProduit !== idProduit);
    this.save(cart);
  }

  clear(): void {
    this.save([]);
  }

  getTotal(): number {
    return this.cart.reduce((total, item) =>
      total + (item.produit.normalPrix * item.quantity),
      0
    );
  }

  getTotalItems(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }
}
