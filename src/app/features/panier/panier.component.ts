import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';
import { CommandeService } from 'src/app/core/services/commande.service';
import { CartItem } from 'src/app/models/cart-item.model';



@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent {

  cart$: Observable<CartItem[]> = this.cartService.cart$;

  loading = false;
  errorMsg = '';

  // Livraison (mock UI)
  livraison = 0; // "Offert"

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  updateQty(item: CartItem, qty: number) {
    this.cartService.updateQuantity(item.produit.idProduit, Number(qty));
  }

  remove(idProduit: number) {
    this.cartService.remove(idProduit);
  }

  get subTotal(): number {
    return this.cartService.getTotal();
  }

  get totalTTC(): number {
    return this.subTotal + this.livraison;
  }

  procederPaiement() {
    this.errorMsg = '';

    // 🔒 doit être connecté (US6)
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const cart = this.cartService.getCart();
    if (!cart.length) {
      this.errorMsg = 'Votre panier est vide.';
      return;
    }

    const dto = {
      lignes: cart.map(i => ({
        idProduit: i.produit.idProduit,
        quantite: i.quantity
      }))
    };

    this.loading = true;
    this.commandeService.create(dto).subscribe({
      next: () => {
        this.loading = false;
        this.cartService.clear();
        this.router.navigate(['/commandes']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err?.error?.message ?? 'Erreur lors de la validation de la commande.';
      }
    });
  }
}
