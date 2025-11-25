import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pizza } from 'src/app/model/pizza.model';
import { PizzaService } from 'src/app/services/pizza.service';

@Component({
  selector: 'app-pizza-edit',
  templateUrl: './pizza-edit.component.html',
  styleUrls: ['./pizza-edit.component.css']
})
export class PizzaEditComponent implements OnInit {

  pizzaId!: number;
  pizza: Pizza = new Pizza(0, '', 0, 0);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pizzaService: PizzaService
  ) {}

  ngOnInit(): void {
    this.pizzaId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPizza();
  }

  loadPizza() {
    this.pizzaService.getPizzaById(this.pizzaId).subscribe({
      next: (data) => this.pizza = data,
      error: () => this.router.navigate(['/404'])
    });
  }

  updatePizza() {
    this.pizzaService.updatePizza(this.pizzaId, this.pizza).subscribe({
      next: () => this.router.navigate(['/pizzas']),
      error: err => console.error("Erreur mise à jour :", err)
    });
  }
  cancel() {
  this.router.navigate(['/pizzas']);
}
}
