import { Component } from '@angular/core';
import { map, Observable } from 'rxjs'; 
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  cartCount$: Observable<number>;

  constructor(
    public authService: AuthService,
    private cartService: CartService
  ) {
    this.cartCount$ = this.cartService.cart$.pipe(
      map((cart: any[]) => cart.reduce((total, item) => total + item.quantity, 0))
    );
  }

  logout() {
    this.authService.logout();
  }
}
