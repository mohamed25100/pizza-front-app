import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pizza } from 'src/app/model/pizza.model';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza',
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent implements OnInit {

  pizzaId!: number;
  pizza!: Pizza | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pizzaService: PizzaService
  ) { }

  ngOnInit(): void {
    // Récupère l'ID de la pizza depuis l'URL
    this.pizzaId = Number(this.route.snapshot.paramMap.get('id'));
    this.getPizzaDetail(this.pizzaId);
  }

  /**
   * Récupère la pizza depuis le service
   * Si la pizza n'existe pas, redirige vers la page 404
   */
  getPizzaDetail(id: number) {
    this.pizzaService.getPizzaById(id).subscribe({
      next: (pizza: Pizza) => {
        this.pizza = pizza;
      },
      error: () => {
        this.router.navigate(['/404']);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/pizzas']);
  }
  editPizza() {
    this.router.navigate(['/pizzas/edit', this.pizzaId]);
  }

}
